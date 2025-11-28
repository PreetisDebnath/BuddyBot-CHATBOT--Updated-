import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Users, BookOpen, Phone, FileText } from 'lucide-react';

const icons = {
    mood_tracker: Smile,
    community: Users,
    resources: BookOpen,
    counsellor: Phone,
    journal: FileText,
};

const labels = {
    mood_tracker: "Mood Tracker",
    community: "Community",
    resources: "Resources",
    counsellor: "Counsellor",
    journal: "Journal",
};

const FeatureCard = ({ type }) => {
    const Icon = icons[type] || BookOpen;
    const label = labels[type] || "Feature";

    return (
        <Link to={`/${type}`} className="block">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-buddy-light flex items-center justify-center text-buddy-teal">
                    <Icon size={20} />
                </div>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
        </Link>
    );
};

export default FeatureCard;
