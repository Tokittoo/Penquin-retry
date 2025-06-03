import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export interface ProjectConfig {
  tsx: boolean;
  ts: boolean;
  componentsPaths: {
    ui: string;
    blocks: string;
  };
  snippetsPath: string;
  alwaysForce: boolean;
  iconLibrary: string;
}

export const getConfig = (cwd: string): ProjectConfig | null => {
  const configFilePath = path.join(cwd, 'vink.config.json');

  if (!fs.existsSync(configFilePath)) {
    console.log(chalk.red('Vink config file not found'));
    console.log('Vink is not initialized in this project');
    console.log(chalk.yellow('Run `vink init` to initialize Vink in your project'));
    return null;
  }

  const config = fs.readFileSync(configFilePath, 'utf8');

  return JSON.parse(config) as ProjectConfig;
}
