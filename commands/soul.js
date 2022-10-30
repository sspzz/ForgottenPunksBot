const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("util");
const request = require("request");
const api = require("../util/api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("soul")
    .setDescription("Show a SoulPunk")
    .addIntegerOption((option) =>
      option
        .setName("token")
        .setDescription("Token ID of the SoulPunk")
        .setMinValue(0)
        .setMaxValue(665)
        .setRequired(true)
    ),
  async execute(interaction) {
    const token = interaction.options.getInteger("token");
    const requestPromise = util.promisify(request);
    const { statusCode, body } = await requestPromise(api.soulmeta(token));
    if (statusCode != 200) {
      return interaction.reply(`SoulPunk #${token} has not been Summoned!`);
    }
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: true };
    });
    const embed = new EmbedBuilder()
      .setTitle(metaJSON.name)
      .setURL(
        `https://opensea.io/assets/ethereum/${process.env.SOULS_CONTRACT_ADDRESS}/${token}`
      )
      .setImage(api.soul(token))
      .addFields(fields);
    return interaction.reply({ embeds: [embed] });
  },
};
