import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default OutOfDateScreen = props => {
    return (
        <View>
            <Text>OutOfDateScreen</Text>
            <Button title="Home" onPress={() => props.navigation.navigate('Friends')} />
        </View>
    )
}