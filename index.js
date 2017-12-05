const pure = require('./scripts/pure-sherlock');
const cbm = require('./scripts/cbm-sherlock');

console.log('pure-sherlock returned:', pure());
cbm().then(res => console.log(`cbm-sherlock returned: ${res}`)).catch(e => console.error(`cbm-sherlock returned: ${e}`));
