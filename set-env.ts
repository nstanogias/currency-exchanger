const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const env = require('dotenv');
env.config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
  apiKey: '${process.env['API_KEY']}',
};
`;
fs.writeFile(targetPath, envConfigFile, function (err: any) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});
