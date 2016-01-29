import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './js/commentbox-component.jsx';
import './css/style.css';

ReactDOM.render(
  <CommentBox url="/src/comments.json"/>,
  document.getElementById('react-comments')
);
