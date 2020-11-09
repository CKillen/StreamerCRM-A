import Cards from '../../Cards';
import * as types from '../../Cards/actionTypes';
import { 
  ADD_CARD,
  REMOVE_CARD,
  TOGGLE_CARD_STICKY,
} from '../../Cards/actionTypes'


describe('Redux Test', () => {
  beforeEach(() => {
    jest.resetModules();
  })
  const viewer = {
    name: "Jeslie",
    inputs: [
      "Example 1",
      "Example 2",
      "Example 3",
    ],
    sticky: false,
  }
  //Should be pulled to in general card test

  describe('ActionTypes test', () => {
    it('should have ADD_CARD', () => {
      expect(typeof ADD_CARD).toBe('string');
    });

    it('should have REMOVE_CARD', () => {
      expect(typeof REMOVE_CARD).toBe('string');
    });
    
    it('should have STICKY_CARD', () => {
      expect(typeof TOGGLE_CARD_STICKY).toBe('string');
    });
  });

  describe('Actions test', () => {
    it('Should have add action function', () => {
      const name = "Jim";
      const expectedAction = {
        type: types.ADD_CARD,
        payload: {
          name
        }
      }

      expect(Cards.actions.add(name)).toEqual(expectedAction);
    });


    it('Should have remove action function', () => {
      const expectedAction = {
        type: types.REMOVE_CARD,
        payload: {
          id: 2
        }
      }
      expect(Cards.actions.remove(2)).toEqual(expectedAction);
    })

    it('Should have stickyToggle action function', () => {
      const expectedAction = {
        type: types.TOGGLE_CARD_STICKY,
        payload: {
          id: 2
        }
      }
      expect(Cards.actions.toggleSticky(2)).toEqual(expectedAction);
    })
  });

  describe('Reducer test', () => {
    it('should return the initial state', () => {
      expect(Cards.reducer(undefined, {})).toEqual([]);
    });

    it('state correctly updated after add action', () => {
      const Cards = require('../../Cards').default
      const name = "Jim";
      let expectedObject = {
        name,
        inputs: ['', '', ''],
        sticky: false,
      }
      expect(Cards.reducer([], Cards.actions.add(name))).toEqual([{
        id: 1,
        ...expectedObject
      }])
    });

    it('state should not add duplicate name', () => {
      const Cards = require('../../Cards').default;
      const name = "Jim";
      let expectedObject = {
        name,
        inputs: ['', '', ''],
        sticky: false,
      }
      let action = Cards.actions.add(name);
      let cardObject = Cards.reducer(Cards.reducer([], action), action);
      expect(cardObject).toEqual([{
        id: 1,
        ...expectedObject
      }])
    });

    it('state correctly updated after remove action',  () => {
      let state = [ 
        { ...viewer, id: 1, }, 
        { ...viewer, id: 2, }, 
        { ...viewer, id: 3, },
      ];

      let expectedState = [ 
        { ...viewer, id: 1, }, 
        { ...viewer, id: 3, },
      ]
      expect(Cards.reducer(state, Cards.actions.remove(2))).toEqual(expectedState)
    });

    it('state correctly updated after stickyToggle action', () => {
      let state = [ 
        { ...viewer, id: 1, }, 
        { ...viewer, id: 2, }, 
        { ...viewer, id: 3, },
      ];
      let stickyViewer = {
        ...viewer,
        sticky: true,
      }
      let expectedState = [ 
        { ...viewer, id: 1, }, 
        { ...stickyViewer, id: 2, }, 
        { ...viewer, id: 3, },
      ]
      expect(Cards.reducer(state, Cards.actions.toggleSticky(2))).toEqual(expectedState);
    });
  });

  describe('Selector Test', () => {
    it('should display all cards (sticky first) with getAll selector', () => {
      let state = {
        [Cards.constants.NAME]: [
          { ...viewer, id: 1 },
          { ...viewer, id: 2 },
          { ...viewer,sticky: true, id: 3 },
          { ...viewer, id: 4 },
        ]
      };

      let expectedOutcome = [
        { ...viewer, sticky: true, id: 3},
        { ...viewer, id: 1 },
        { ...viewer, id: 2 },
        { ...viewer, id: 4 },
      ]
      expect(Cards.selectors.getAll(state)).toEqual(expectedOutcome);
    });
  });
});