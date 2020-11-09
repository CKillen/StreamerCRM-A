import React from 'react';
import ChatLine from '../../../Chat/Components/ChatLine';
import { shallow } from 'enzyme';
import { List } from 'semantic-ui-react';
import Cards from '../../../Cards';
import * as redux from 'react-redux';

describe('ChatLine', () => {
  let chatLineItem;
  let chatLineProps0 = {
    message: "Hi this is a test message",
    name: "tester",
    color: "fakeColor", 
    badges: [],
    messageKey: '1',
  }
  let chatLineProps1 = {
    message: "Hi this is a test message",
    name: "tester",
    color: "fakeColor", 
    badges: [
      'image1',
    ],
    messageKey: '1',
  }
  let chatLineProps2 = {
    message: "Hi this is a test message",
    name: "tester",
    color: "fakeColor", 
    badges: [
      'image1',
      'image2',
    ],
    messageKey: '1',

  }
  beforeAll(() => {
    jest.spyOn(redux, 'useDispatch').mockImplementation(() => jest.fn());
    chatLineItem = shallow(<ChatLine {...chatLineProps1} />).find(List.Item);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should have correct props', () => {
    expect(chatLineItem.key()).toEqual(chatLineProps1.messageKey);
    expect(chatLineItem.props().className).toEqual('message-list');
  });

  it('should include span with classname message-part', () => {
    expect(chatLineItem.find('span.message-part')).toHaveLength(1);
  });

  it('should have 2 span with class message', () => {
    expect(chatLineItem.find('span.message')).toHaveLength(2);
  })

  it('second span message should have the message', () => {
    expect(chatLineItem.find('span.message').at(1).text())
      .toEqual(chatLineProps1.message);
  });

  it('should call Cards.actions.add when List.Item is clicked', () => {
    const mockFunction = jest.fn();
    let cardSpy = jest.spyOn(Cards.actions, 'add').mockImplementation(mockFunction);
    chatLineItem.simulate('click');
    expect(cardSpy).toHaveBeenCalled();
  });

  describe('span message', () => {
    let spanMessage;
    beforeAll(() => {
      spanMessage = chatLineItem.find('span.message').at(0);
      //TODO Finish
    })

    it('should have the corect style', () => {
      expect(spanMessage.props('style').style.color).toEqual(chatLineProps1.color);
    })

    it('should have 0 imgs with class message emote when 0 provided', () => {
      let currentChatLine = shallow(<ChatLine {...chatLineProps0} />).find(List.Item);
      let nameSpan = currentChatLine.find('span.message').at(0);
      expect(nameSpan.find('img.message-emote')).toHaveLength(0);
    })

    it('should have 1 imgs with class message emote when 1 provided', () => {
      expect(spanMessage.find('img.message-emote')).toHaveLength(1);
    })

    it('should have multiple imgs with class message emote when multiple provided', () => {
      let currentChatLine = shallow(<ChatLine {...chatLineProps2} />).find(List.Item);
      let nameSpan = currentChatLine.find('span.message').at(0);
      expect(nameSpan.find('img.message-emote')).toHaveLength(chatLineProps2.badges.length);
    })
    
    it('should have name in 1st span.message', () => {
      let expectedText = `${chatLineProps1.name} : `
      expect(spanMessage.text()).toEqual(expectedText);
    })
  })


})