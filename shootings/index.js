const fs = require('fs');
const array = [];

for (let i = 1; i < 10; i++) {
  array.push(require('./shooting0'+i+'.json'));  
}

fs.writeFileSync('shooting.json', JSON.stringify([].concat(...array), null, 4));