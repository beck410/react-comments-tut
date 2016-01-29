import React from 'react';
import CommentNode from './comment-component.jsx';
import CommentForm from './commentform-component.jsx';
import Button from './button-component.jsx';

var CommentList = React.createClass({
    buildCommentNodes: function() {
        return this.props.data.map(comment => {
            if (comment.editing === false) {
                return (
                    <CommentNode onEdit={this.props.onEdit} onDelete={this.props.onDelete} id={comment.key} key={comment.key} author={comment.author} >
                        {comment.text}
                    </CommentNode>
                )
            } else {
                var cancelBtnClasses = "btn btn-warning",
                    btnText = "Cancel";
                return (
                    <div>
                        <CommentForm onCommentSubmit={this.props.editSubmit} id={comment.key} author={comment.author} text={comment.text} editing={comment.editing}></CommentForm>
                        <Button btnType="cancel" classes={cancelBtnClasses} id={comment.key} eventHandler={this.props.cancelEditComment}>Cancel</Button>
                    </div>
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

export default CommentList
