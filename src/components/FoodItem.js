import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

export default FoodItem = props => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{props.name}</Text>
            {props.image && <Image source={{ uri: props.image }} style={styles.image} />}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        position: 'relative'
    },
    text: {
        position: 'absolute',
        left: 10,
        bottom: 5,
        color: '#fff',
        fontSize: 22,
        zIndex: 5
    },
    image: {
        height: Dimensions.get('window').width / 2.5 - 10,
        width: Dimensions.get('window').width / 2 - 10,
        borderRadius: Dimensions.get('window').width / 20
    }
})