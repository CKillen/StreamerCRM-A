import React from 'react';
import Cards from '../../Cards';
import CRMCard from '../../Cards/Components/CRMCard';
import { NAME } from '../../Cards/constants';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe("should have interface", () => {
  const viewer = {
    name: "Jeslie",
    inputs: [
      "Example 1",
      "Example 2",
      "Example 3",
    ],
    sticky: true,
    id: 0,
  }

  it('should include constants', () => {
    expect(Cards.constants.NAME).toEqual(NAME);
  });

  it('should include components', () => {
    let spy = jest.spyOn(redux, 'useDispatch');
    spy.mockReturnValue(jest.fn())
    expect(shallow(<CRMCard viewer={viewer} />).html()).toEqual(shallow(<Cards.components.CRMCard viewer={viewer} />).html());
    jest.resetAllMocks();
  });

  it('should contain actions', () => {
    expect(typeof Cards.actions.add).toBe('function');
  });

  it('should include reducers', () => {
    expect(Cards.reducer([], {})).toEqual([]);
  })

  it('should include selectors', () => {
    expect(typeof Cards.selectors.getAll).toBe('function');
  });

});