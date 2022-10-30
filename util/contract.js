const ethers = require('ethers');

require("dotenv").config();

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "soulId",
        type: "uint256",
      },
    ],
    name: "SoulSummoned",
    type: "event",
  },
];

const spellsAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address"
      }
    ],
    name: "SummoningCircleClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address"
      }
    ],
    name: "SummoningCircleMinted",
    type: "event"
  },
]

function getProvider() {
  return new ethers.providers.AlchemyProvider(
    process.env.ALCHEMY_NETWORK == "mainnet"
      ? "homestead"
      : process.env.ALCHEMY_NETWORK,
    process.env.ALCHEMY_API_KEY
  );
}

module.exports = {
  soulsContract: function () {
    return new ethers.Contract(
      process.env.SOULS_CONTRACT_ADDRESS,
      abi,
      getProvider()
    );
  },
  spellsMinterContract: function () {
    return new ethers.Contract(
      process.env.SPELLSMINTER_CONTRACT_ADDRESS,
      spellsAbi,
      getProvider()
    );
  },
};
