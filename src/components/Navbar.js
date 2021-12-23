import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default Navbar = props => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Food App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3949ab',
        paddingBottom: 10
    },
    text: {
        top: 16,
        color: '#fff',
        fontSize: 20
    },
    avatar: {
        height: 35,
        width: 35
    }
})