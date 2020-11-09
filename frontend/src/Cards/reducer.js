import * as types from './actionTypes';

let lastId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case types.ADD_CARD:
      if(state.filter(cards => cards.name === action.payload.name).length <= 0) {
        return ([
          ...state,
          {
            id: ++lastId,
            name: action.payload.name,
            inputs: ['', '', ''],
            sticky: false,
          }
        ]);
      } else {
        return state;
      }
    case types.REMOVE_CARD:
      return state.filter(card => card.id !== action.payload.id);
    case types.TOGGLE_CARD_STICKY:
      return state.map((card, index) => {
        if(card.id !== action.payload.id) {
          return card;
        } 
        return {
          ...card,
          sticky: !card.sticky,
        }
      });
    default:
      return state;
  }
}