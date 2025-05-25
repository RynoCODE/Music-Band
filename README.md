# NextJS Music Player MVP

A modern, responsive music streaming application built with Next.js and React.



## 🎵 Features

- **Music Playback**: Play, pause, skip tracks, and adjust volume
- **Playlist Management**: Create, edit, and manage your personal playlists
- **Search Functionality**: Find songs by title, artist, or album
- **User Authentication**: Secure login and signup functionality
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Persistent Storage**: Playlists are saved in local storage

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url/nextjs-music-player-mvp.git
   cd nextjs-music-player-mvp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📋 Project Structure

```
├── components/        # Reusable UI components
│   ├── AuthForm.js    # Login and signup form
│   ├── PlayerBar.js   # Music player controls
│   ├── Playlist.js    # Playlist management
│   ├── Search.js      # Search functionality
│   ├── Sidebar.js     # Navigation sidebar
│   └── SongCard.js    # Song display component
├── data/
│   └── music.js       # Sample music data
├── pages/             # Application pages
│   ├── _app.js        # App component with global state
│   ├── index.js       # Home page
│   ├── login.js       # Login page
│   ├── playlists.js   # Playlists management page
│   ├── search.js      # Search page
│   └── signup.js      # Signup page
└── styles/            # CSS styles
    └── globals.css    # Global styles
```

## 🎨 Technology Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: Local Storage (for demo purposes)

## 🔮 Future Enhancements

- Backend integration with a real music database
- User profile customization
- Social features (share playlists, follow users)
- Audio visualizations
- Mobile app versions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sample music provided for demonstration purposes only
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from popular music streaming services
