import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default Navbar = props => {
    const [logoUrl, setLogoUrl] = useState("https://reactjs.org/logo-og.png")

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Test App</Text>
            <Image style={styles.avatar} source={{ uri: logoUrl }} />
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
        color: '#fff',
        fontSize: 20
    },
    avatar: {
        height: 35,
        width: 35
    }
})