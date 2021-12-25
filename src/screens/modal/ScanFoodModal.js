import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default ScanFoodModal = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (<>
        <View style={styles.buttonView}>
            <Pressable style={styles.pressableView} onPress={() => setModalVisible(!modalVisible)} android_ripple={{ borderless: false }}>
                <View>
                    <Image source={require('../../../assets/plus.png')} resizeMode='contain' style={{ width: 30, height: 30, tintColor: Colors.white }} />
                </View>
            </Pressable>
        </View>
        <Modal
            visible={modalVisible}
            animationType={'slide'}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={{ flex: 1 }}>
                <Camera
                    onBarCodeScanned={res => {
                        console.log(res);
                        //  navigation.navigate('your_next_screen', { result });
                    }}
                    aspect="stretch"
                    style={{ width: width, height: height }}>
                </Camera>
            </View>
        </Modal>
    </>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        height: 70,
        width: 70,
        borderRadius: 35,
        top: -30,
        overflow: 'hidden',
        backgroundColor: Colors.primaryColor,
        ...Styles.shadow
    },
    pressableView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});