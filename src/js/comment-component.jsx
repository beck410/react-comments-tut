import React from 'react';

var CommentNode = React.createClass({
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

export default CommentNode;
