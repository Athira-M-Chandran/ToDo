const fs = require('fs');
const path = require('path');

function createFolderAndFiles(folder, basePath) {
  const folderPath = path.join(basePath, folder.name);
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Folder created: ${folderPath}`);
    folder.children.forEach(child => {
      if (child.category === 'File') {
        let content = child.source;
        if (typeof content !== 'string') {
          content = JSON.stringify(content);
        }
        fs.writeFile(path.join(folderPath, child.name), content, (err) => {
          if (err) throw err;
          console.log(`File created: ${path.join(folderPath, child.name)}`);
        });
      } else if (child.category === 'Folder') {
        createFolderAndFiles(child, folderPath);
      }
    });
  });
}

fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/allResourceUri?secumode=embeded")
  .then(res => res.json())
  .then((res) => {
    if (res) {
      console.log(res)
      res.forEach(element => {
        if (element.category === 'File') {
          let content = element.source;
          if (typeof content !== 'string') {
            content = JSON.stringify(content);
          }
          fs.writeFile(element.name, content, (err) => {    
            if (err) throw err;
            console.log(`File created: ${element.name}`);
          });
        } else if (element.category === 'Folder') {
          createFolderAndFiles(element, __dirname);
        }
      });
    }
  });
