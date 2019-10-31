import React from 'react';
import gql from 'graphql-tag'; 
import { graphql } from 'react-apollo'; 
import useInputState from '../Hooks/useInputState';

const createLyric = (props) => {
  const [value, handleChange, reset] = useInputState(""); 
  console.log(props.songId); 

  const submitHandler = (e) => {
    e.preventDefault();
    props.mutate({
      variables: {
        content: value, 
        songId: props.songId
      }
    }).then(()=>reset())
  }
  return (
    <div>
      <form onSubmit={(e)=> submitHandler(e)}>
        <label htmlFor="lyric">Add a lyric</label>
        <input type="text" name="lyric" value={value} onChange={handleChange} required/>
      </form>
    </div>
  );
}

const mutation = gql`
   mutation AddLyricToSong($content: String, $songId: ID){
     addLyricToSong(content: $content, songId: $songId){
       id, 
       lyrics{
         id
         content
         likes
       }
     }
   }
`

export default graphql(mutation)(createLyric);
