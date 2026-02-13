import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const appsDir = './src/apps';
const apps = readdirSync(appsDir).filter(f => statSync(join(appsDir, f)).isDirectory());

console.log(`Building ${apps.length} MCP apps...`);

for (const app of apps) {
  console.log(`Building ${app}...`);
  try {
    execSync(`vite build -c src/apps/${app}/vite.config.ts`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to build ${app}:`, error.message);
  }
}

console.log('All apps built successfully!');
