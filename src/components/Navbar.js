import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import Dimens from '../constants/Dimens'

export default Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Food App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    text: {
        color: Colors.white,
        fontSize: Dimens.normalTextSize,
        fontWeight: 'bold'
    }
})