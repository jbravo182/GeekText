import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
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
    <h1>Review [Book Title]</h1> 
    <h2>Rating</h2>
    <CommentFormComponent title="American Psycho" name = "nickname" addComment={addComment} />
      </div>
  );
}

export default App;
