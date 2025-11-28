import React from 'react';
import { ChevronLeft, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatHeader = () => {
    return (
        <div className="sticky top-0 z-10 bg-buddy-dark text-white p-4 flex items-center shadow-md">
            <Link to="/" className="mr-3 hover:bg-white/10 p-1 rounded-full transition">
                <ChevronLeft size={24} />
            </Link>
            <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-buddy-dark">
                    <Bot size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-buddy-dark"></div>
            </div>
            <div className="ml-3">
                <h1 className="font-semibold text-lg leading-tight">BuddyBot</h1>
                <p className="text-xs text-gray-300">AI Mental Health Assistant</p>
            </div>
        </div>
    );
};

export default ChatHeader;
