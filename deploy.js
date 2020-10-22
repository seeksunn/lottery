const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(new
    web3.providers.HttpProvider('http://localhost:8545'));
const bytecode = fs.readFileSync('./build/__contracts_lottery_sol_Lottery.bin');
const abi = JSON.parse(fs.readFileSync('./build/__contracts_lottery_sol_Lottery.abi'));
const deploy = async() => {
    accounts = await web3.eth.getAccounts()
    await web3.eth.personal.unlockAccount(accounts[0], "password1", 0 , (error) => {
        if (error) {
            console.log(error);
        }
    });
    lottery = await
    new web3.eth.Contract(abi)
    .deploy({
        data: '0x'+bytecode        
    }).send({
        from: accounts[0],
        gas:'1000000'
    });
    console.log('contract deployed to',lottery.options.address);    
};
deploy();