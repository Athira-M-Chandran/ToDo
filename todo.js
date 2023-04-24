const fs = require('fs');
fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/allResourceUri?secumode=embeded")
  .then(res => res.json())
  .then((res) => {
    if (res) {
      console.log(res)
      res.forEach(element => {
        const content = element.source;
        fs.writeFile(element.name, content, (err) => {
          if (err) throw err;
          console.log('File created successfully');
        });
      })
    }
    else { }
  })