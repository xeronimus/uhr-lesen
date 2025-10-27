import {Client} from 'basic-ftp';
import {readFileSync, readdirSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load deployment configuration
const configPath = join(__dirname, 'deploy-config.json');
let config;

try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('Error: Could not read deploy-config.json');
  console.error('Please create scripts/deploy-config.json with your FTP credentials.');
  console.error('See deploy-config.example.json for the required format.');
  process.exit(1);
}

const client = new Client();
client.ftp.verbose = true;

deploy();

async function deploy() {
  try {
    console.log('Connecting to FTPES server...');
    console.log(`Host: ${config.host}:${config.port || 21}`);
    console.log(`Username: ${config.username}`);
    console.log(`Secure: ${config.secure !== false ? 'yes (FTPES)' : 'no (plain FTP)'}`);

    await client.access({
      host: config.host,
      port: config.port || 21,
      user: config.username,
      password: config.password,
      secure: config.secure !== false, // Default to true (FTPES)
      secureOptions: {
        rejectUnauthorized: config.rejectUnauthorized !== false // Default to true
      }
    });

    console.log('Connected successfully!');

    // Ensure remote directory exists
    console.log(`Ensuring remote directory exists: ${config.remotePath}`);
    await client.ensureDir(config.remotePath);
    await client.cd(config.remotePath);

    // Upload the build directory
    const localPath = join(__dirname, '..', 'build');
    console.log(`Uploading ${localPath} to ${config.remotePath}...`);

    // Compile regex patterns once
    const excludePatterns = (config.exclude || []).map((pattern) => new RegExp(pattern));
    const includePatterns = (config.include || []).map((pattern) => new RegExp(pattern));

    await uploadDirectory(localPath, config.remotePath, excludePatterns, includePatterns);

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    client.close();
  }
}

// Recursively upload directory with filtering
async function uploadDirectory(localDir, remoteDir, excludePatterns, includePatterns) {
  const entries = readdirSync(localDir, {withFileTypes: true});

  for (const entry of entries) {
    const localPath = join(localDir, entry.name);
    const remotePath = `${remoteDir}/${entry.name}`;

    // Apply filters
    const shouldExclude = excludePatterns.some((regex) => regex.test(localPath));
    if (shouldExclude) {
      // console.log(`Excluding: ${localPath}`);
      continue;
    }

    if (includePatterns.length > 0) {
      const shouldInclude = includePatterns.some((regex) => regex.test(localPath));
      if (!shouldInclude) {
        //console.log(`Not included: ${localPath}`);
        continue;
      }
    }

    if (entry.isDirectory()) {
      console.log(`Creating directory: ${remotePath}`);
      try {
        await client.ensureDir(remotePath);
      } catch (error) {
        // Directory might already exist
      }
      await uploadDirectory(localPath, remotePath, excludePatterns, includePatterns);
    } else {
      console.log(`Uploading: ${localPath} -> ${remotePath}`);
      await client.uploadFrom(localPath, remotePath);
    }
  }
}
