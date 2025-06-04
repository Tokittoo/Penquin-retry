import { Command } from "commander";
import { getConfig, ProjectConfig } from "../lib/getConfig.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { getRegistry, RegistryItem } from "../lib/getRegistry.js";
import fs from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';
import { execa } from 'execa'
import { getPackageManager } from "../lib/getPackagetManager.js";
import { getSpinner } from "../lib/spinner.js";
import { getRegistryComponent } from "../lib/getRegistryComponent.js";

export const add = new Command()
  .name('add')
  .description('add components to your project')
  .argument('[components...]', 'Components to add') // to add multiple components
  .option('-f, --force', 'Force add components', false)
  .option('-c, --cwd', 'Working directory. Deafults to the current working directory', process.cwd())
  .action(async (components: string[], options: { force: boolean, cwd: string }) => {
    const config: ProjectConfig | null = getConfig(options.cwd);

    if (!config) {
      return;
    }

    // if no ts or tsx is configured, ask the user if they want to continue
    if (!config.tsx || !config.ts) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Only tsx or ts is currently supported. If you still want to intall components without ts or tsx you have to configure them by yourself. Do you want to continue?',
        initial: false,
      });

      if (!confirm) {
        return;
      }
    }

    if (!components || components.length === 0) {
      console.log(chalk.red('No components provided'));
      return;
    }

    await addComponents({
      components,
      config,
      cwd: options.cwd,
      options: {
        force: options.force,
      }
    });
  });

interface AddComponentsParams {
  components: string[];
  config: ProjectConfig;
  cwd: string;
  options: {
    force: boolean;
  }
}

// Add Components to users project
const addComponents = async ({ components, config, cwd, options }: AddComponentsParams) => {
  const spinner = getSpinner('Adding components...');

  try {
    spinner.start();
    
    const registry = getRegistry();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const cliRootPath = path.resolve(__dirname, '../../');

    for (const component of components) {
      const registryComponent: RegistryItem | null = await getRegistryComponent(component);

      if (!registryComponent) {
        spinner.stop();
        console.log(chalk.red(`Component ${component} not found in registry`));
        spinner.start();
        continue;
      }

      const componentType = registryComponent.type.split(':')[1] as keyof typeof config.componentsPaths;

      // Create component directory in user's project (if it doesn't exists)
      const userComponentPath = path.resolve(cwd, config.componentsPaths[componentType]);
      if (!fs.existsSync(userComponentPath)) {
        fs.mkdirSync(userComponentPath, { recursive: true });
      }

      // Concurrently add package dependencies
      await installDependencies(cwd, registryComponent.dependencies, registryComponent.devDependencies)

      // Copy files from my registry to user's project
      for (const file of registryComponent.files) {
        try {
          const targetPath = path.resolve(userComponentPath, path.basename(file.path));

          // Check if the component already exists and prompt user to overwrite
          if(fs.existsSync(targetPath)) {
            spinner.stop();
            const { confirm } = await prompts({
              type: 'confirm',
              name: 'confirm',
              message: `${component} already exists. Do you want to overwrite?`,
              initial: false,
            });
      
            spinner.start();

            if (!confirm) {
              continue;
            }
          }

          fs.writeFileSync(targetPath, file.content!);

          // recusrively add all the dependent components
          if(registryComponent.registryDependencies) {
            await addComponents({
              components: registryComponent.registryDependencies,
              config,
              cwd,
              options
            });
          }
        } catch (error: any) {
          console.log(chalk.red(`Failed to add ${component} component`));
          console.log(chalk.red(`Failed to copy file ${file.path}: ${error.message}`));
          continue;
        }
      }
    }

    spinner.succeed('Components added successfully');
  } catch (error) {
    spinner.fail('Failed to add components');
    throw error;
  } finally {
    spinner.stop();
  }
}

// Add package dependencies
const installDependencies = async (
  cwd: string,
  dependencies?: string[],
  devDependencies?: string[]
) => {
  if(
    (!dependencies || dependencies.length === 0) &&
    (!devDependencies || devDependencies.length === 0)
  ) {
    return;
  }
  
  try {
    const packageManager = await getPackageManager(cwd);

    if (dependencies?.length) {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          ...(packageManager === 'deno'
            ? dependencies.map((dep) => `npm:${dep}`)
            : dependencies),
        ]
        ,
        {
          cwd,
        }
      )
    }

    if (devDependencies?.length) {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          '-D',
          ...(packageManager === 'deno'
            ? devDependencies.map((dep) => `npm:${dep}`)
            : devDependencies),
        ]
        ,
        {
          cwd
        }
      )
    }
  } catch (error) {
    console.log(chalk.red(`Failed to install packages: ${error}`));
  }
};