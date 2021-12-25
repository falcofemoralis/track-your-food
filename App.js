import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from './src/components/Navbar';
import Navigation from './src/navigation/Navigation';
import { AppContext } from './AppContext';
import Colors from './src/constants/Colors';

export default function App() {
  const [foodList, setFoodList] = useState([
    {
      id: 1,
      name: "Food 1",
      date: "31.12.2021",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
    }
  ]);

  const state = { foodList, setFoodList };

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={state}>
        <Navbar />
        <Navigation />
        <StatusBar translucent={false} style='light' backgroundColor={Colors.bgStatusBar} />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}