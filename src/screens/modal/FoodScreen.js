import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default OutOfDateScreen = ({ route }) => {
    const food = route.params

    return (
        <View>
            <Text>This is {food.name} food! Out of date: {food.date}.</Text>
        </View>
    )
}