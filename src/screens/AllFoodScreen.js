import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { AppContext } from '../../AppContext';
import FoodItem from '../components/FoodItem';

export default AllFoodScreen = props => {
    const { foodList } = useContext(AppContext);

    return (
        <FlatList
            style={styles.list}
            data={foodList}
            renderItem={({ item }) => {
                return (
                    <Pressable onPress={() => props.navigation.navigate('FoodScreen', item)}>
                        <FoodItem name={item.name} image={item.image} />
                    </Pressable>
                )
            }}
            keyExtractor={item => item.id}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 15
    }
})