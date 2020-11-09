import React from 'react';
import { useSelector }  from 'react-redux';
import CRMCard from './CRMCard';
import { getAll } from '../selectors';

export default function CardSection() {
  let cards = useSelector(state => getAll(state));
  return (
    <div className="card-section">
      {cards.map((card) => <CRMCard viewer={card} key={card.id} />)}
    </div>
  );
}
