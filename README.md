# WeCare - Hospital Finder App

A React Native mobile application that helps users find nearby hospitals and medical facilities. Built with Expo and React Native, the app provides real-time location-based hospital search with an interactive map interface.

## Features

- 🏥 Real-time nearby hospital search
- 📍 Interactive Google Maps integration
- 🔍 Search functionality with autocomplete
- 📱 Modern and responsive UI
- 🔐 Google authentication
- 📍 Current location tracking
- 🗺️ Hospital details with directions
- 💫 Smooth animations and transitions

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (latest version)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hospital-finder.git
   cd hospital-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API keys:
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Get a Clerk publishable key from [Clerk Dashboard](https://dashboard.clerk.dev/)

4. Start the development server:
   ```bash
   npx expo start
   ```

## Building the App

### Development Build
```bash
eas build -p android --profile preview
```

### Production Build
```bash
eas build -p android --profile production
```

## Dependencies

### Core Dependencies
- expo: ~52.0.18
- react: 18.3.1
- react-native: 0.76.5
- expo-router: ^4.0.11

### UI and Components
- @expo/vector-icons: ^14.0.2
- react-native-maps: 1.18.0
- react-native-google-places-autocomplete: ^2.5.6

### Authentication and Storage
- @clerk/clerk-expo: ^2.6.5
- expo-secure-store: ~14.0.0
- expo-web-browser: ~14.0.1

### Navigation
- @react-navigation/bottom-tabs: ^7.2.0
- @react-navigation/native: ^7.0.14

### Location Services
- expo-location: ~18.0.4

### API and Data Handling
- axios: ^1.7.9

### Development Dependencies
- @babel/core: ^7.25.2
- typescript: ^5.3.3
- jest-expo: ~52.0.2

## Project Structure

```
hospital-finder/
├── app/
│   ├── (tabs)/
│   │   ├── index.jsx
│   │   └── UserProfile.jsx
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── SearchBar.jsx
│   │   └── PlaceListView.jsx
│   ├── Context/
│   │   ├── UserLocationContext.js
│   │   └── SelectMarkerContext.js
│   └── Utils/
│       └── GlobalAPI.js
├── assets/
│   └── images/
├── .env.example
└── app.json
```

## Environment Variables

Required environment variables:
```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Maps Platform for location services
- Clerk for authentication services
- Expo team for the amazing development framework

## Support

For support, email your.email@example.com or open an issue in the repository.
