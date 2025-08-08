'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatBox({ chatRoomId, userRole }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [chatInfo, setChatInfo] = useState(null);
    const messagesEndRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (chatRoomId) {
            fetchMessages();
            // Set up polling for new messages
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [chatRoomId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/chat/messages/${chatRoomId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setMessages(data.messages);
                setChatInfo(data.chat_room);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/chat/send-message/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_room_id: chatRoomId,
                    message_text: newMessage,
                    message_type: 'text'
                })
            });

            const data = await response.json();
            if (data.success) {
                setNewMessage('');
                fetchMessages(); // Refresh messages
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow">
            {/* Chat Header */}
            <div className="bg-gray-50 px-6 py-4 border-b rounded-t-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {chatInfo?.course_title}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {userRole === 'student' ? chatInfo?.mentor_name : chatInfo?.student_name}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm text-gray-600">
                            {isConnected ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.is_sender ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.is_sender
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                            <div className="flex items-end space-x-2">
                                <div className="flex-1">
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                <span className={`text-xs ${message.is_sender ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                            {!message.is_sender && (
                                <p className="text-xs text-gray-500 mt-1">{message.sender_name}</p>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex space-x-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
} 