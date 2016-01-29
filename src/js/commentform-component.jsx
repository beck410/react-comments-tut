import React from 'react';

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
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim(),
            text = this.state.text.trim();

        if(!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text}, this.state.editing, this.state.id);
        this.setState({author: '', text: ''});
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

export default CommentForm
