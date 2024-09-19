// import React, { useState, useEffect, useRef } from 'react';
// import './Chat.css';
// import { io } from 'socket.io-client';

// const ChatBox = ({ onClose }) => {
//     const [messages, setMessages] = useState([]);
//     const [socket, setSocket] = useState(null);
//     const chatBoxRef = useRef(null);

//     const getSenderName = (type) => {
//         switch (type) {
//             case "041-0041": return "Machine41";
//             case "041-1041": return "Robot 3axis 41";
//             case "041-2001": return "Robot 6Axis 41";
//             default: return "Unknown Sender";
//         }
//     };

//     useEffect(() => {
//         const socketClient = io('http://192.168.1.33:5000');
//         socketClient.on('alarmData1', (data) => {
//             const newMessages = data.filter(item => {
//                 return !messages.some(msg => msg.text === item.msg && msg.sender === getSenderName(item.Type));
//             }).map(item => ({
//                 id: item._id,  // Assuming each item has a unique _id provided by your backend or API
//                 sender: getSenderName(item.Type),
//                 text: item.msg
//             }));

//             if (newMessages.length > 0) {
//                 setMessages(prevMessages => [...prevMessages, ...newMessages]);
//             }
//         });

//         setSocket(socketClient);
//         return () => socketClient.disconnect();
//     }, []);

//     useEffect(() => {
//         if (chatBoxRef.current) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [messages]);

//     return (
//         <div className="chat-box">
//             <div className="chat-header">
//                 <span>แชทจาก API Real-time</span>
//                 <button onClick={onClose}>X</button>
//             </div>
//             <div className="chat-messages" ref={chatBoxRef}>
//                 {messages.map((msg) => (
//                     <p key={`${msg.id}-${msg.sender}`}>{/* Use a composite key */}
//                         <strong>{msg.sender}:</strong> {msg.text}
//                     </p>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChatBox;
import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { io } from 'socket.io-client';



const ChatBox = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const chatBoxRef = useRef(null);

    const getSenderName = (type) => {
        switch (type) {
            case "041-0041": return "Machine41";
            case "041-1041": return "Robot 3axis 41";
            case "041-2001": return "Robot 6Axis 41";
            default: return "Unknown Sender";
        }
    };

    useEffect(() => {
        const socketClient = io('http://192.168.1.35:5000');   
        socketClient.on('alarmData1', (data) => {
            // Filter out messages already present based on their unique _id
            const newMessages = data.filter(item => 
                !messages.some(msg => msg.id === item._id)
            ).map(item => ({
                id: item._id, // Using _id as the key
                sender: getSenderName(item.Type),
                text: item.msg
            }));

            if (newMessages.length > 0) {
                setMessages(prevMessages => [...prevMessages, ...newMessages]);
            }
        });

        setSocket(socketClient);
        return () => socketClient.disconnect();
    }, [messages]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-box">
            <div className="chat-header">
                <span>แชทจาก MC41</span>
                <button onClick={onClose}>X</button>
            </div>
            <div className="chat-messages" ref={chatBoxRef}>
                {messages.map((msg) => (
                    <p key={msg.id}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;

// {
//     "MC_id": "41",
//     "Type": "041-0041",
//     "msg": "เครื่องจักรไม่ทำงาน เนื่องจากปิดโมลไม่สนิทเลย",
//     "ID": 1
//   }