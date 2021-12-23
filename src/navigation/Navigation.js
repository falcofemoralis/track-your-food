import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons"
import { FontAwesome } from '@expo/vector-icons';
import LinkingConfiguration from "./LinkingConfiguration"

import AllFoodScreen from '../screens/AllFoodScreen';
import FridgesScreen from '../screens/FridgesScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import OutOfDateScreen from '../screens/OutOfDateScreen';
import ReceiptsScreen from '../screens/ReceiptsScreen';
import FoodScreen from '../screens/modal/FoodScreen';
import SoonScreen from '../screens/SoonScreen';
import Colors from '../constants/Colors';

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
                name="AddFoodScreen"
                component={AddFoodScreen}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../../assets/plus.png")} resizeMode='contain' style={{ width: 30, height: 30, tintColor: Colors.white }} />
                    ),
                    tabBarButton: props => (
                        <BottomTabCentralButton {...props} />
                    )
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

const BottomTabCentralButton = ({ children, onPress, focused }) => {
    return (
        <Pressable style={styles.centralBtnCont} onPress={onPress}>
            <View style={styles.centralBtn} >
                {children}
            </View>
        </Pressable>
    )
}

const shadow = {
    // shadow
    shadowColor: '#7F5DF0',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5

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
        ...shadow
    },
    centralBtnCont: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    centralBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.primaryColor,
        ...shadow
    }
})