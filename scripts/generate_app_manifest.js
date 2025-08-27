const fs = require('fs');
const path = require('path');

const dynamicAppsDir = path.join(__dirname, '../dynamic-apps');
const outputFile = path.join(__dirname, '../public/installedapps.json');

console.log(`Scanning for app manifests in: ${dynamicAppsDir}`);

try {
  const appFolders = fs.readdirSync(dynamicAppsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    console.log(appFolders);

  const allApps = appFolders.map(folder => {
    const manifestPath = path.join(dynamicAppsDir, folder, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      throw new Error(`Manifest file not found in folder: ${folder}`);
    }
    const fileContent = fs.readFileSync(manifestPath, 'utf-8');
    return JSON.parse(fileContent);
  });

  console.log(allApps);

  fs.writeFileSync(outputFile, JSON.stringify(allApps, null, 2));

  console.log(`✅ Success! Created ${outputFile} with ${allApps.length} apps.`);

} catch (error) {
  console.error('❌ Error generating app manifest:', error.message);
  process.exit(1); 
}