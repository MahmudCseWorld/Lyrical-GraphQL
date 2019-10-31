import React from 'react';
import useInputState from '../Hooks/useInputState'; 
import gql from 'graphql-tag'; 
import { graphql } from 'react-apollo'; 
import { Link } from 'react-router-dom'; 
import query from '../queries/fetchSongs'

const CreateSong = (props) => {
  const [value, handleChange, reset] = useInputState("");
  const submitHandler = (e) => {
    e.preventDefault(); 
    props.mutate({
      variables: {
        title: value,
        refetchQueries: [{query: query}]
      }
    }).then(() => props.history.push('/')); 
    reset(); 
  }
  return (
    <div className="container">
      <Link to="/">Back</Link>
      <h3>Create A new Song</h3>
      <form onSubmit={(e)=>submitHandler(e)}>
        <label htmlFor="title">Song Title: </label>
        <input type="text" name="title" value={value} onChange={handleChange} placeholder="Write song title" autoFocus required/>
      </form>
    </div>
  );
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      id
      title
    }
  }
`; 

export default graphql(mutation)(CreateSong);
