import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from './src/components/Navbar';
import Navigation from './src/navigation/Navigation';
import { AppContext } from './AppContext';

export default function App() {
  const [foodList, setFoodList] = useState([
    { id: 1, name: "food 1" },
    { id: 2, name: "food 2" }
  ]);

  const state = { foodList, setFoodList };

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={state}>
        <Navbar />
        <Navigation />
        <StatusBar />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}