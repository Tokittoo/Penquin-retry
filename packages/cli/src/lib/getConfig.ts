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
  const configFilePath = path.join(cwd, 'vinq.config.json');

  if (!fs.existsSync(configFilePath)) {
    console.log(chalk.red('Vinq config file not found'));
    console.log('Vinq is not initialized in this project');
    console.log(chalk.yellow('Run `vinq init` to initialize Vinq in your project'));
    process.exit(1);
  }

  const config = fs.readFileSync(configFilePath, 'utf8');

  return JSON.parse(config) as ProjectConfig;
}
