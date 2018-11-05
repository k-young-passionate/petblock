const Web3 = require('web3')
var Tx = require('ethereumjs-tx') //npm install ethereumjs-tx
const url = 'https://ropsten.infura.io/v3/708c2cbd30464a54a02f12888706f796'
const web3 = new Web3(url)

const account1 = '0x19c5FbD9A883b5124d0DD2AE581f79ACd52E2DC9'

const privateKey1 = Buffer.from('6164FCC085B764EB9C2A6F267DD3D11C677C8C5CA6A6277E34E655922426A8B2', 'hex') // have to change key when launching
const abi = [{"constant": false,"inputs": [{	"name": "pet_owner",
				"type": "bytes32"
			},
			{
				"name": "pet_index",
				"type": "uint32"
			},
			{
				"name": "certificate_index",
				"type": "uint32"
			},
			{
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "regist",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "pet_owner",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "pet_index",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "certificate_index",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "register",
		"type": "event"
	}]
const contractAddress = '0x7cB2a436860daf8e0eb9c9C85e616FbcE10d6bD0'



var pet_owner = '0x19c5FbD9A883b5124d0DD2AE581f79ACd52E2DC9'
var pet_index = 2
var certificate_index = 4
var hash = '0x124155'

const pet = new web3.eth.Contract(abi, contractAddress)

// web3 version 1.0.0
const data = pet.methods.regist(pet_owner, pet_index, certificate_index, hash).encodeABI()

web3.eth.getTransactionCount(account1, (err, txCount) => {

    // Create transaction txObject
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: data
    }

    //Sign the trasnaction
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    //Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)
    })
})
