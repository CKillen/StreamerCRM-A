import React from 'react';
import { useSelector }  from 'react-redux';
import CRMCard from './CRMCard';
import { getAll } from '../selectors';

export default function CardSection() {
  let cards = useSelector(state => getAll(state));
  let noCards = cards.length === 0 ? <h2 className="card-noMessage">Click on a chat to open a user memo!</h2> : "";
  return (
    <div className="card-section">
      {noCards}
      {cards.map((card) => <CRMCard viewer={card} key={card.id} />)}
    </div>
  );
}
