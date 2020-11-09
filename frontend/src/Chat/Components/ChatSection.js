import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import ChatLine from '../Components/ChatLine'
import { useTwitchMessages } from '../../Hooks/useTwitchWebsocket'
import useApi from '../../Hooks/useAPI';

export default function ChatSection({ username, id }) {
  const globalBadges = useApi('https://badges.twitch.tv/v1/badges/global/display');
  const channelBadges = useApi(`https://badges.twitch.tv/v1/badges/channels/${id}/display`)
  const [badgeSets, setBadgeSets] = useState({});
  useEffect(() => {
    let combinedBadges = {
      ...globalBadges.data.badge_sets
    }
    for(const sets in channelBadges.data.badge_sets) {
      if(combinedBadges[sets]) {
        combinedBadges[sets].versions = {
          ...combinedBadges[sets].versions,
          ...channelBadges.data.badge_sets[sets].versions,
        }
      } else {
        combinedBadges = {
          ...combinedBadges,
          ...channelBadges.data.badge_sets[sets],
        }
      }
    }
    setBadgeSets(combinedBadges);
  }, [globalBadges.data.badge_sets, channelBadges.data.badge_sets])
  let chats = useTwitchMessages(username);
  return (
      <div className="chat-section">
        <List divided className="chat-list">
          {chats.map((chatInfo, index) => {
            return <ChatLine {...chatInfo} key={index} badgeSets={badgeSets} />
          })}
        </List>
      </div>
  )
}