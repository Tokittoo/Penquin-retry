export const DEFAULT_CONFIG_FILE_CONTENT =
`{
  "tsx": true,
  "ts": true,
  "componentsPaths": {
    "ui": "src/components/ui",
    "block": "src/components/blocks"
  },
  "snippetsPath": "src/snippets",
  "alwaysForce": false,
  "iconLibrary": "@tabler/icons-react"
}`

export const CN_FUNCTION_FILE_CONTENT =
`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`


export const INITIAL_REQUIRED_DEPENDENCIES = [
  'class-variance-authority@latest',
  'tailwind-merge@latest'
] as const