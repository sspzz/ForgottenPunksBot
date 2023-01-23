const ethers = require("ethers");
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
        type: "address",
      },
    ],
    name: "SummoningCircleClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "SummoningCircleMinted",
    type: "event",
  },
];

const warriorsAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "warriorId",
        type: "uint256",
      },
    ],
    name: "WarriorMinted",
    type: "event",
  },
];

const beastsAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256"
      }
    ],
    name: "BeastSpawnedEnabled",
    type: "event"
  },
]

const lairAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256",
      },
    ],
    name: "AllSpawnStolen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "spawnId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "warriorId",
        type: "uint256",
      },
    ],
    name: "SpawnStolen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "warriorId",
        type: "uint256",
      },
    ],
    name: "WarriorEnslaved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "warriorId",
        type: "uint256",
      },
    ],
    name: "WarriorEscaped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "beastId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "warriorId",
        type: "uint256",
      },
    ],
    name: "WarriorKilled",
    type: "event",
  },
];

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
  warriorsContract: function () {
    return new ethers.Contract(
      process.env.WARRIORS_CONTRACT_ADDRESS,
      warriorsAbi,
      getProvider()
    );
  },
  beastsContract: function () {
    return new ethers.Contract(
      process.env.BEASTS_CONTRACT_ADDRESS,
      beastsAbi,
      getProvider()
    );
  },
  beastLairContract: function () {
    return new ethers.Contract(
      process.env.BEASTLAIR_CONTRACT_ADDRESS,
      lairAbi,
      getProvider()
    );
  },
};
