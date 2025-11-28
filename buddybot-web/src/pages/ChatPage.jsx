import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import Composer from '../components/Composer';
import FeatureCard from '../components/FeatureCard';
import { sendMessage } from '../api/client';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello Student! How are you?", isUser: false, timestamp: "09:25 AM" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text) => {
        const newMessage = {
            id: Date.now(),
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(true);

        try {
            const response = await sendMessage(text);

            const botMessage = {
                id: Date.now() + 1,
                text: response.text,
                isUser: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                recommended_feature: response.recommended_feature
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-buddy-light">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 pb-24">
                <div className="max-w-3xl mx-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2">
                            <MessageBubble
                                text={msg.text}
                                isUser={msg.isUser}
                                timestamp={msg.timestamp}
                            />
                            {msg.recommended_feature && (
                                <div className="mb-4 ml-10 max-w-[75%] md:max-w-[60%]">
                                    <FeatureCard type={msg.recommended_feature} />
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="text-gray-400 text-sm ml-10 mb-4 animate-pulse">BuddyBot is typing...</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <Composer onSend={handleSend} disabled={isTyping} />
        </div>
    );
};

export default ChatPage;
