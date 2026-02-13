#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const apps = [
  { name: 'contact-detail', title: 'Contact Detail', tool: 'keap_get_contact' },
  { name: 'contact-grid', title: 'Contact Grid', tool: 'keap_list_contacts' },
  { name: 'deal-detail', title: 'Deal Detail', tool: 'keap_get_opportunity' },
  { name: 'campaign-dashboard', title: 'Campaign Dashboard', tool: 'keap_list_campaigns' },
  { name: 'campaign-detail', title: 'Campaign Detail', tool: 'keap_get_campaign' },
  { name: 'order-dashboard', title: 'Order Dashboard', tool: 'keap_list_orders' },
  { name: 'order-detail', title: 'Order Detail', tool: 'keap_get_order' },
  { name: 'appointment-calendar', title: 'Appointment Calendar', tool: 'keap_list_appointments' },
  { name: 'tag-manager', title: 'Tag Manager', tool: 'keap_list_tags' },
  { name: 'email-composer', title: 'Email Composer', tool: 'keap_send_email' },
  { name: 'automation-builder', title: 'Automation Builder', tool: 'keap_list_hooks' },
  { name: 'affiliate-dashboard', title: 'Affiliate Dashboard', tool: 'keap_list_affiliates' },
  { name: 'product-catalog', title: 'Product Catalog', tool: 'keap_list_products' },
  { name: 'subscription-manager', title: 'Subscription Manager', tool: 'keap_list_subscriptions' },
  { name: 'file-browser', title: 'File Browser', tool: 'keap_list_files' },
  { name: 'settings-panel', title: 'Settings Panel', tool: 'keap_get_account_profile' },
  { name: 'analytics-dashboard', title: 'Analytics Dashboard', tool: 'keap_list_contacts' },
];

const baseDir = './src/ui/react-app/src/apps';

apps.forEach(app => {
  const appDir = join(baseDir, app.name);
  
  try {
    mkdirSync(appDir, { recursive: true });
  } catch (e) {}

  // App.tsx
  const appTsx = `import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import '../../styles/global.css';

export default function ${app.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}() {
  const { callTool, loading, error } = useCallTool();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await callTool('${app.tool}', {});
      setData(result);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>${app.title}</h1>
      
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="card">
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
`;

  // index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${app.title} - Keap</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./main.tsx"></script>
</body>
</html>
`;

  // main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  // vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../dist/${app.name}',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
`;

  writeFileSync(join(appDir, 'App.tsx'), appTsx);
  writeFileSync(join(appDir, 'index.html'), indexHtml);
  writeFileSync(join(appDir, 'main.tsx'), mainTsx);
  writeFileSync(join(appDir, 'vite.config.ts'), viteConfig);

  console.log(`✓ Generated ${app.name}`);
});

// Also generate for pipeline-kanban and task-manager if they don't have all files
['pipeline-kanban', 'task-manager'].forEach(appName => {
  const appDir = join(baseDir, appName);
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Keap</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./main.tsx"></script>
</body>
</html>
`;

  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../dist/${appName}',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
`;

  try {
    writeFileSync(join(appDir, 'main.tsx'), mainTsx);
    writeFileSync(join(appDir, 'index.html'), indexHtml);
    writeFileSync(join(appDir, 'vite.config.ts'), viteConfig);
    console.log(`✓ Completed ${appName}`);
  } catch (e) {
    console.log(`! ${appName} already has custom files`);
  }
});

console.log(`\nGenerated ${apps.length + 2} apps successfully!`);
