import React, { useState } from 'react';
import { Send, Paperclip, Copy } from 'lucide-react';

const Composer = ({ onSend, disabled }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-buddy-dark p-3 md:p-4 pb-6 md:pb-6 shadow-lg border-t border-white/10">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
                <button type="button" className="text-gray-400 hover:text-white transition p-2">
                    <Paperclip size={20} />
                </button>

                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                        disabled={disabled}
                        className="w-full bg-white rounded-full py-3 pl-4 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-buddy-teal"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <Copy size={18} />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!text.trim() || disabled}
                    className="bg-buddy-teal text-white p-3 rounded-full hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Composer;
