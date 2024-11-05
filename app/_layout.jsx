// src/app/_layout.js
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './store';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }}/>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
