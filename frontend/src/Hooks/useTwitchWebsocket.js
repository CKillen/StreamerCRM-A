import React, { useEffect, useRef, useState } from "react"
import Config from '../Config/config';
import twitchIrcParser from '../helpers/twitchIrcParser'
//rename to twitchWebsocketInterface
//My plan for this is to break it up and for this to be a combiner
//ie this is twitchWebSocketChatToHTML
//draws from twtichWebsocket
//Also draws from parser which also converts to html
//need to add badges later

export const useTwitchMessages = (username) => {
  const [chats, setChats] = useState([]);
  const webSocket = useRef(null)
  useEffect(() => {
    webSocket.current = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    webSocket.current.onopen = () => {
      webSocket.current.send(`pass ${Config.oauth}`);
      webSocket.current.send(`nick ${Config.nickname}`);
      webSocket.current.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      webSocket.current.send('CAP REQ :twitch.tv/membership');
      webSocket.current.send(`join #${username}`);
      webSocket.current.onmessage = (message) => setChats(chats => {
        let text = twitchIrcParser(message.data)
        if(text != null) {
          const parsedMessage = parseMessageWithEmotes(text.message, text.emoteData);
          const newChat = {
            ...text,
            message: parsedMessage,
          }
          return [ ...chats, newChat];
        } else {
          return [...chats];
        }
      });
    };
  }, [])
  //I feel like this doesn't belong here
  function parseMessageWithEmotes(message, emoteData) {
    const sortedEmoteData = sortEmoteDataByStartPosition(emoteData);
    const parsedMessage = buildMessage(message, sortedEmoteData);
    return parsedMessage;
  }

  function buildMessage(message, sortedEmoteData) {
    const messageWithEmotes = [];
    let currentPosition = 0;
    for (let i = 0; i < sortedEmoteData.length; i++) {
      const currentEmote = sortedEmoteData[i];
      messageWithEmotes.push(message.substring(currentPosition, currentEmote.startPos));
      messageWithEmotes.push(<img alt="someEmote" src={currentEmote.url} />);
      currentPosition = parseInt(currentEmote.endPos, 10) + 1;
    }
    if (currentPosition < message.length) {
      messageWithEmotes.push(message.substring(currentPosition));
    }
    return messageWithEmotes;
  }

  function sortEmoteDataByStartPosition(emoteData) {
    return emoteData.sort((a, b) => a.startPos - b.startPos);
  }

  return chats;
} 
