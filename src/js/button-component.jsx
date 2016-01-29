import React from 'react';

var Button = React.createClass({
    btnClickHandler: function(e) {
        e.preventDefault();
        this.props.eventHandler();
    },

    render: function() {
        return (
            <button onClick={this.btnClickHandler} className={this.props.classes}>{this.props.children}</button>
        )
    }
})

export default Button
