import React from 'react';
import { shallow } from "enzyme";
import HeaderSection from '../../../Header/Components/HeaderSection';


describe('Header Section', () => {

  let headerSection;
  beforeAll(() => {
    headerSection = shallow(<HeaderSection />);
  })

  it('should include a div with class head', () => {
    expect(headerSection.find('div.head')).toHaveLength(1);
  });

  it('should include an h1 with text StreamerCRM', () => {
    expect(headerSection.find('h1').text()).toEqual('StreamerCRM');
  });
  
});