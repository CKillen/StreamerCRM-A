import { NAME } from './constants';

export const getAll = state => state[NAME].sort((a, b) => (a.sticky > b.sticky) ? -1 : 1);