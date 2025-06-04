import chalk from "chalk";
import { RegistryItem } from "./getRegistry.js";

export const getRegistryComponent = async (component: string): Promise<RegistryItem | null> => {
  const res = await fetch(`http://localhost:3000/r/${component}.json`);

  if(!res.ok) {
    console.log(chalk.red('Component not found in registry'));
    return null
  }

  const componentRegistryContent = await res.json();

  return componentRegistryContent as RegistryItem;
}