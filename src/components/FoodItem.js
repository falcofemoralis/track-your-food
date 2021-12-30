import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import Colors from "../constants/Colors";
import Dimens from '../constants/Dimens'
import { LinearGradient } from 'expo-linear-gradient';

export default FoodItem = props => {
    return (
        <View style={styles.card}>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.25)']} style={styles.background} />
            <Text style={styles.text}>{props.name}</Text>
            <Image source={props.image ? { uri: props.image } : require('../../assets/no_image.png')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        margin: 5
    },
    text: {
        position: 'absolute',
        left: 10,
        bottom: 5,
        color: Colors.white,
        fontSize: Dimens.normalTextSize,
        zIndex: 5
    },
    image: {
        height: Dimensions.get('window').width / 2.5 - 10,
        width: Dimensions.get('window').width / 2 - 10,
        borderRadius: Dimensions.get('window').width / 20
    },
    background: {
        borderRadius: Dimensions.get('window').width / 20,
        position: 'absolute',
        zIndex: 4,
        width: '100%',
        height: '100%'
    }
})