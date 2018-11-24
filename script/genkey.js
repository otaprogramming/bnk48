const stellar = require('stellar-sdk');
const memberNames = require('./member_names.json')

const server = new stellar.Server('https://horizon-testnet.stellar.org');
stellar.Network.useTestNetwork();

let memberKeys = [];
for (i in memberNames) {
  let key = stellar.Keypair.random();
  memberKeys.push({
    name: memberNames[i],
    publicKey: key.publicKey(),
    secret: key.secret(),
  });
}

console.log(JSON.stringify(memberKeys));
