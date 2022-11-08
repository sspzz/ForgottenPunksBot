const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("util");
const request = require("request");
const api = require("../util/api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punk")
    .setDescription("Show a ForgottenPunk")
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
    const requestPromise = util.promisify(request);
    const { body } = await requestPromise(api.meta(token));
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: true };
    });
    const embed = new EmbedBuilder()
      .setTitle(metaJSON.name)
      .setURL(
        `https://opensea.io/assets/ethereum/0x4addac15971ab60ead954b8f15a67518730450e0/${token}`
      )
      .setImage(api.punk(token))
      .addFields(fields);
    return interaction.reply({ embeds: [embed] });
  },
};
