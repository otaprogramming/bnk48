const stellar = require('stellar-sdk');
const memberKeys = require('./member_keys.json');

const server = new stellar.Server('https://horizon-testnet.stellar.org');
stellar.Network.useTestNetwork();

const firstWalletSecret = 'SDX2WSMWA5JVOQFFNP7A4IO7CSVWHLAL6D6GIUQB4EA2QFQ5I4NG6SRW'
const firstWalletKeypair = stellar.Keypair.fromSecret(firstWalletSecret);
const firstWalletPublicKey = firstWalletKeypair.publicKey()

const run = async () => {
  const sourceAccount = await server.loadAccount(firstWalletPublicKey);
  let transaction = new stellar.TransactionBuilder(sourceAccount);

  memberKeys.forEach((bnk) => {
    const options = {
      destination: bnk.publicKey,
      startingBalance: '1'
    };
    const xdrOperation = stellar.Operation.createAccount(options);
    transaction = transaction.addOperation(xdrOperation);
  });

  transaction = transaction.build();
  transaction.sign(firstWalletKeypair);

  const transactionResult = await server.submitTransaction(transaction);
  console.log(transactionResult);
};

run();
