import React from 'react';
import { Form } from 'semantic-ui-react';
import config from '../../Config/config'

function Access({ error }) {
  const errorText = error ? "There was an error processing the twitch request" : "";
  return (
    <div className='login'>
      <h1>Login</h1>
      <p className="form-error">{errorText}</p>
      <Form size="big" action={`${config.userUrl}signup`} method="post">
        <Form.Button type="submit" className="twitch-button">Click to Signin with Twitch!</Form.Button>
      </Form>
      <p className="form-warn">This currently request the email and username from twitch</p>
    </div>
  )
  
}

export default Access;