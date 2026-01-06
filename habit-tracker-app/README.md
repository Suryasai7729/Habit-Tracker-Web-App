# Ultimate Habit Tracker

A comprehensive React-based habit tracking application that helps users build and maintain positive habits through gamification, analytics, and social features.

## Features

- **Habit Management**: Create, edit, delete, and track daily habits
- **Progress Analytics**: Visualize habit completion trends with interactive charts
- **Achievements System**: Unlock badges and rewards for consistency
- **Social Features**: Connect with friends and view leaderboards
- **Dark Mode**: Toggle between light and dark themes
- **Data Persistence**: All data saved locally in browser storage
- **Responsive Design**: Works on desktop and mobile devices

## Demo Accounts

- **Username**: demo / **Password**: demo123
- **Username**: test / **Password**: test123

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Font Awesome
- **Styling**: CSS with CSS Variables for theming
- **State Management**: React useState and useEffect hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.

### `npm run eject`

**Note: this is a one-way operation!** Ejects from Create React App.

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Authentication component
│   ├── Header.js         # App header with user info
│   ├── Navigation.js     # Main navigation
│   ├── Dashboard.js      # Main dashboard with stats
│   ├── Habits.js         # Habit management
│   ├── Analytics.js      # Charts and analytics
│   ├── Social.js         # Friends and leaderboard
│   ├── Achievements.js   # Badges and achievements
│   ├── Settings.js       # App settings and data management
│   └── Notification.js   # Toast notifications
├── App.js                # Main app component with routing
├── App.css               # Global styles
└── index.js              # App entry point
```

## Key Components

### App.js
Main application component managing global state, routing, and user authentication.

### Dashboard
Overview of daily progress, recent activities, and quick actions.

### Habits
Complete habit management including creation, editing, deletion, and daily tracking.

### Analytics
Interactive charts showing completion trends, category distribution, and streaks.

### Social
Friend management and leaderboard functionality.

### Achievements
Gamification system with unlockable badges based on user progress.

## Data Storage

All user data is stored locally in the browser using `localStorage`. This includes:
- User profiles
- Habit definitions and completion data
- Activity logs
- Settings and preferences

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Feel free to use and modify as needed.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
