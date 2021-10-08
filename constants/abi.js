const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_hello",
                "type": "string"
            }
        ],
        "name": "CreateHello",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GetHello",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GetHelloListing",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct HelloVote.HelloWorld[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "helloIndex",
                "type": "uint256"
            }
        ],
        "name": "VoteHello",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const contractAddress = "0x93e5f17dd023a0baef5d4587801b154615331e80";

export { contractAddress, abi }