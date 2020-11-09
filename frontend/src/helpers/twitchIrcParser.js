/* eslint-disable no-use-before-define */
const helper = require('./helper.js');

const twitchIrcParser = (ircData) => {
  let sendData = null;
  if (ircData.includes('PRIVMSG')) {
    const tags = parseTags(ircData);
    const message = parseMessage(ircData);
    const channel = parseChannel(ircData);
    const name = parseName(tags);
    const color = parseColor(tags, name);
    const mod = parseModStatus(tags);
    const emoteData = createEmoteArray(tags);
    const badges = parseBadges(tags);

    sendData = {
      name,
      message,
      emoteData,
      channel,
      color,
      mod,
      badges,
    };
  }

  return sendData;
};

function parseBadges(tags) {
  const badges = [];
  const badgePosition = tags.indexOf('badges=');
  const startPosition = tags.indexOf('=', badgePosition) + 1;
  const endPosition = tags.indexOf(';', badgePosition);
  const badgeString = tags.substring(startPosition, endPosition);
  const unparsedBadges = badgeString.split(',');
  for (let i = 0; i < unparsedBadges.length; i++) {
    const currentBadge = unparsedBadges[i].split('/');
    if (currentBadge[0] !== '') {
      badges.push({
        name: currentBadge[0],
        version: currentBadge[1],
      });
    }
  }
  return badges;
}

function createEmoteArray(tags) {
  const emoteStart = tags.indexOf('=', tags.indexOf('emotes=')) + 1;
  const emoteEnd = tags.indexOf('flags') - 1;
  const emoteString = tags.substring(emoteStart, emoteEnd);
  const emoteArray = emoteString.split('/');
  const emoteData = [];
  if (emoteEnd <= -1 || tags[emoteEnd - 1] === '=') {
    return emoteData;
  }

  for (let i = 0; i < emoteArray.length; i++) {
    const emoteParts = emoteArray[i].split(':');
    const childEmotes = emoteParts[1].split(',');

    for (let j = 0; j < childEmotes.length; j++) {
      emoteData.push(
        createEmoteObject(emoteParts[0], childEmotes[j]),
      );
    }
  }

  return emoteData;
}

function createEmoteObject(parentEmoteId, childEmote) {
  const emote = {};
  // #-# is how it determines the pos
  const emotePosition = childEmote.split('-');
  [emote.startPos, emote.endPos] = emotePosition;
  emote.url = `https://static-cdn.jtvnw.net/emoticons/v1/${parentEmoteId}/1.0`;
  return emote;
}

function parseMessage(ircData) {
  return ircData.substring(
    ircData.indexOf(':', ircData.indexOf('PRIVMSG #')) + 1,
  ).trim();
}

function parseChannel(ircData) {
  return ircData.substring(
    ircData.indexOf('#', ircData.indexOf('PRIVMSG #')) + 1,
    ircData.indexOf(':', ircData.indexOf('PRIVMSG #') + 1),
  ).trim();
}

function parseName(tags) {
  const displayNamePosition = tags.indexOf('display-name=');
  const startPosition = tags.indexOf('=', displayNamePosition) + 1;
  const endPosition = tags.indexOf(';', displayNamePosition);
  return tags.substring(startPosition, endPosition).trim();
}

function parseModStatus(tags) {
  const modPosition = tags.indexOf('mod=');
  const modIndex = tags.indexOf('=', modPosition) + 1;
  return tags[modIndex] === '1';
}

function parseTags(ircData) {
  // @tag-name..... next part starts with :
  return ircData.substring(
    ircData.indexOf('@'),
    ircData.indexOf(';user-type='),
  );
}

function parseColor(tags, name) {
  let color;
  if (tags[tags.indexOf('=', tags.indexOf('color=')) + 1] !== ';') {
    color = tags.substring(
      tags.indexOf('#', tags.indexOf('color=')),
      tags.indexOf(';', tags.indexOf('color=')),
    ).trim();
  } else {
    color = helper.get_color_for_user(name);
  }

  return color;
}

export default twitchIrcParser;
