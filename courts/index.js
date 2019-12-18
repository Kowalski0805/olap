const fs = require('fs');
const array = [];

for (let i = 1; i < 10; i++) {
  array.push(require('./court0'+i+'.json'));  
}

fs.writeFileSync('court.json', JSON.stringify([].concat(...array), null, 4));