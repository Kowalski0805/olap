const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const facts = [];
const dates = [], offences = [], boros = [], precincts = [], perp_ages = [], persp_sexes = [], perp_races = [];
const map = {
  ARREST_DATE: dates,
  OFNS_DESC: offences,
  ARREST_BORO: boros,
  // ARREST_PRECINCT: precincts,
  PERP_AGE_GROUP: perp_ages,
  PERP_SEX: persp_sexes,
  PERP_RACE: perp_races,
};

const check = (fact, obj) => Object.keys(map).every(field => fact[field] == obj[field]);

const inflate = obj => Object.keys(map).reduce((acc, field) => {
  acc[field] = obj[field];
  return acc;
}, {count: 1});

let curr_date;
let count = 0;
const create = obj => {
  if (!curr_date) curr_date = obj.ARREST_DATE.split('/')[0];
  if (curr_date !== obj.ARREST_DATE.split('/')[0]) {
    fs.writeFileSync('arrest' + curr_date + '.json', JSON.stringify(facts, null, 4));
    facts.length = 0;
    curr_date = obj.ARREST_DATE.split('/')[0];
  }

  obj.ARREST_DATE = obj.ARREST_DATE.replace(/\/../, '');

  for (const field in map) {
    if (!map[field].includes(obj[field])) map[field].push(obj[field]);
  }
  
  count++;
  console.log(count, ' / ', 167965);
  
  const field = facts.find(f => check(f, obj));
  if (field) field.count = field.count + 1;
  else facts.push(inflate(obj));
};

fs.createReadStream('arrest.csv')
  .pipe(csv())
  .on('data', (data) => create(data))
  .on('end', () => {
    fs.writeFileSync('arrest' + curr_date + '.json', JSON.stringify(facts, null, 4));

    console.log('Done!');
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });