import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface RegistryItem {
  name: string;
  description: string;
  type: 'registry:ui' | 'registry:block' | 'registry:snippet' | 'registry:file';
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    type: 'registry:ui' | 'registry:block' | 'registry:snippet' | 'registry:file';
  }[];
}


export const getRegistry = (): Record<string, RegistryItem> => {
  const registryPath = path.resolve(__dirname, '../../registry.json');
  
  if (!fs.existsSync(registryPath)) {
    throw new Error('Registry directory not found');
  }

  const rawRegistryContent = fs.readFileSync(registryPath, 'utf-8');
  const registry: Record<string, RegistryItem> = JSON.parse(rawRegistryContent);

  return registry;
}; 