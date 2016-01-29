import React from 'react';

var CommentNode = React.createClass({
    render: function() {
        return (
          <div className="comment col-md-4 vertical-spacing">
            <h4 className="commentAuthor">{this.props.author}</h4>
            <p>{this.props.children}</p>
            <button onClick={this.props.onDelete.bind(null, this.props.id)} className="btn btn-danger btn-sm">Delete</button>
            <button onClick={this.props.onEdit.bind(null, this.props)} className="btn btn-warning btn-sm">Edit</button>
          </div>
        );
    }
});

export default CommentNode;
