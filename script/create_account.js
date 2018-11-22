// txhash createAccount
//1a902e1e9c1ab61ce7c240337dc899fec027cf7e56e6f085cb78ea4f8e12de25
// official key
// Public Key	GB5LIPG22NXNPODZVZL6QJNZTWDNXTRFKNLFXJ4S3LZDQIAXDKG3GOYZ
// Secret Key	SDX2WSMWA5JVOQFFNP7A4IO7CSVWHLAL6D6GIUQB4EA2QFQ5I4NG6SRW
var stellar = require('stellar-sdk');
var arrayS = require('./array_secret.json');
const server = new stellar.Server('https://horizon-testnet.stellar.org');
stellar.Network.useTestNetwork();
// gen keypair code
// console.log(arrayS);
// create file
// var arrayS=[];
// var arrayP=[];
// for(num in names){
//   // console.log(name);
//   let key = stellar.Keypair.random();
//   arrayS.push({name:names[num],keypair:key.secret()});
//   arrayP.push({name:names[num],keypair:key.publicKey()});
// }
// console.log(JSON.stringify(arrayS));
// console.log(JSON.stringify(arrayP));
const run = async() =>{
  const sourcekey = stellar.Keypair.fromSecret(
    'SDX2WSMWA5JVOQFFNP7A4IO7CSVWHLAL6D6GIUQB4EA2QFQ5I4NG6SRW'
  );
  const sourceAccount = await server.loadAccount(sourcekey.publicKey());
  var destination = [];
  // arrayS.forEach((bnk)=> {
  //   console.log(bnk.name+" "+stellar.Keypair.fromSecret(bnk.secret).publicKey());
  // });
  let transaction = new stellar.TransactionBuilder(sourceAccount);
  arrayS.forEach((bnk) => {
    const options = {
      destination: stellar.Keypair.fromSecret(bnk.secret).publicKey(),
      startingBalance: '1'
    };
    const xdrOperation = stellar.Operation.createAccount(options);
    transaction = transaction.addOperation(xdrOperation);
  });

  transaction = transaction.build();
  transaction.sign(sourcekey);
  const transactionResult = await server.submitTransaction(transaction);
  console.log(transactionResult);
};
run();
