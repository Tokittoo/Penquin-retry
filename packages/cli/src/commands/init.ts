import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { execa } from 'execa';
import { getPackageManager } from '../lib/getPackagetManager.js';

export const init = new Command()
.name('init')
.description('initialize Vink into your project')
// .argument // Not supporting to add components while initializing vink. If needed use this to optionally accept the components to add
.action(async () => {
  const cwd = process.cwd();
  const configFilePath = path.join(cwd, 'vink.config.json');

  try {
    // Skip if config file exists
    if(fs.existsSync(configFilePath)) {
      console.log(chalk.yellow('⚠️ Config file already exists. Skipping.'));
    }

    // Create config file if it doesn't exists
    fs.writeFileSync(configFilePath, DEFAULT_CONFIG_FILE_CONTENT);

    await addInitialSetup(cwd);

    console.log(chalk.green('Config file created successfully'))
  } catch(error) {
    console.log(chalk.red('❌ Error while initializing vink to your project. Please try again. If the issue still persists contact the creater of this (btw thats me 😁)'));
    console.error(error);
  }

  console.log(chalk.green('✅ Vink initialized successfully.'));
  console.log('You can now run vink add componentName to add components to your project');
});


const DEFAULT_CONFIG_FILE_CONTENT =
`{
  "tsx": true,
  "ts": true,
  "componentsPaths": {
    "ui": "src/components/ui",
    "blocks": "src/components/blocks"
  },
  "snippetsPath": "src/snippets",
  "alwaysForce": false,
  "iconLibrary": "@tabler/icons-react"
}`

const CN_FILE_CONTENT =
`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const addInitialSetup = async (cwd: string) => {
  try {
    const libPath = path.join(cwd, 'src', 'lib');

    // Create lib dir if doesn't exists
    if(!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    const CNFunctionFilePath = path.join(libPath, 'utils.ts');

    // Write the cn function file
    fs.writeFileSync(CNFunctionFilePath, CN_FILE_CONTENT);

    const packageManager = await getPackageManager(cwd);

    try {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          'class-variance-authority@latest',
          'tailwind-merge@latest',
        ],
        {
          cwd,
          stdio: 'inherit' // This will show the installation progress
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