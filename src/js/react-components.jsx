var React = require('react');
var ReactDOM = require('react-dom');

var data = [
    {id:1, author: 'Beck', text: 'this is beck\'s comment'},
    {id:2, author: 'Penny', text: 'this is Penny\'s comment'},
    {id:3, author: 'Dave', text: 'this is dave\'s comment'},
];

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
        var commentNodes = this.props.data.map(comment => {
                return (
                    <Comment auther={comment.author} key={comment.key}>
                        {comment.text}
                    </Comment>
                )
        })
        return (
            <div className="comment-list">
                {commentNodes}
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
                <CommentList data={this.props.data}/>
                <CommentForm />
            </div>
        )
    }
});

ReactDOM.render(
  <CommentBox data={data}/>,
  document.getElementById('react-comments')
);
