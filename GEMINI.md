# Gemini Project Context: stackoverflow-appwrite

This project is a full-stack Stack Overflow clone built with **Next.js 14** and **Appwrite**. It features a robust Q&A system, reputation mechanics, and a modern UI.

## Project Overview

-   **Purpose**: A community-driven Q&A platform inspired by Stack Overflow.
-   **Architecture**: Next.js (App Router) for the frontend and API routes, with Appwrite serving as the Backend-as-a-Service (BaaS) for Auth, Database, and Storage.
-   **Main Technologies**:
    -   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Magic UI, Radix UI.
    -   **Backend**: Appwrite (Node.js & Client SDKs).
    -   **State Management**: Zustand (with Persist and Immer).
    -   **Rich Text Editor**: `@uiw/react-md-editor`.

## Key Directory Structure

-   `src/app/`: Next.js App Router routes.
    -   `(auth)/`: Login and registration pages.
    -   `questions/`: Question listing, viewing, asking, and editing.
    -   `users/`: User profiles and activity tracking.
-   `src/models/`: Appwrite schema definitions and setup scripts.
    -   `server/`: Server-side Appwrite configuration and collection/storage initialization.
    -   `client/`: Client-side Appwrite configuration.
-   `src/components/`: Reusable UI components (Magic UI, Radix, and custom).
-   `src/store/`: Zustand stores for Auth and application state.
-   `src/utils/`: Utility functions like slugify and relative time formatting.

## Building and Running

### Prerequisites
- Node.js (v16.14.0+)
- An Appwrite Instance (Cloud or Self-hosted)

### Environment Variables
Create a `.env` file based on `.env.sample`:
```env
NEXT_PUBLIC_APPWRITE_HOST_URL=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_server_side_api_key
```

### Commands
-   **Install Dependencies**: `npm install`
-   **Development Mode**: `npm run dev`
-   **Build for Production**: `npm run build`
-   **Start Production Server**: `npm run start`
-   **Linting**: `npm run lint`

## Development Conventions

-   **Database Initialization**: The project automatically initializes its Appwrite collections and storage buckets via Next.js **Middleware** (`src/middleware.ts`). On the first request, it checks for the existence of the database and creates it if missing.
-   **Authentication**: Managed via Zustand (`src/store/Auth.ts`) and Appwrite's Account API. JWTs are used for secure server-side interactions.
-   **UI/UX**: Uses a dark-mode first design. Magic UI components are heavily used for interactive elements (e.g., `ShimmerButton`, `FloatingNav`).
-   **Data Fetching**: Primarily uses Server Components for fetching listings (e.g., `src/app/questions/page.tsx`) to optimize performance and SEO.
-   **Reputation System**: Users earn reputation through votes on their questions and answers, tracked in Appwrite user preferences (`prefs.reputation`).

## Notable Features
-   **Search**: Full-text search on questions using Appwrite queries.
-   **Markdown**: All questions and answers support Markdown formatting.
-   **Voting**: Real-time voting logic that updates user reputation.
-   **File Attachments**: Support for image attachments in questions using Appwrite Storage.
