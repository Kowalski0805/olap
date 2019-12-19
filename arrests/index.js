const fs = require('fs');
const array = [];

// for (let i = 1; i < 10; i++) {
//   array.push(require('./arrest0'+i+'.json'));  
// }

// fs.writeFileSync('arrest.json', JSON.stringify([].concat(...array), null, 4));
// const map = {
//   K: 'BROOKLYN',
//   B: 'BRONX',
//   S: 'STATEN ISLAND',
//   Q: 'QUEENS',
//   M: 'MANHATTAN',
// };
// const c = require('./arrest.json');
// const res = c.map(e => Object.assign({}, e, { ARREST_BORO: map[e.ARREST_BORO] }));
// console.log(res);


// fs.writeFileSync('arrest.json', JSON.stringify(res, null, 4));

const c = require('./arrest_new.json');
for (const i in c) {
  delete c[i].offence;
}
// const res = c.filter(e => e.CMPLNT_FR_DT.split('/')[1] == '2019');


fs.writeFileSync('arrest_new.json', JSON.stringify(c, null, 4));
