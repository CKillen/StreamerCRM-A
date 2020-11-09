import React from 'react';
import { Card } from "semantic-ui-react"

function LoadCard() {
  return (
    <Card>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </Card>
 )
}

export default LoadCard;