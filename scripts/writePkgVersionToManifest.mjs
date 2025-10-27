import fs from 'node:fs';
import path, {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkgJsonPath = path.join(__dirname, '../package.json');
const manifestPath = path.join(__dirname, '../public', 'manifest.json');

const v = readPkgVersion();
const mnf = readManifest();
writeManifestVersion(mnf, v);

function readPkgVersion() {
  const pkg = fs.readFileSync(pkgJsonPath, 'utf8');
  const pkgParsed = JSON.parse(pkg);
  if (!pkgParsed.version) {
    throw new Error(`package.json invalid`);
  }
  console.log(`Version in package.json is ${pkgParsed.version}`);
  return pkgParsed.version;
}

function readManifest() {
  const mnf = fs.readFileSync(manifestPath, 'utf8');
  return JSON.parse(mnf);
}

function writeManifestVersion(mnf, version) {
  console.log(`Writing version ${version} to manifest.json`);

  const modified = {
    ...mnf,
    version
  };
  fs.writeFileSync(manifestPath, JSON.stringify(modified, null, 2), 'utf8');
}
