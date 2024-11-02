import fs from 'fs';

const updateFilePageValue = (
  filePath: string,
  validModules: string[],
  module: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(`Error leyendo el archivo: ${err}`);
      }

      const pageValue = validModules.includes(module) ? module : 'default';
      const modifiedData = data.replace(
        /(meta name="path" page=")[^"]*(")/,
        `$1${pageValue}$2`
      );

      fs.writeFile(filePath, modifiedData, 'utf8', (writeErr) => {
        if (writeErr) {
          return reject(`Error escribiendo el archivo: ${writeErr}`);
        }
        // console.log(`Archivo modificado exitosamente con page="${pageValue}"`);
        resolve(modifiedData);
      });
    });
  });
};

export { updateFilePageValue };
