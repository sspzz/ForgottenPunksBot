const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const api = require("../util/api");
const util = require("util");
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("sgm")
  .setDescription("GM! Say it back!")
  .addIntegerOption((option) =>
    option
      .setName("token")
      .setDescription("Token ID")
      .setMinValue(0)
      .setMaxValue(665)
      .setRequired(true)
  ),
async execute(interaction) {
    await interaction.deferReply();
    const token = interaction.options.getInteger("token");
    const requestPromise = util.promisify(request);
    const { statusCode } = await requestPromise(api.soulmeta(token));
    if (statusCode != 200) {
      return interaction.editReply(`SoulPunk #${token} has not been Summoned!`);
    }    
    const embed = new EmbedBuilder()
      .setTitle(`SoulPunk #${token}`)
      .setURL(
        `https://opensea.io/assets/ethereum/${process.env.SOULS_CONTRACT_ADDRESS}/${token}`
      )
      .setImage(api.gm(token, true));
    return interaction.editReply({ embeds: [embed] });
  },
};
