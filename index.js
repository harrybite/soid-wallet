const { DirectSecp256k1HdWallet } = require("soid-wallet");
// const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");



// this method use for generating wallet address with mnemonic for discoverynet wot
const generateWallet = async () => {
    const wallet = await DirectSecp256k1HdWallet.generate(24);
    const accounts = await wallet.getAccounts();
  
    console.log("Mnemonic ", mnemonic)
    console.log("Mnemonic with 1st account:",  accounts[0].address);
    await deriveAddressesFromMnemonic(wallet.mnemonic)
};

// this method use for derived wallet address from mnemonic for discoverynet 
const deriveAddressesFromMnemonic = async (mnemonic) => {
   
    console.log("Mnemonic ", mnemonic)
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    
    const accounts = await wallet.getAccounts();
    
    console.log("Custom addresses:", accounts[0].address);
};

generateWallet();
