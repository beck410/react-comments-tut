var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
    render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
    }
});

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="comment-list">
                <Comment author="Beck">This is one comment</Comment>
                <Comment author="Dave">This is another comment</Comment>
            </div>
        )
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div>
                This is a comment form
            </div>
        )
    }
})

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        )
    }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('react-comments')
);
