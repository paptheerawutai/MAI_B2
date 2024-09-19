import React from 'react';
import './Chat.css';

const ChatHead = ({ onClick }) => {
    return (
        <div className="chat-head" onClick={onClick}>
            <span role="img" aria-label="chat icon">💬</span>
        </div>
    );
};

export default ChatHead;
