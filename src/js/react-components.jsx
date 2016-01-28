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
        var commentNodes = this.props.data.map(comment => {
                return (
                    <Comment auther={comment.author} key={comment.id}>
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
    loadComments: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({data: data})
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadComments();
    },

    render: function() {
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        )
    }
});

ReactDOM.render(
  <CommentBox url="/src/comments.json" />,
  document.getElementById('react-comments')
);
