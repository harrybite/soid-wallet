const { DirectSecp256k1HdWallet, Registry } = require('soid-wallet');
const { SigningStargateClient, assertIsBroadcastTxSuccess } = require('@cosmjs/stargate');
const { MsgUnjail } = require('cosmjs-types/cosmos/slashing/v1beta1/tx');

// Configuration
const rpcEndpoint = 'http://146.190.5.120:26657'; // Replace with your RPC endpoint
const mnemonic = ''; // Replace with your mnemonic
const prefix = 'cosmosvaloper'; // Your chain's prefix
const validatorAddress = ''; // Replace with your validator address
const fee = {
    amount: [{ denom: 'soid', amount: '500' }],
    gas: '200000',
};


// Unjail Function
async function unjailValidator() {
    // Create wallet from mnemonic
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
  
    // Get the first account from the wallet
    const [firstAccount] = await wallet.getAccounts();
  
    // Create a registry and register the MsgUnjail type
    const registry = new Registry();
    registry.register('/cosmos.slashing.v1beta1.MsgUnjail', MsgUnjail);
  
    // Connect to the blockchain
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { registry });
  
    // Create the unjail message
    const msgUnjail = {
      typeUrl: '/cosmos.slashing.v1beta1.MsgUnjail',
      value: {
        validatorAddr: validatorAddress,
      },
    };
  
    // Sign and broadcast the transaction
    const result = await client.signAndBroadcast(firstAccount.address, [msgUnjail], fee);
    // assertIsBroadcastTxSuccess(result);
  
    console.log('Transaction successful:', result);
  }
  
  // Run the unjail function
  unjailValidator().catch(console.error);
