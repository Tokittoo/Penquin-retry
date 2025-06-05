import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { execa } from 'execa';
import { getPackageManager } from '../lib/getPackagetManager.js';
import { getSpinner } from '../lib/spinner.js';
import { CN_FUNCTION_FILE_CONTENT, DEFAULT_CONFIG_FILE_CONTENT, INITIAL_REQUIRED_DEPENDENCIES } from '../constants/index.js';

export const init = new Command()
.name('init')
.description('initialize Vinq into your project')
// .argument // Not supporting to add components while initializing vinq. If needed use this to optionally accept the components to add
.action(async (options: { cwd: string }) => {
  const cwd = process.cwd();
  const configFilePath = path.join(cwd, 'vinq.config.json');

  const spinner = getSpinner('Initializing Vinq');

  try {
    // Skip if config file exists
    if(fs.existsSync(configFilePath)) {
      console.log(chalk.yellow('⚠️  Config file already exists. Skipping.'));
      return;
    }

    spinner.start();

    // Create config file if it doesn't exists
    fs.writeFileSync(configFilePath, DEFAULT_CONFIG_FILE_CONTENT);

    await addInitialSetup(cwd);

    console.log(chalk.green('Config file created successfully'));
    
    spinner.succeed('Vinq initialized successfully.');
    console.log('You can now run `vinq add componentName` to add components to your project');
  } catch(error) {
    spinner.fail('Error while initializing vinq to your project.');
    console.log(chalk.yellow('Please try again. If the issue still persists contact the creater of this (btw thats me 😁)'));
    console.error(error);
  }
});

const addInitialSetup = async (cwd: string) => {
  try {
    const libPath = path.join(cwd, 'src', 'lib');

    // Create lib dir if doesn't exists
    if(!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    const CNFunctionFilePath = path.join(libPath, 'utils.ts');

    // Write the cn function file
    fs.writeFileSync(CNFunctionFilePath, CN_FUNCTION_FILE_CONTENT);

    const packageManager = await getPackageManager(cwd);

    try {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          ...(packageManager === 'deno'
            ? INITIAL_REQUIRED_DEPENDENCIES.map((dep) => `npm:${dep}`)
            : INITIAL_REQUIRED_DEPENDENCIES),
        ]
        ,
        {
          cwd,
        }
      )

      console.log(chalk.green('Successfully installed required dependencies'))
    } catch (error: any) {
      console.log(chalk.red(`Failed to install dependencies: ${error.message}`))
      console.log(chalk.yellow('You may need to install these packages manually:'))
      console.log(chalk.yellow('- class-variance-authority'))
      console.log(chalk.yellow('- tailwind-merge'))
      process.exit(1)
    }
  } catch (error) {
    console.log('Error while Initializing the setup E:', (error as Error).message);
    throw error;
  }
}