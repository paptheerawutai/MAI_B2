import React, { useState } from 'react';
import ChatHead from './ChatHead';
import ChatBox from './ChatBox';
import './Chat.css';

const AU_chat = () => {
    const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);

    return (
        <div>
            {isChatBoxVisible ? (
                <ChatBox onClose={() => setIsChatBoxVisible(false)} />
            ) : (
                <ChatHead onClick={() => setIsChatBoxVisible(true)} />
            )}
        </div>
    );
};

export default AU_chat;