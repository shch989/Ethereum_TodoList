const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.REPLACE_WITH_YOUR_MNEMONIC,
  process.env.REPLACE_WITH_YOUR_INFURA_URL 
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  // console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
  console.log('abi:', abi);
  provider.engine.stop();
};
deploy();