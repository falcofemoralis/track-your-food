import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons"
import { FontAwesome } from '@expo/vector-icons';
import LinkingConfiguration from "./LinkingConfiguration"

import AllFoodScreen from '../screens/AllFoodScreen';
import FridgesScreen from '../screens/FridgesScreen';
import NewFoodScreen from '../screens/NewFoodScreen';
import OutOfDateScreen from '../screens/OutOfDateScreen';
import ReceiptsScreen from '../screens/ReceiptsScreen';
import FoodScreen from '../screens/modal/FoodScreen';

const Stack = createNativeStackNavigator();

export default Navgiation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="Root"
                    component={Bottombar}
                    options={{ headerShown: false }} />
                <Stack.Group >
                    <Stack.Screen
                        name="FoodScreen"
                        component={FoodScreen}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const BottomTab = createMaterialBottomTabNavigator();

const Bottombar = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="AllFoodScreen"
            shifting={false}
        >
            <BottomTab.Screen
                name="AllFoodScreen"
                component={AllFoodScreen}
                options={{
                    tabBarLabel: 'All',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food-fork-drink" color={color} size={26} />
                    ),
                }} />
            <BottomTab.Screen
                name="FridgesScreen"
                component={FridgesScreen}
                options={{
                    tabBarLabel: 'Fridges',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='food-croissant' color={color} size={26} />
                    ),
                }} />

            <BottomTab.Screen
                name="NewFoodScreen"
                component={NewFoodScreen}
                options={{
                    tabBarLabel: 'Add',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='add-circle' color={color} size={26} />
                    ),
                }} />

            <BottomTab.Screen
                name="OutOfDateScreen"
                component={OutOfDateScreen}
                options={{
                    tabBarLabel: 'Date',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='update' color={color} size={26} />
                    ),
                }} />

            <BottomTab.Screen
                name="ReceiptsScreen"
                component={ReceiptsScreen}
                options={{
                    tabBarLabel: 'Receipts',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='receipt' color={color} size={26} />
                    ),
                }} />
        </BottomTab.Navigator>
    )
}