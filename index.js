const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
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

// const twitterClient = new Twitter(twitterConf);
// const channelId = '11111111111111111111'; 
// const stream = twitterClient.stream('statuses/filter', {
//   follow: '2899773086', // @Every3Minutes, specify whichever Twitter ID you want to follow
// });

// stream.on('tweet', tweet => {
//   const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
//   client.channels.get(dest).send(twitterMessage);
//   return false;
// });

client.once("ready", () => {
  console.log("Ready!");
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
