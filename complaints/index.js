const fs = require('fs');
const array = [];

// for (let i = 1; i < 10; i++) {
//   array.push(require('./complaint' + ((i < 10) ? '0' + i : i) +'.json'));  
// }



// fs.writeFileSync('complaint.json', JSON.stringify([].concat(...array), null, 4));

const c = require('./complaint_new.json');
for (const i in c) {
  delete c[i].offence;
}
// const res = c.filter(e => e.CMPLNT_FR_DT.split('/')[1] == '2019');


fs.writeFileSync('complaint_new.json', JSON.stringify(c, null, 4));
