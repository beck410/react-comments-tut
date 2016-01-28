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
                    <Comment author={comment.author} key={comment.id}>
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
    getInitialState: function() {
        return ({author: '', text: ''})
    },

    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },

    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim(),
            text = this.state.text.trim();

        if(!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''})
    },

    render: function() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="your name" value={this.state.author} onChange={this.handleAuthorChange} />
                <input type="text" placeholder="say something..." value={this.state.text} onChange={this.handleTextChange} />
                <input type="submit" value="Post" />
            </form>
        )
    }
})

var CommentBox = React.createClass({

    handleCommentSubmit: function(comment) {
        this.postComment(comment);
    },

    postComment: function(comment) {
        this.firebaseRef.child('comments').push({
            author: comment.author,
            text: comment.text
        }, (data) => {
            console.log('pushed')
        })
    },

    objectAsArray: function(obj) {
        var index = 0
        var newArray = [];

        for(let key in obj) {
            newArray[index] = {}
            newArray[index]['key'] = key
            newArray[index]['author'] = obj[key]['author']
            newArray[index]['text'] = obj[key]['text']
            index ++
        }

        index = 0;
        return newArray;
    },

    loadComments: function() {
        this.firebaseRef = new Firebase("https://reacttut1234.firebaseio.com/");
        this.firebaseRef.child('comments').on("value", comments => {
            this.setState({data: this.objectAsArray(comments.val())})
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
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
});

ReactDOM.render(
  <CommentBox url="/src/comments.json" />,
  document.getElementById('react-comments')
);
