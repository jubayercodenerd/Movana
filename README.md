# Movana - Movie Streaming Platform

A React-based movie streaming app that uses TMDB API for movie data and includes user authentication features.

## Features

- Browse and search movies from TMDB database
- View movie details including ratings, release dates, and genres
- User authentication system
- Responsive design for mobile and desktop
- Movie watch history for logged-in users
- Custom movie player interface

## Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- TMDB API key (create one at https://www.themoviedb.org/settings/api)

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jubayercodenerd/Movana.git
   cd movana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start JSON Server (for user authentication)**
   ```bash
   json-server --watch db.json --port 3000
   ```
   Keep this running in a separate terminal window.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Open the URL shown in your terminal (typically http://localhost:5173)

## Project Structure

### Key Files Explained

#### `db.json`
This file serves as a mock database for user authentication and contains:
- User profiles
- Login credentials
- Watch history
- Profile picture paths

Structure:
#### `package.json`
Contains project configuration and dependencies:
- **Main Dependencies:**
    - React v19.1.0
    - React Router DOM v7.6.2
    - Tailwind CSS v4.1.8
- **Dev Dependencies:**
    - Vite v6.3.5
    - ESLint v9.25.0
    - JSON Server v1.0.0-beta.3

## Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Authentication

The project uses JSON Server for user authentication:
- User data is stored in `db.json`
- Login verification checks email and password
- New users can register
- Watch history is tracked per user

## Notes

- The JSON server is for development purposes only
- For production, replace with a proper backend server
- TMDB API is used for movie data
- Profile pictures should be placed in the `/public/profile-pictures/` directory
- **Video Player**: The project uses YouTube iframe embeds as a mock video player for demonstration purposes. In a production environment, this should be replaced with a proper video streaming solution.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request