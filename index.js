const csv = require('csv-parser')
const fs = require('fs')

const dates = [], offences = [], boros = [], jurisdictions = [], ages = [], sexes = [], races = [];

['dates', 'boros', 'jurisdictions', 'ages', 'sexes', 'races'].forEach(e => {
  const json = require('./'+e+'.json');
  const res = json.map((j, i) => ({id: i+1, value: j}));
  fs.writeFileSync(e+'_new.json', JSON.stringify(res, null, 4));
});

const json = require('./offences.json');
const res = json.map(j => ({ id: j, value: j }));
fs.writeFileSync('offences_new.json', JSON.stringify(res, null, 4));


const generate = ({cat, map}) => {
  const facts = [];
  let count = 0;
  let curr_date;
  
  const check = (fact, obj) => Object.keys(map).every(field => fact[field] == obj[field]);

  const inflate = obj => Object.keys(map).reduce((acc, field) => {
    acc[field] = obj[field];
    return acc;
  }, {count: 1});
  
  const create = obj => {
    if (!curr_date) curr_date = obj[Object.keys(map)[0]].split('/')[0];
    
    if (curr_date !== obj[Object.keys(map)[0]].split('/')[0]) {
      fs.writeFileSync(cat + 's/' + cat + curr_date + '.json', JSON.stringify(facts, null, 4));
      facts.length = 0;
      curr_date = obj[Object.keys(map)[0]].split('/')[0];
    }

    obj[Object.keys(map)[0]] = obj[Object.keys(map)[0]].replace(/\/../, '');

    for (const field in map) {
      if (!map[field].includes(obj[field])) map[field].push(obj[field]);
    }
    
    count++;
    console.log(cat, ': ', count);
    
    const field = facts.find(f => check(f, obj));
    if (field) field.count = field.count + 1;
    else facts.push(inflate(obj));
  };

  // const lalka = require('./' + cat + 's/' + cat + '.json');
  // const json = lalka.map(l => Object.keys(l).reduce((a, v) => {
  //   if (map[v]) {
  //     a[map[v]] = l[v];
  //   } else {
  //     a[cat+'_'+v] = l[v];
  //   }
  //   return a;
  // }, {}));
  // fs.writeFileSync(cat + 's/' + cat + '_new.json', JSON.stringify(json, null, 4));

  // fs.createReadStream(cat + '.csv')
  //   .pipe(csv())
  //   .on('data', (data) => create(data))
  //   .on('end', () => {
  //     fs.writeFileSync(cat + 's/' + cat + curr_date + '.json', JSON.stringify(facts, null, 4));
  //
  //     console.log('Done!');
  //     // [
  //     //   { NAME: 'Daffy Duck', AGE: '24' },
  //     //   { NAME: 'Bugs Bunny', AGE: '22' }
  //     // ]
  //   });
}


// TODO: map {e: {data: [], target_name: "", getter: () => {}, setter: () => {}}}
const qualities = [
  {
    cat: 'arrest',
    map: {
      ARREST_DATE: dates,
      KY_CD: offences, //TODO: OFNS_DESC
      ARREST_BORO: boros, //TODO: map to full names
      JURISDICTION_CODE: jurisdictions,
      PERP_AGE_GROUP: ages,
      PERP_SEX: sexes,
      PERP_RACE: races,
    },
  },
  {
    cat: 'complaint',
    map: {
      CMPLNT_FR_DT: dates,
      KY_CD: offences, //TODO: OFNS_DESC
      BORO_NM: boros,
      JURISDICTION_CODE: jurisdictions,
      SUSP_AGE_GROUP: ages,
      SUSP_SEX: sexes,
      SUSP_RACE: races,
      VIC_AGE_GROUP: ages,
      VIC_SEX: sexes,
      VIC_RACE: races,
    },
  },
  {
    cat: 'court',
    map: {
      SUMMONS_DATE: dates,
      BORO: boros,
      JURISDICTION_CODE: jurisdictions,
      AGE_GROUP: ages,
      SEX: sexes,
      RACE: races,
    },
  },
  {
    cat: 'shooting',
    map: {
      OCCUR_DATE: dates,
      BORO: boros,
      JURISDICTION_CODE: jurisdictions,
      PERP_AGE_GROUP: ages,
      PERP_SEX: sexes,
      PERP_RACE: races,
      VIC_AGE_GROUP: ages,
      VIC_SEX: sexes,
      VIC_RACE: races,
    },
  },
];


// qualities.forEach(q => generate(q));

const maps = [
  {
    cat: 'arrest',
    map: {
      ARREST_DATE: 'month',
      KY_CD: 'offence', //TODO: OFNS_DESC
      ARREST_BORO: 'boro', //TODO: map to full names
      JURISDICTION_CODE: 'jurisdiction',
      PERP_AGE_GROUP: 'perp_age',
      PERP_SEX: 'perp_sex',
      PERP_RACE: 'perp_race',
    },
  },
  {
    cat: 'complaint',
    map: {
      CMPLNT_FR_DT: 'month',
      KY_CD: 'offence', //TODO: OFNS_DESC
      BORO_NM: 'boro',
      JURISDICTION_CODE: 'jurisdiction',
      SUSP_AGE_GROUP: 'perp_age',
      SUSP_SEX: 'perp_sex',
      SUSP_RACE: 'perp_race',
      VIC_AGE_GROUP: 'vict_age',
      VIC_SEX: 'vict_sex',
      VIC_RACE: 'vict_race',
    },
  },
  {
    cat: 'court',
    map: {
      SUMMONS_DATE: 'month',
      BORO: 'boro',
      JURISDICTION_CODE: 'jurisdiction',
      AGE_GROUP: 'perp_age',
      SEX: 'perp_sex',
      RACE: 'perp_race',
    },
  },
  {
    cat: 'shooting',
    map: {
      OCCUR_DATE: 'month',
      BORO: 'boro',
      JURISDICTION_CODE: 'jurisdiction',
      PERP_AGE_GROUP: 'perp_age',
      PERP_SEX: 'perp_sex',
      PERP_RACE: 'perp_race',
      VIC_AGE_GROUP: 'vict_age',
      VIC_SEX: 'vict_sex',
      VIC_RACE: 'vict_race',
    },
  },
];

// maps.forEach(q => generate(q));
