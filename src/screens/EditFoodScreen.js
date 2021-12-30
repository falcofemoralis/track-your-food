import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image, Dimensions, Pressable } from 'react-native';
import { AppContext } from '../../AppContext';
import * as ImagePicker from 'expo-image-picker';
import Dimens from '../constants/Dimens';
import Colors from '../constants/Colors';

export default EditFoodScreen = ({ food }) => {
    const { setFoodList } = useContext(AppContext);

    const pressHandler = () => {
        if (food.name.trim() && food.date.trim() && food.image) {
            setFoodList(prev => [
                ...prev,
                {
                    id: Date.now(),
                    ...food
                }
            ])
        } else {
            Alert.alert("Failed to add!", "Fill all inputs and take photo of your food!")
        }
    }

    const photoHandler = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            food.image = result.uri;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Pressable onPress={photoHandler} style={styles.image} >
                    {
                        food.image ? <Image source={{ uri: food.image }} style={styles.image} /> : <Image source={require('../../assets/no_image.png')} style={styles.image} />
                    }
                </Pressable>
                <View>
                    <Text style={styles.headText}>Food name:</Text>
                    <TextInput style={styles.text} placeholder='Enter food name' onChangeText={setName} value={food.name} />
                    <Text style={styles.headText}>Out of date:</Text>
                    <TextInput style={styles.text} placeholder='Enter out of date' onChangeText={setDate} value={food.date} />
                </View>
            </View>

            <View style={styles.buttonCont}>
                <Pressable style={styles.button} onPress={pressHandler}>
                    <Text style={styles.buttonText}>Add food!</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    main: {
        flexDirection: 'row',
        marginBottom: 15
    },
    image: {
        marginRight: 15,
        height: Dimensions.get('window').width / 2 - 10,
        width: Dimensions.get('window').width / 2 - 10
    },
    text: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        color: Colors.black,
        fontSize: Dimens.normalTextSize
    },
    headText: {
        fontWeight: 'bold',
        fontSize: Dimens.headTextSize
    },
    buttonCont: {
        width: '100%',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.black,
        width: 180
    },
    buttonText: {
        fontSize: Dimens.normalTextSize,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.white,
    },
})