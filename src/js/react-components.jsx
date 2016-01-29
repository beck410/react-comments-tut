var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
    render: function() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">{this.props.author}</h2>
            {this.props.children}
            <div onClick={this.props.onDelete.bind(null, this.props.id)} className="delete">Delete</div>
            <div onClick={this.props.onEdit.bind(null, this.props)} className="edit">Edit</div>
          </div>
        );
    }
});

var CommentList = React.createClass({
    buildCommentNodes: function() {
        return this.props.data.map(comment => {
            if (comment.editing == false) {
                return (
                    <Comment onEdit={this.props.onEdit} onDelete={this.props.onDelete} id={comment.key} key={comment.key} author={comment.author} >
                        {comment.text}
                    </Comment>
                )
            } else {
                return (
                    <CommentForm onCommentSubmit={this.props.editSubmit} id={comment.key} author={comment.author} text={comment.text} editing={comment.editing}></CommentForm>
                )
            }
        });
    },

    render: function() {
        var commentNodes = this.buildCommentNodes();
        return (
            <div className="comment-list">
                {commentNodes}
            </div>
        )
    }
});

var CommentForm = React.createClass({

    submitBtnValue: function() {
        return this.state.editing ? "Edit" : "Post";
    },

    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },

    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },

    getInitialState: function() {
        return {
            id: this.props.id || null,
            author: this.props.author || '',
            text: this.props.text || '',
            editing: this.props.editing || false
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim(),
            text = this.state.text.trim();

        if(!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text}, this.state.editing, this.state.id);
        this.setState({author: '', text: ''})
    },

    render: function() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="your name" value={this.state.author} onChange={this.handleAuthorChange} />
                <input type="text" placeholder="say something..." value={this.state.text} onChange={this.handleTextChange} />
                <input type="submit" value={this.submitBtnValue()} />
            </form>
        )
    }
})

var CommentBox = React.createClass({

    editComment: function(data, id) {
        this.firebaseRef.child('comments/' + id).update({
            author: data.author,
            text: data.text
        }, data => {
            console.log('edited');
        })
    },

    handleEditComment: function(data) {

        var newState = this.state.data.map(comment => {
            if(comment.key == data.id) {
                comment['editing'] = true;
                comment['author'] = data.author;
                comment['text'] = data.children;
            }
            return comment;
        })
        this.setState({data: newState})
    },

    handleDeleteComment: function(id) {
        this.firebaseRef.child('comments/' + id).remove()
    },

    handleCommentSubmit: function(comment, isEditMode, id) {
        if(isEditMode) {
            this.editComment(comment, id);
            return;
        }
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
            newArray[index] = {};
            newArray[index]['key'] = key;
            newArray[index]['author'] = obj[key]['author'];
            newArray[index]['text'] = obj[key]['text'];
            newArray[index]['editing'] = false;
            index ++;
        }

        index = 0;
        return newArray;
    },

    loadComments: function() {
        this.firebaseRef = new Firebase("https://reacttut1234.firebaseio.com/");
        this.firebaseRef.child('comments').on("value", comments => {
            this.setState({data: this.objectAsArray(comments.val())});
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
                <CommentList editSubmit={this.handleCommentSubmit} onEdit={this.handleEditComment} onDelete={this.handleDeleteComment} data={this.state.data}/>
                <CommentForm editing={false} onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
});

ReactDOM.render(
  <CommentBox url="/src/comments.json" />,
  document.getElementById('react-comments')
);
