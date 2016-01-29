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
            <form className="comment-form col-md-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htlmFor="authorField">Name:</label>
                    <input type="text" placeholder="your name" className="form-control" id="authorField" value={this.state.author} onChange={this.handleAuthorChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="textField">Comment:</label>
                    <input type="text" placeholder="say something..." id="textField" className="form-control" value={this.state.text} onChange={this.handleTextChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">{this.submitBtnValue()}</button>
                </div>
            </form>
        )
    }
})

export default CommentForm
