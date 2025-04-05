# Tennis Score Tracker App Summary

This is a Next.js application designed for tracking and managing tennis match scores. The app provides both public-facing features for viewing matches and an admin interface for managing them.

## Core Functionality

1. **Match Tracking System**
   - Tracks tennis matches with detailed scoring for sets, games, and points
   - Supports different match formats (best-of-3, supertiebreak, short-deuce)
   - Real-time score updates with proper tennis scoring rules (0, 15, 30, 40, A)
   - Handles tiebreaks and supertiebreaks

2. **Match Management**
   - Create individual matches with player names, tournament, and format
   - Bulk creation of multiple matches for tournaments
   - Update match scores and status (upcoming, in-progress, completed)
   - Delete matches

3. **User Interface**
   - Public view for spectators to see match scores
   - Admin dashboard for match management
   - Search functionality to filter matches by player names
   - Responsive design for mobile and desktop

## Technical Architecture

1. **Frontend**
   - Built with Next.js (React framework)
   - Uses React hooks for state management
   - UI components from a custom component library (shadcn/ui)
   - Client-side data fetching with custom hooks

2. **Backend**
   - Next.js API routes for server-side functionality
   - MongoDB database for data storage
   - Mongoose for data modeling and database operations

3. **Data Model**
   - Match schema with players, tournament, format, and scoring data
   - Detailed score tracking for sets, games, tiebreaks, and points
   - Status tracking (upcoming, in-progress, completed)

4. **Key Features**
   - Tennis-specific scoring logic with proper rules implementation
   - Undo functionality for correcting scoring mistakes
   - Match filtering and sorting (prioritizes in-progress matches)
   - Responsive cards for displaying match information

This application provides a comprehensive solution for tennis tournament organizers and players to track match scores with proper tennis scoring rules, making it useful for clubs, tournaments, or personal match tracking.
