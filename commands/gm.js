const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const api = require("../util/api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gm")
    .setDescription("GM! Say it back!")
    .addIntegerOption((option) =>
      option
        .setName("token")
        .setDescription("Token ID")
        .setMinValue(0)
        .setMaxValue(999)
        .setRequired(true)
    ),
  async execute(interaction) {
    const token = interaction.options.getInteger("token");
    const embed = new EmbedBuilder()
      .setTitle(`ForgottenPunk #${token}`)
      .setURL(
        `https://opensea.io/assets/ethereum/0x4addac15971ab60ead954b8f15a67518730450e0/${token}`
      )
      .setImage(api.gm(token, false));
    return interaction.reply({ embeds: [embed] });
  },
};
