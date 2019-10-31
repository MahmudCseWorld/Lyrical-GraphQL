import React from 'react';
import gql from 'graphql-tag'; 
import { graphql } from 'react-apollo'; 
import { Link } from 'react-router-dom'
import query from '../queries/fetchSongs'; 

const songList = (props) => {
  const deleteHandler = (id) => {
    props.mutate({
        variables: {id}
     }).then(()=>props.data.refetch())
  }
  const renderSong = () => {
    return props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          <Link to={`/songs/${song.id}`} >
             {song.title}
          </Link>
          <i
            className="material-icons"
            onClick={()=>deleteHandler(song.id)}
          >delete</i>
          </li>
         )
       })
  }
  const loading = props.data.loading; 
  return (
    <div className="container">
       <ul className="collection">
        {loading?'loadding....': renderSong()}
      </ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large red right"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID!){
    deleteSong(id: $id){
      id
    }
  }
`

export default graphql(mutation)(graphql(query)(songList));
