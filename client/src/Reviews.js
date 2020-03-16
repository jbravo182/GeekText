import React, { useState } from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";

import StarRatingComponent from './components/StarRatingComponent';
import CommentListComponent from './components/CommentListComponent';
import CommentFormComponent from './components/CommentFormComponent';

function App() {

  const[comments, setComments] = useState([]);
  const[loading, setLoading] = useState(false);

  function addComment(comment) {
    setLoading(false);
    setComments([comment, ...comments]);
  }

  return (
    <div style={{'marginLeft':'20px'}}>
    <img src="https://cdn.pixabay.com/photo/2015/11/04/20/59/milky-way-1023340_1280.jpg" 
    alt="Book Cover" width="150px" height="200px" style={{'borderRadius':'15px', 'marginTop': '20px'}} />
    <h1>Review [Book Title]</h1> 
    <h2>Rating</h2>
    <StarRatingComponent/>
            <CommentFormComponent addComment={addComment} />
            <CommentListComponent loading={loading} comments={comments}/>
      </div>
  );
}

export default App;
