import React from 'react';
import Button from './button-component.jsx';

var CommentNode = React.createClass({
    render: function() {
        return (
          <div className="comment col-md-4 vertical-spacing">
            <h4 className="commentAuthor">{this.props.author}</h4>
            <p>{this.props.children}</p>
            <Button eventHandler={this.props.onDelete.bind(null, this.props.id)} classes="btn btn-danger btn-sm">Delete</Button>
            <Button eventHandler={this.props.onEdit.bind(null, this.props)} classes="btn btn-warning btn-sm">Edit</Button>
          </div>
        );
    }
});

export default CommentNode;
