import { PythonShell } from 'python-shell';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predict = async (features) => {
  try {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'json',
        pythonPath: 'python3',
        scriptPath: __dirname,
        args: [JSON.stringify(features)]
      };

      PythonShell.run('predict.py', options).then(results => {
        const prediction = results[0];
        if (prediction.error) {
          reject(new Error(prediction.error));
        } else {
          resolve(prediction);
        }
      }).catch(reject);
    });
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};