const { 
  classicmangosConnect, 
  getLootTemplates,
  addLootTemplates,
  classicmangosClose 
} = require('./db/classicmangos');
const { closeWindow, error } = require('./utils');

const VBL = async () => {
  await classicmangosConnect().catch(async err => await error(err));

  const lootTemplate = await getLootTemplates().catch(async err => await error(err));
  const query = lootTemplate.reduce((prev, current) => {
    return prev + `
      UPDATE creature_loot_template SET maxcount=${current.maxcount * 3} 
      WHERE entry=${current.entry} AND item=${current.item};
    `;
  }, '');

  await addLootTemplates(query).catch(async err => await error(err));
  await classicmangosClose().catch(async err => await error(err));
  await closeWindow();
}

VBL();
