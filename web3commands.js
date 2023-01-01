\//retrieve private variables

await contract2.methods.owner().call() //for view or pure functions
await contract2.methods.init().send({from: player}) //for gas functions

await contract2.methods.init( param1, param2,  {from: player, value: 1000}) //actually works

> await web3.eth.getStorageAt('0x39E2C1570093218C35b4549667896bcc675aeC23',1)
'0x1000000000000000000000000000000000000000000000000020000000000003'

1st param conract address
2nd param slot number




//find data field

contractInstance.call(bytes4(sha3("functionName(inputType)"))

// I did so in the console, having already computed
// the bytes4(sha3("pwn()"))

await sendTransaction({
  from: "0x1733d5adaccbe8057dba822ea74806361d181654",
  to: "0xe3895c413b0035512c029878d1ce4d8702d02320",
  data: "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
});




//node

const Web3 = require('web3')
const url = 'http://127.0.0.1:8545'
const web3 = new Web3(url)

accounts = web3.eth.getAccounts()

var account;

accounts.then( (v)=> {( this.account = v[9] )}  )

const contract = new web3.eth.Contract(abi,address)

contract.methods.withdraw('1000000000000000000').send({gas:3000000, from: account})

contract.methods.kill().send({gas:3000000, from:account})

_____________________________________________________________

//cryptozombies

ZC = web3.eth.contract(abi)
Z = ZC.at(address)
Z.function()
