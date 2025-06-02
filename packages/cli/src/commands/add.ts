import { Command } from "commander";
import { getConfig, ProjectConfig } from "../lib/get-config.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { getRegistry } from "../lib/get-registry.js";
import fs from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';

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
    if (!config.tsx && !config.ts) {
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
  const registry = getRegistry();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const cliRootPath = path.resolve(__dirname, '../../');

  for (const component of components) {
    const registryComponent = registry[component];
    const componentType = registryComponent?.type.split(':')[1] as keyof typeof config.componentsPaths;

    if (!registryComponent) {
      console.log(chalk.red(`Component ${component} not found in registry`));
      continue;
    }

    // Create component directory in user's project (if it doesn't exists)
    const userComponentPath = path.resolve(cwd, config.componentsPaths[componentType]);
    if (!fs.existsSync(userComponentPath)) {
      fs.mkdirSync(userComponentPath, { recursive: true });
    }

    // Copy files from my registry to user's project
    for (const file of registryComponent.files) {
      try {
        const sourcePath = path.resolve(cliRootPath, file.path);
        const targetPath = path.resolve(userComponentPath, path.basename(file.path));

        // Read from source and write to target
        const content = fs.readFileSync(sourcePath, 'utf-8');
        fs.writeFileSync(targetPath, content);
      } catch (error: any) {
        console.log(chalk.red(`Failed to copy file ${file.path}: ${error.message}`));
        continue;
      } finally {
        if(registryComponent.registryDependencies) {
           // recusrively add all the dependent components
          await addComponents({
            components: registryComponent.registryDependencies,
            config,
            cwd,
            options
          });
        }
      }
    }

    console.log(chalk.green(`Added ${component} component`));
  }
}