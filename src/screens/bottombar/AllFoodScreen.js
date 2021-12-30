import React, { useContext } from 'react';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { AppContext } from '../../../AppContext';
import FoodItem from '../../components/FoodItem';

export default AllFoodScreen = ({ navigation }) => {
    const { foodService } = useContext(AppContext);

    onPressHandler = item => {
        navigation.navigate('FoodScreen', { food: item })
    }

    return (
        <FlatList
            style={styles.list}
            data={foodService.foodList}
            renderItem={({ item }) => {
                return (
                    <Pressable onPress={() => onPressHandler(item)}>
                        <FoodItem food={item} />
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