import React, { useEffect, useState } from 'react';
import Cards from './Cards'
import Chat from './Chat'
import Header from './Header'
import Cookies from 'universal-cookie';
import useApi from './Hooks/useAPI';
import Loader from './Misc/Loader'
import Access from './Access';
import config from './Config/config'

const cookies = new Cookies();

function App()  {
  //TODO check to see if jwt is in cookie or header. If its not we know to ping server
  //TODO Send cookie in every request
  //TODO Break this up into components
  let query = window.location.search;
  let error = false;
  if(query) {
    let params = new URLSearchParams(query)
    if(params.get('error')) {
      error = true;
    } else {
      cookies.set('apikey', params.get('apikey'));
      window.location = window.location.href.split("?")[0];
    }
  }
  let { complete, data } = useApi(`${config.apiUrl}/validate`);
  if(complete === false) {
    return (
      <div className="CRM-not-loaded">
        <Header.components.HeaderSection />
        <Loader />
      </div>
    )
  }
  if(data.validated) {
    return (
        <div className="CRM">
          <Header.components.HeaderSection />
          <Cards.components.CardSection />
          <Chat.components.ChatSection id={data.id} username={data.username} />
        </div>
    )
  } else {
    return (
      <div className="CRM-not-loaded">
        <Header.components.HeaderSection />
        <Access.components.Access error={error} />
      </div>
    )
  }
}
 
export default App;
