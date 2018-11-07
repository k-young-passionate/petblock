const Web3 = require('web3')
const url = 'https://ropsten.infura.io/v3/708c2cbd30464a54a02f12888706f796'
const web3 = new Web3(url)
const abi = [{
		"constant": false,
		"inputs": [{
				"name": "pet_owner",
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
		"inputs": [{
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
	}
]
const contractAddress = '0x7cB2a436860daf8e0eb9c9C85e616FbcE10d6bD0'
const contract = new web3.eth.Contract(abi, contractAddress);

contract.getPastEvents(
	'register', {
		fromBlock: 4362097,
		toBlock: 'latest'
	}, (err, events) => {
		if (err) {
			console.log("error!");

		} else {
			var i = 0;
			for (i = 0; i < events.length; i++) {
				console.log(events[i]["returnValues"]);
			}
		}
	}
)