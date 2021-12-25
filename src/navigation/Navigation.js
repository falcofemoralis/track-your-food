import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "react-native-vector-icons"

import AllFoodScreen from '../screens/bottombar/AllFoodScreen';
import ScanFoodModal from '../screens/modal/ScanFoodModal';
import FoodScreen from '../screens/FoodScreen';
import SoonScreen from '../screens/bottombar/SoonScreen';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

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

const BottomTab = createBottomTabNavigator();

const Bottombar = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: styles.bottombar,
            }}
        >
            <BottomTab.Screen
                name="AllFoodScreen"
                component={AllFoodScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabButton title="Food" focus={focused} icon="food-fork-drink" />
                    ),
                }} />
            <BottomTab.Screen
                name="FridgesScreen"
                component={SoonScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabButton title="Fridges" focus={focused} icon="food-croissant" />
                    ),
                }} />

            <BottomTab.Screen
                name="AddScreenComponent"
                component={AddScreenComponent}
                options={{
                    tabBarButton: () => (<ScanFoodModal />)
                }} />

            <BottomTab.Screen
                name="OutOfDateScreen"
                component={SoonScreen}
                options={{
                    tabBarLabel: 'Date',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ focused }) => (
                        <BottomTabButton title="Date" focus={focused} icon="update" />
                    ),
                }} />

            <BottomTab.Screen
                name="ReceiptsScreen"
                component={SoonScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabButton title="Receipts" focus={focused} icon="receipt" />
                    ),
                }} />
        </BottomTab.Navigator>
    )
}

const BottomTabButton = props => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', top: 0 }}>
            <MaterialCommunityIcons name={props.icon} color={props.focus ? Colors.primaryColor : Colors.gray} size={25} />
            <Text style={{ color: props.focus ? Colors.primaryColor : Colors.gray }}>{props.title}</Text>
        </View>
    )
}

const AddScreenComponent = () => {
    return null
}

const styles = StyleSheet.create({
    bottombar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: Colors.white,
        borderRadius: 15,
        height: 90,
        ...Styles.shadow
    }
})