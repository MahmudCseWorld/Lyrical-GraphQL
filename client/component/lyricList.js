import React from 'react';
import { graphql } from 'react-apollo'; 
import gql from 'graphql-tag'; 

const lyricList = (props) => {
  const thumbsUPHandler = (id)=>{
    props.mutate({
      variables: {
           id: id
         } 
       })
  }
  const renderLyrics = () => {
    return props.lyrics.map(({ content, id, likes }) => {
      return(
        <li key={id} className='collection-item'>
          {content}
          <div className="voteBox">
              <i
                className="material-icons"
                onClick={()=>thumbsUPHandler(id)}
              >thumb_up</i>
                {likes}
           </div>
        </li>
       
        )
     })
  }

  return (
    <div className="collection">
        {renderLyrics()}
    </div>
  );
}

const mutation = gql`
    mutation LikeLyric($id: ID!){
      likeLyric(id: $id){
        id 
        likes
      }
    }
`

export default graphql(mutation)(lyricList);
