const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const cat = 'court';
const facts = [];
const dates = [], offences = [], boros = [], precincts = [], perp_ages = [], persp_sexes = [], perp_races = [];
const map = {
  SUMMONS_DATE: dates,
  OFFENSE_DESCRIPTION: offences,
  BORO: boros,
  // ARREST_PRECINCT: precincts,
  AGE_GROUP: perp_ages,
  SEX: persp_sexes,
  RACE: perp_races,
};

const check = (fact, obj) => Object.keys(map).every(field => fact[field] == obj[field]);

const inflate = obj => Object.keys(map).reduce((acc, field) => {
  acc[field] = obj[field];
  return acc;
}, {count: 1});

let curr_date;
let count = 0;
const create = obj => {
  if (!curr_date) curr_date = obj.SUMMONS_DATE.split('/')[0];
  if (curr_date !== obj.SUMMONS_DATE.split('/')[0]) {
    fs.writeFileSync(cat + curr_date + '.json', JSON.stringify(facts, null, 4));
    facts.length = 0;
    curr_date = obj.SUMMONS_DATE.split('/')[0];
  }

  obj.SUMMONS_DATE = obj.SUMMONS_DATE.replace(/\/../, '');

  for (const field in map) {
    if (!map[field].includes(obj[field])) map[field].push(obj[field]);
  }
  
  count++;
  console.log(count, ' / ', 800000);
  
  const field = facts.find(f => check(f, obj));
  if (field) field.count = field.count + 1;
  else facts.push(inflate(obj));
};

fs.createReadStream(cat + '.csv')
  .pipe(csv())
  .on('data', (data) => create(data))
  .on('end', () => {
    fs.writeFileSync(cat + curr_date + '.json', JSON.stringify(facts, null, 4));

    console.log('Done!');
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });