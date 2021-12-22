import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default FridgesScreen = props => {
    return (
        <View>
            <Text>FridgesScreen</Text>
            <Button title="Home" onPress={() => props.navigation.navigate('Friends')} />
        </View>
    )
}