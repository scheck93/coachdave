# WednesdayWaffle

A React Native/Expo mobile application for video recording and sharing.

## Project Structure

```
WednesdayWaffle/
├── src/
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # Screen components
│   ├── services/       # Services (camera, media, firebase)
│   └── types/          # TypeScript type definitions
├── assets/            # Static assets
└── App.tsx           # Root component
```

## Features

- React Native with Expo
- TypeScript support
- Firebase integration
- Camera functionality
- Media library access
- Navigation system

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS or Android:
```bash
npm run ios
# or
npm run android
```

## Dependencies

- expo
- react-navigation
- firebase
- expo-camera
- expo-av
- expo-media-library
- nativewind (for styling)

## Development

The project uses a modular architecture with separate services for:
- Camera operations
- Media library access
- Firebase integration

Navigation is handled through React Navigation with a stack navigator setup.
