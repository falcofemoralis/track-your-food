import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { AppContext } from '../../AppContext';

export default NewFoodScreen = props => {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const { setFoodList } = useContext(AppContext);

    const pressHandler = () => {
        if (name.trim() && date.trim()) {
            setFoodList(prev => [
                ...prev,
                {
                    id: Date.now(),
                    name
                }
            ])

            setName("")
        }
    }

    return (
        <View>
            <Text>NewFoodScreen</Text>
            <TextInput placeholder='Enter food name' onChangeText={setName} value={name} />
            <TextInput placeholder='Enter food name' onChangeText={setDate} value={date} />
            <Button title='Add food!' onPress={pressHandler} />
        </View>
    )
}