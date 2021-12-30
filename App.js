import React, { useState, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from './src/components/Navbar';
import Navigation from './src/navigation/Navigation';
import Colors from './src/constants/Colors';
import FoodService from './src/services/FoodService';
import { AppContext } from './AppContext';

export default function App() {
  const foodService = new FoodService()

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ foodService }}>
        <Navbar />
        <Navigation />
        <StatusBar translucent={false} style='light' backgroundColor={Colors.bgStatusBar} />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}