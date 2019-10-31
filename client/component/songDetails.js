import React from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom'
import fetchsong from '../queries/fetchsong';
import CreateLyric from './createLyric'; 
import LyricList from './lyricList'; 



const SongDetails = (props) => {
  const { loading } = props.data; 
  
  
  if (loading) return <h1>loading...</h1>; 
  console.log(props.data.song.lyrics);
  return (
    <div className="container">
      <Link to="/">back</Link>
      <h1>{props.data.song.title}</h1>
      <LyricList lyrics={props.data.song.lyrics}/>
      <CreateLyric songId={props.match.params.id}/>
    </div>
  );
}

export default graphql(fetchsong, {
  options: (props)=>{return {variables: {id: props.match.params.id}}} 
})(SongDetails);
