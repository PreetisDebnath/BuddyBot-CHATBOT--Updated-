# BuddyBot Frontend

A responsive React + Tailwind CSS frontend for BuddyBot, an AI Mental Health Assistant.

## Features

- **Chat Interface**: Mobile-first design with sticky header and bottom composer.
- **Mock API**: Simulates backend responses for demonstration.
- **Feature Cards**: Interactive cards for Mood Tracker, Community, Resources, etc.
- **Routing**: React Router setup for navigation.
- **Responsive**: Works on mobile and desktop.

## Setup

1. Navigate to the project directory:
   ```bash
   cd buddybot-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the URL shown (usually `http://localhost:5173`).

## Project Structure

- `src/components`: Reusable UI components (ChatHeader, MessageBubble, etc.)
- `src/pages`: Page views (ChatPage, ResourcesPage, etc.)
- `src/api`: API client and mock logic.
- `src/index.css`: Tailwind CSS setup.
