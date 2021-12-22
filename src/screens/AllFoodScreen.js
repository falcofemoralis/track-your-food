import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { AppContext } from '../../AppContext';

export default AllFoodScreen = props => {
    const { foodList } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Text>All your food is here!</Text>
            <FlatList
                data={foodList}
                renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        backgroundColor: '#f9c2ff'
    }
})