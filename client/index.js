import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; 
import { ApolloProvider } from 'react-apollo'; 
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom'; 
import { InMemoryCache} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import SongList from './component/songList';
import CreateSong from './component/createSong'; 
import SongDetails from './component/songDetails'; 
import './style/style.css';  

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id 
});
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  cache,
  link, 
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <HashRouter>
          <Switch>
          <Route path="/" exact render={() => <SongList />} />
          <Route path="/songs/new" exact render={(routerProps) => <CreateSong {...routerProps}/>} />
          <Route path="/songs/:id" render={(routerProps) => <SongDetails {...routerProps}/>}/>
          </Switch>
          </HashRouter>
      </Switch>
      </ApolloProvider>
  ); 
};

ReactDOM.render(
  <BrowserRouter>
    <Root/>
  </BrowserRouter>,
  document.querySelector('#root')
);
