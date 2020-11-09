import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ChatSection from '../../../Chat/Components/ChatSection'
import { List } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import ChatLine from '../../../Chat/Components/ChatLine'
import * as twitchWebSocket from '../../../Hooks/useTwitchWebsocket';

describe('Chat', () => {
  //This section is responsible for 
  //1) keeping the "state" (probably hooks)
  //2) mapping out ChatLines
  //3) Keeps track of websocket that allows access to twitch chat
  //Note the token grabbed for twitch chat is recieved in auth when completed

  let chatSection;
  jest.mock('../../../Hooks/useTwitchWebsocket');
  twitchWebSocket.useTwitchMessages = jest.fn();
  beforeEach(() => {
    twitchWebSocket.useTwitchMessages.mockReturnValue([]);
    chatSection = mount(<ChatSection />);
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should render div with class chat-section ', () => {
    expect(chatSection.find('div.chat-section')).toHaveLength(1);
  });

  it('should have a List', () => {
    expect(chatSection.find(List)).toHaveLength(1);
  })

  it('List should be passed correct props', () => {
    const expectedProps = {
      divided: true,
      className: 'chat-list',
    }
    expect(chatSection.find(List).props()).toMatchObject(expectedProps);
  })

  it('should have 0 ChatLines if state is empty', () => {
    let state = [];
    twitchWebSocket.useTwitchMessages.mockReturnValue([])
    const chatSection = shallow(<ChatSection />);
    expect(chatSection.find(ChatLine)).toHaveLength(0);
  });

  it('should have 1 ChatLine if state has one', () => {
    let state = [{ name: "Chris"}];
    twitchWebSocket.useTwitchMessages.mockReturnValue(state);
    const chatSection = shallow(<ChatSection />);
    expect(chatSection.find(ChatLine)).toHaveLength(1);
  })

  it('should have multiple Chatlines when state has multiple', () => {
    let state = [{ name: "Chris"}, { name: "Fill" }, { name: "Temp" }];
    twitchWebSocket.useTwitchMessages.mockReturnValue(state);
    const chatSection = shallow(<ChatSection />);
    expect(chatSection.find(ChatLine)).toHaveLength(3);
  });

});