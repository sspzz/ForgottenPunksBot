const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const contract = require("./util/contract");
const summon = require("./util/summon");
const lair = require("./util/lair.js");
const warriors = require("./util/warriors.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN;
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");

  contract
    .soulsContract()
    .on("SoulSummoned", async (tokenContract, tokenId, soulId) => {
      try {
        await summon.postSummon(client, tokenId, soulId);
      } catch (error) {
        console.log(error);
      }
    });
  contract
    .spellsMinterContract()
    .on("SummoningCircleMinted", async (minter) => {
      try {
        await summon.postCircle(client, minter, false);
      } catch (error) {
        console.log(error);
      }
    });
  contract
    .spellsMinterContract()
    .on("SummoningCircleClaimed", async (minter) => {
      try {
        await summon.postCircle(client, minter, true);
      } catch (error) {
        console.log(error);
      }
    });

  contract.warriorsContract().on("WarriorMinted", async (warriorId) => {
    try {
      warriors.postMint(client, warriorId);
    } catch (error) {
      console.log(error);
    }
  });

  contract.beastsContract().on("BeastSpawnedEnabled", async (beastId) => {
    try {
      lair.postBeastReady(client, beastId);
    } catch (error) {
      console.log(error);
    }
  });
  contract.beastLairContract().on("AllSpawnStolen", async (beastId) => {
    try {
      lair.postAllStolen(client, beastId);
    } catch (error) {
      console.log(error);
    }
  });
  contract
    .beastLairContract()
    .on("SpawnStolen", async (spawnId, beastId, warriorId) => {
      try {
        lair.postSteal(client, spawnId, beastId, warriorId);
      } catch (error) {
        console.log(error);
      }
    });
  contract
    .beastLairContract()
    .on("WarriorEnslaved", async (beastId, warriorId) => {
      try {
        lair.postEnslave(client, beastId, warriorId);
      } catch (error) {
        console.log(error);
      }
    });
  contract
    .beastLairContract()
    .on("WarriorKilled", async (beastId, warriorId) => {
      try {
        lair.postKilled(client, beastId, warriorId);
      } catch (error) {
        console.log(error);
      }
    });
  contract
    .beastLairContract()
    .on("WarriorEscaped", async (beastId, warriorId) => {
      try {
        lair.postEscaped(client, beastId, warriorId);
      } catch (error) {
        console.log(error);
      }
    });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    if (command.postExecute) {
      await command.postExecute();
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
