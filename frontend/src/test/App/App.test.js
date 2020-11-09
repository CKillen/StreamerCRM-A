import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import Cards from '../../Cards';
import Chat from '../../Chat';
import Header from '../../Header';


describe('App', () => {
  it('app contains header section', () => {
    const appWrapper = shallow(<App/>);
    expect(appWrapper.find(Header.components.HeaderSection)).toHaveLength(1);
  })
  it('app contains card section', () => {
    const appWrapper = shallow(<App />);
    const cardSection = appWrapper.find(Cards.components.CardSection);
    
    expect(cardSection).toHaveLength(1);
  });

  it('app contains chat section', () => {
    const appWrapper = shallow(<App />);
    const chatSection = appWrapper.find(Chat.components.ChatSection);
    
    expect(chatSection).toHaveLength(1);
  });


})