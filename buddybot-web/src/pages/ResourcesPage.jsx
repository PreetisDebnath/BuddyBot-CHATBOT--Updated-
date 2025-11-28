import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ResourcesPage = () => {
    return (
        <div className="min-h-screen bg-buddy-light p-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                    <Link to="/" className="mr-3 p-2 rounded-full hover:bg-white/50 transition">
                        <ChevronLeft size={24} className="text-buddy-dark" />
                    </Link>
                    <h1 className="text-2xl font-bold text-buddy-dark">Resources</h1>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Mental Health Resources</h2>
                    <ul className="space-y-3">
                        <li className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <h3 className="font-medium text-buddy-teal">Emergency Contacts</h3>
                            <p className="text-sm text-gray-600">Immediate help lines and contacts.</p>
                        </li>
                        <li className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <h3 className="font-medium text-buddy-teal">Self-Care Guide</h3>
                            <p className="text-sm text-gray-600">Tips for maintaining mental wellness.</p>
                        </li>
                        <li className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <h3 className="font-medium text-buddy-teal">Student Support</h3>
                            <p className="text-sm text-gray-600">Campus resources and counseling services.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
