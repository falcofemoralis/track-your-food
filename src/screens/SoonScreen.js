import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default SoonScreen = props => {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>Coming soon!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})