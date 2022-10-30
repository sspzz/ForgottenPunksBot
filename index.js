const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const contract = require("./util/contract");
const summon = require("./util/summon");
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

  contract.soulsContract().on("SoulSummoned", async (tokenContract, tokenId, soulId) => {
    await summon.postSummon(client, tokenId, soulId);
  })
  contract.spellsMinterContract().on("SummoningCircleMinted", async (minter) => {
    await summon.postCircle(client, minter, false);
  })
  contract.spellsMinterContract().on("SummoningCircleClaimed", async (minter) => {
    await summon.postCircle(client, minter, true);
  })
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
