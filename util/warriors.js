const { EmbedBuilder } = require("discord.js");
const api = require("./api");
const request = require("request");
const util = require("util");
require("dotenv").config();

module.exports = {
  postMint: async function postMint(client, warriorId) {
    const title = `Warrior Punk #${warriorId} has been Minted!`;
    const warriorUrl = `https://opensea.io/assets/ethereum/${process.env.WARRIORS_CONTRACT_ADDRESS}/${warriorId}`;
    const warriorImage = api.warrior(warriorId);
    const requestPromise = util.promisify(request);
    const { body } = await requestPromise(api.warriorMeta(warriorId));
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: false };
    });

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setImage(warriorImage)
      .addFields(fields)
      .setURL(warriorUrl);
    const channel = client.channels.cache.get(process.env.POST_WARRIORS_CHANNEL);
    return channel.send({ embeds: [embed] });
  },
};
