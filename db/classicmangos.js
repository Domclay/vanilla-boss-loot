const mysql = require('mysql2/promise');

const { dbCredentials } = require('../config');

let classicmangos;

const classicmangosConnect = () => {
  dbCredentials.database = 'classicmangos';
  return mysql.createConnection(dbCredentials)
    .then(res => {
      console.log('Connected to classicmangos...');
      classicmangos = res;
    })
    .catch(err => { throw err });
}

const getLootTemplates = () => {
  const sql = `
    SELECT entry, item, maxcount FROM creature_loot_template
    WHERE entry IN (
      SELECT LootId FROM creature_template
      WHERE ScriptName LIKE "%boss_%"
    )
  `;

  return classicmangos.query(sql)
    .then(loot => {
      console.log('Creature loot template data fetched...');
      return loot[0];
    })
    .catch(err => { throw err });
}

const addLootTemplates = (sql) => {
  return classicmangos.query(sql)
    .then(res => console.log('New creature loot template data successfully added!'))
    .catch(err => { throw err });
}

const classicmangosClose = () => {
  return classicmangos.end()
    .then(console.log('Disconnected from classicmangos...'))
    .catch(err => { throw err });
}

module.exports = { 
  classicmangosConnect,  
  getLootTemplates, 
  addLootTemplates,
  classicmangosClose
};
