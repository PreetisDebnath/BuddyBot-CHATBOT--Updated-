import React from 'react';
import clsx from 'clsx';
import { Bot } from 'lucide-react';

const MessageBubble = ({ text, isUser, timestamp }) => {
    return (
        <div className={clsx("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
            {!isUser && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-buddy-dark mr-2 mt-1 flex-shrink-0">
                    <Bot size={16} />
                </div>
            )}
            <div className={clsx(
                "max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm",
                isUser ? "bg-buddy-teal text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"
            )}>
                <p className="text-sm md:text-base whitespace-pre-wrap">{text}</p>
                {timestamp && (
                    <p className={clsx("text-[10px] mt-1 text-right opacity-70", isUser ? "text-white" : "text-gray-500")}>
                        {timestamp}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
