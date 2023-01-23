const { EmbedBuilder } = require("discord.js");
const api = require("./api");
const request = require("request");
const util = require("util");
require("dotenv").config();

async function postWarriorEvent(
  client,
  title,
  description,
  beastId,
  warriorId
) {
  const warriorUrl = `https://opensea.io/assets/ethereum/${process.env.WARRIORS_CONTRACT_ADDRESS}/${warriorId}`;
  const warriorImage = api.warrior(warriorId);
  const beastImage = api.beast(beastId);
  const requestPromise = util.promisify(request);
  const { body } = await requestPromise(api.warriorMeta(warriorId));
  const metaJSON = JSON.parse(body);
  const fields = metaJSON.attributes.map((a) => {
    return { name: a.trait_type, value: a.value, inline: false };
  });

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setImage(warriorImage)
    .setThumbnail(beastImage)
    .addFields(fields)
    .setURL(warriorUrl);
  const channel = client.channels.cache.get(process.env.POST_BATTLE_CHANNEL);
  return channel.send({ embeds: [embed] });
}

async function postBeastEvent(client, title, description, beastId) {
  const beastUrl = `https://opensea.io/assets/ethereum/${process.env.BEASTS_CONTRACT_ADDRESS}/${beastId}`;
  const beastImage = api.beast(beastId);

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setImage(beastImage)
    .setURL(beastUrl);
  const channel = client.channels.cache.get(process.env.POST_BATTLE_CHANNEL);
  return channel.send({ embeds: [embed] });
}

module.exports = {
  postBeastReady: async function postBeastRead(client, beastId) {
    const title = `Beast Punk #${beastId} is ready for Battle!`;
    const description =
      "This Beast can now be attacked by Warriors for a chance at minting a Spawn. But beware, this is not without risk!";
    return postBeastEvent(client, title, description, beastId);
  },
  postAllStolen: async function postAllStolen(client, beastId) {
    const title = `Beast Punk #${beastId} has no more Spawn!`;
    const description =
      "All Spawn have been stolen, and this beast can no longer be attacked.";
    return postBeastEvent(client, title, description, beastId);
  },
  postSteal: async function postSteal(client, spawnId, beastId, warriorId) {
    const title = `Spawn Punk #${spawnId} has been Stolen!`;
    const spawnUrl = `https://opensea.io/assets/ethereum/${process.env.SPAWN_CONTRACT_ADDRESS}/${spawnId}`;
    const spawnImage = api.spawn(spawnId);
    const warriorImage = api.warrior(warriorId);
    const requestPromise = util.promisify(request);
    const { body } = await requestPromise(api.spawnMeta(spawnId));
    const metaJSON = JSON.parse(body);
    const fields = metaJSON.attributes.map((a) => {
      return { name: a.trait_type, value: a.value, inline: false };
    });

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setImage(spawnImage)
      .setThumbnail(warriorImage)
      .addFields(fields)
      .setURL(spawnUrl);
    const channel = client.channels.cache.get(process.env.POST_BATTLE_CHANNEL);
    return channel.send({ embeds: [embed] });
  },
  postEnslave: async function postEnslave(client, beastId, warriorId) {
    const title = `Warrior Punk #${warriorId} has been Enslaved!`;
    const description = `The mighty Warrior was victorious and got away with a coveted Spawn.`;
    return postWarriorEvent(client, title, description, beastId, warriorId);
  },
  postKilled: async function postKilled(client, beastId, warriorId) {
    const title = `Warrior Punk #${warriorId} has been Killed!`;
    const description =
      "The mighty Beast was victorious and the Warrior was killed.";
    return postWarriorEvent(client, title, description, beastId, warriorId);
  },
  postEscaped: async function postKilled(client, beastId, warriorId) {
    const title = `Warrior Punk #${warriorId} Escaped!`;
    const description =
      "After a viscious battle the mighty Warrior lost but managed to escape.";
    return postWarriorEvent(client, title, description, beastId, warriorId);
  },
};
