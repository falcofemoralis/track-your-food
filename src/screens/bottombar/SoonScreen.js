import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dimens from '../../constants/Dimens';

export default SoonScreen = () => {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>Coming soon!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: Dimens.normalTextSize
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})