import React from 'react';
import { List } from 'semantic-ui-react';
import Cards from '../../Cards';
import { useDispatch } from  'react-redux'

function ChatLine ({ messageKey, badges = [], name, message, color, badgeSets = {} }) {
  //Placeholder until badges are in place
  //Delete this and two lines above when badges work
  const dispatch = useDispatch();
  return (
    <List.Item 
      className="message-list"
      key={messageKey}
      onClick={() => dispatch(Cards.actions.add(name))}
    >
      <span className="message-part">
        <span className="message" style={{ color: color }}>
          {badges.map((image, index) => { 
          return (
            <img alt=""
              className="message-emote"
              src={badgeSets[image.name].versions[image.version].image_url_1x}
              key={index}
            />
          )})}
        {`${name} : `}
        </span>
        <span className="message">
            {message}
        </span>
      </span>
    </List.Item>
  )
}

export default ChatLine;