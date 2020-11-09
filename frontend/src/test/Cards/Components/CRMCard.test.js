import * as React from 'react';
import { shallow } from 'enzyme';
import Cards from '../../../Cards'
import { 
  Card,
  Icon,
  List,
  Input,
} from 'semantic-ui-react';
import * as redux from 'react-redux';
import * as apiCalls from '../../../Hooks/useAPICalls'

const { CRMCard } = Cards.components;

describe('CRMCard Test', () => {
  let crmCard;
  const viewer = {
    name: "Jeslie",
    sticky: true,
    id: 0,
  }

  const apiViewer = {
    inputs: [
      "Example 1",
      "Example 2",
      "Example 3",
    ],
  }
  let spy;
  let dispatch;
  beforeAll(() => {
    spy = jest.spyOn(redux, 'useDispatch');
    dispatch = jest.fn();
    spy.mockImplementation(() => dispatch)
    jest.spyOn(apiCalls, "useGetViewer")
      .mockReturnValue({ loading: false, viewerInfo: apiViewer });
    crmCard = shallow(<CRMCard viewer={viewer}/>);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have console error if no props given', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(()=>{});
    shallow(<CRMCard />)
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('should give loading card if useState loading is true', () => {
    jest.spyOn(apiCalls, "useGetViewer")
      .mockReturnValue({ loading: true, viewerInfo: apiViewer });
    let loadTest = shallow(<CRMCard viewer={viewer}/>);
    expect(loadTest.find(Cards.components.LoadCard)).toHaveLength(1);
  });

  describe('Overall Structure', () => {
    it('has Card',  () => {
      expect(crmCard.find(Card)).toHaveLength(1);
    });

    it('has two Card.Content', () => {
      expect(crmCard.find(Card.Content)).toHaveLength(2);
    })

    it('has two Card.Headers', () => {
      const crmCardHeader = crmCard.find(Card.Header);
      expect(crmCardHeader).toHaveLength(2);
    });

    it('second Card.Content contains List', () => {
      const crmCardHeader = crmCard.find(Card.Content).at(1);
      expect(crmCardHeader.find(List)).toHaveLength(1);
    });
  })

  describe('First Card.Content Test (Headers)', () => {
    let firstContent;
    beforeAll(() => {
      firstContent = crmCard.find(Card.Content).at(0);
    });

    it('has card-header class', () => {
      expect(firstContent.props().className).toEqual("card-header");
    });

      describe('Card.Headers', () => {
        let headers;
        beforeAll(() => {
          headers = firstContent.find(Card.Header);
        });
        it('first Card.Header contains viewers name', () => {
          expect(headers.at(0).props().children).toBe(viewer.name);
        });

        it('second Card.Header includes class card-icon-group', () => {
          expect(headers.at(1).find('.card-icon-group')).toHaveLength(1);
        });

        it('has two icons in Second Card.Header', () => {
          expect(headers.at(1).find(Icon)).toHaveLength(2);
        });

        it('first Icon is given right props', () => {
          const mockProps = {
            name: 'sticky note',
            size: 'small',
            className: 'card-icon',
            fitted: true,
          }
          const iconProps = headers.at(1).find(Icon).at(0).props();
          expect(typeof iconProps.onClick).toBe('function');
          expect(iconProps).toMatchObject(mockProps);
        });

        it('first Icon name should be sticky note outline when sticky is true', () => {
          const iconName = headers.at(1).find(Icon).at(0).props().name;
          expect(iconName).toEqual('sticky note');
        });

        it('first Icon name should be sticky note outline when sticky is false', () => {
          const viewer = {
            name: "Jeslie",
            inputs: [
              "Example 1",
              "Example 2",
              "Example 3",
            ],
            sticky: false,
            id: 1,
          }
          jest.spyOn(apiCalls, "useGetViewer")
            .mockReturnValue({ loading: false, viewerInfo: apiViewer });
          const iconName = shallow(<CRMCard viewer={viewer} />).find(Icon).at(0).props().name
          expect(iconName).toEqual('sticky note outline');
        });

        it('second Icon is given right props', () => {
          const mockProps = {
            name: 'close',
            size: 'large',
            className: 'card-icon',
            fitted: true,
          }
          const iconProps = headers.at(1).find(Icon).at(1).props();
          expect(typeof iconProps.onClick).toBe('function');
          expect(iconProps).toMatchObject(mockProps);
        });

        it('onClick first Icon uses hook', () => {
          const stickyIcon = headers.at(1).find(Icon).at(0).simulate('click');
          expect(dispatch).toHaveBeenCalled();
        });

        it('onClick second Icon uses hook', () => {
          const closeIcon = headers.at(1).find(Icon).at(1).simulate('click');
          expect(dispatch).toHaveBeenCalled();
        });
      })

  });

  describe('List', () => {
    let list;
    beforeAll(() => {
      spy = jest.spyOn(redux, 'useDispatch');
      dispatch = jest.fn();
      spy.mockImplementation(() => dispatch)
      jest.spyOn(apiCalls, "useGetViewer")
      .mockReturnValue({ loading: false, viewerInfo: apiViewer });
      const realUseState = React.useState;
      jest.spyOn(React, 'useState')
        .mockImplementation(() => realUseState(apiViewer.inputs))
          
      crmCard = shallow(<CRMCard viewer={viewer}/>);
      list = crmCard.find(List);
    })
    it('list contains correct props', () => {
      const props = {
        divided: true,
        relaxed: true,
      };
      expect(list.props()).toMatchObject(props);
    });

    it('has three list items in List', () => {
      
      expect(list.find(List.Item)).toHaveLength(3);
    });

    it('has three inputs in List', () => {
      expect(list.find(Input)).toHaveLength(3);
    });

    it('inputs are given correct props',() => {
      const mockProps = {
        transparent: true,
      }
      list.find(Input).forEach((input) => {
        expect(typeof input.props().onChange).toBe('function');
        expect(input.props()).toMatchObject(mockProps);
      });
    });
  });
})