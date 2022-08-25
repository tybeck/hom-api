import {spawn} from 'child_process';
import {Promise} from 'bluebird';
import dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const configuration = dotenv.config();
const fallbackEnvironmentFile = `INITIALIZED=true`;

interface Configuration {
  INITIALIZED: boolean;
}

const createEnvironmentFile = async () => {
  return fs.promises.writeFile(path.join(process.cwd(), '.env'), fallbackEnvironmentFile, 'utf-8');
};

const createProcess = (script) => {
  return new Promise((resolve, reject) => {
    const spawnedProcess = spawn('sh', [path.join(process.cwd(), `tools/${script}.sh`)]);
    spawnedProcess.stdout.on('data', (message) =>
      console.log(`${chalk.blue(chalk.bold('HOM::'))} ${message}`),
    );
    spawnedProcess.on('exit', () => {
      resolve();
    });
  });
};

const init = async () => {
  const environment = process.env as Partial<Configuration>;
  if (configuration.error) {
    await createEnvironmentFile();
  }
  if (environment.INITIALIZED) {
    console.log('Application has already been initialized.');
    process.exit(0);
    return;
  }
  return Promise.mapSeries(['init-dependencies', 'init-db'], (script) => {
    return createProcess(script);
  });
};

export default init();
