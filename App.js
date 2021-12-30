import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from './src/components/Navbar';
import Navigation from './src/navigation/Navigation';
import { AppContext } from './AppContext';
import Colors from './src/constants/Colors';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [foodList, setFoodList] = useState();
  const state = { foodList, setFoodList };

  const loadFood = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "foodList.txt";
      const list = await FileSystem.readAsStringAsync(fileUri)
      setFoodList(JSON.parse(list))
    } catch (e) {
      // ignore
    }
  }

  loadFood()

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