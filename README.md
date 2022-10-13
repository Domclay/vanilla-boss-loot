# Vanilla Boss Loot
This program increases the amount of loot that Vanilla bosses drop, for use with [Celguar's SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos)/[CMaNGOS Classic](https://github.com/cmangos/mangos-classic).

The default amount is triple the loot, but can be adjusted in the ``index.js`` file.

## Installation
Install [Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if you don't already have it.

Run:
```
npm install
```

## Usage
Always make a database backup before running!
```
npm start
```
The default database credentials are set to work with [Celguar's SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos), but can be changed in ``config.js`` to work with any CMaNGOS Classic server.

## Adjusting loot rate
The loot rate (maxcount) can be adjusted on line 15 in ``index.js``
```
13    const query = lootTemplate.reduce((prev, current) => {
14      return prev + `
15        UPDATE creature_loot_template SET maxcount=${current.maxcount * 3} 
16        WHERE entry=${current.entry} AND item=${current.item};
17      `;
18    }, '');
```
