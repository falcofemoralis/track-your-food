import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default ReceiptsScreen = props => {
    return (
        <View>
            <Text>ReceiptsScreen</Text>
            <Button title="Home" onPress={() => props.navigation.navigate('Friends')} />
        </View>
    )
}