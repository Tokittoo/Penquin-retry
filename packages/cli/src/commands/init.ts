import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

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
    fs.writeFileSync(configFilePath, CONFIG_FILE_CONTENT);

    console.log(chalk.green('Config file created successfully'))
  } catch(error) {
    console.log(chalk.red('❌Error while initializing vink to your project. Please try again. If the issue still persists contact the creater of this (btw thats me 😁)'));
    console.error(error);
  }

  console.log(chalk.green('✅Vink initialized successfully.'));
  console.log('You can now run vink add componentName to add components to your project');
});


const CONFIG_FILE_CONTENT =
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