import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './commentform-component.jsx';
import CommentList from './commentlist-component.jsx';

var CommentBox = React.createClass({

    editComment: function(data, id) {
        this.firebaseRef.child('comments/' + id).update({
            author: data.author,
            text: data.text
        }, data => {
            console.log('edited');
        });
    },

    handleEditComment: function(data) {

        var newState = this.state.data.map(comment => {
            if(comment.key == data.id) {
                comment.editing = true;
                comment.author = data.author;
                comment.text = data.children;
            }
            return comment;
        });
        this.setState({data: newState});
    },

    handleDeleteComment: function(id) {
        this.firebaseRef.child('comments/' + id).remove();
    },

    handleCommentSubmit: function(comment, isEditMode, id) {
        if(isEditMode) {
            this.editComment(comment, id);
            return;
        }
        this.postComment(comment);
    },

    handleEditCancel: function(id) {
        var newStateData = this.state.data.map(comment => {
            comment.editing = false;
            return comment;
        });

        this.setState({ data: newStateData });
    },

    postComment: function(comment) {
        this.firebaseRef.child('comments').push({
            author: comment.author,
            text: comment.text
        }, (data) => {
            console.log('pushed');
        });
    },

    objectAsArray: function(obj) {
        var index = 0;
        var newArray = [];
        for(let key in obj) {
            newArray[index] = {};
            newArray[index].key = key;
            newArray[index].author = obj[key].author;
            newArray[index].text = obj[key].text;
            newArray[index].editing = false;
            index ++;
        }
        index = 0;
        return newArray;
    },

    loadComments: function() {
        this.firebaseRef = new Firebase("https://reacttut1234.firebaseio.com/");
        this.firebaseRef.child('comments').on("value", comments => {
            this.setState({data: this.objectAsArray(comments.val())});
        });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadComments();
    },

    render: function() {
        return (
            <div className="comment-box container">
                <h1>Comments</h1>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Add A New Comment</h3>
                        <CommentForm cancelEditComment={this.handleEditCancel} editing={false} onCommentSubmit={this.handleCommentSubmit}/>
                    </div>

                    <div className="col-md-8">
                        <h3>All Comments</h3>
                        <CommentList cancelEditComment={this.handleEditCancel} editSubmit={this.handleCommentSubmit} onEdit={this.handleEditComment} onDelete={this.handleDeleteComment} data={this.state.data}/>
                    </div>
                </div>
            </div>
        )
    }
});

export default CommentBox
