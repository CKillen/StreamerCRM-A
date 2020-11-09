import { combineReducers } from 'redux';
import Cards from './Cards';

export default combineReducers({
  [Cards.constants.NAME]: Cards.reducer
})