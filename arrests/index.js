const fs = require('fs');
const array = [];

for (let i = 1; i < 10; i++) {
  array.push(require('./arrest0'+i+'.json'));  
}

fs.writeFileSync('arrest.json', JSON.stringify([].concat(...array), null, 4));