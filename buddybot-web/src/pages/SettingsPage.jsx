import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-buddy-light p-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                    <Link to="/" className="mr-3 p-2 rounded-full hover:bg-white/50 transition">
                        <ChevronLeft size={24} className="text-buddy-dark" />
                    </Link>
                    <h1 className="text-2xl font-bold text-buddy-dark">Settings</h1>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-600">Settings are coming soon.</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
