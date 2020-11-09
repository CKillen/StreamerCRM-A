import React, { useEffect, useState } from 'react';
import { 
  Card,
  Icon,
  List,
  Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleSticky, remove } from './../actions'
import useTextSaveDelay from '../../Hooks/useTextSaveDelay';
import { useGetViewer } from '../../Hooks/useAPICalls';
import LoadCard from './LoadCard';

const propTypes = {
  viewer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sticky: PropTypes.bool.isRequired,
  }).isRequired,
}



export default function CRMCard ({ viewer = {} }) {
      const { name, sticky, id } = viewer;
      const [inputs, setInputs] = useState([]);
      const { loading, viewerInfo } = useGetViewer(name);
      useEffect(() => {
        setInputs(viewerInfo.inputs)
      }, [viewerInfo])
      const dispatch = useDispatch();
      const handleChange = (value, index) => {
        let newState = [...inputs];
        newState[index] = value;
        setInputs(newState);
      }
      useTextSaveDelay({ name, inputs }, 500);
      if(loading) {
        return <LoadCard />
      }
      return (
        <Card>
          <Card.Content className="card-header">
            <Card.Header>{name}</Card.Header>
            <Card.Header className="card-icon-group">
              <Icon
                name={sticky ? 'sticky note' : 'sticky note outline'}
                size="small"
                className="card-icon"
                fitted
                onClick={() => dispatch(toggleSticky(id))}
              />
              <Icon
                name="close"
                size="large"
                className="card-icon"
                fitted
                onClick={() => dispatch(remove(id))}
              />  
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <List divided relaxed>
              {inputs.map((input, index) => (
                <List.Item key={index}>
                  <Input
                    transparent
                    onChange={e => handleChange(e.target.value, index)}
                    value={input}
                    placeholder={`Note ${index + 1}`}
                  />
                </List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>
      )
};

CRMCard.propTypes = propTypes;
