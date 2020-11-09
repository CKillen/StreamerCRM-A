import React from 'react';
import { shallow, mount } from 'enzyme';
import Cards from '../../../Cards';
import * as redux from 'react-redux';

const { CardSection, CRMCard } = Cards.components;

describe('CardSection Test', () => {
  const cardOneViewer = [
    { name: "Jeffry", inputs: [], sticky: true, id: 0 }
  ]
  const cardMultipleViewers = [
      { name: "Jeffly", inputs: [], sticky: true, id: 1 },
      { name: "Chrinte", inputs: [], sticky: true, id: 2 },
      { name: "Tagaa", inputs: [], sticky: true, id: 3  },
  ]

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('renders div with class card-section', () => {

    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([]);
    const cardSection = shallow(<CardSection />);

    expect(cardSection.find('div.card-section')).toHaveLength(1);
  })

  it('returns zero CRMCard if none are given', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([]);
    const cardSection = shallow(<CardSection />);

    expect(cardSection.find(CRMCard)).toHaveLength(0);
  })

  it('returns one CRMCard when one is passed', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(cardOneViewer);
    const cardSection = shallow(<CardSection />);

    expect(cardSection.find(CRMCard)).toHaveLength(1);
  });

  it('It returns three CRMCards when three are passed', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(cardMultipleViewers);
    const cardSection = shallow(<CardSection />);

    expect(cardSection.find(CRMCard)).toHaveLength(3);
  })

  it('should pass correct info to each card', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(cardMultipleViewers);
    const crmCards = shallow(<CardSection />).find(CRMCard);;
    crmCards.forEach((card, index) => {
      expect(card.props().viewer).toMatchObject(cardMultipleViewers[index]);
    })
  });
});