import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default ScanFoodModal = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.torch)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const changeFlashType = () => {
        setFlashType(
            flashType === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
        );
    }

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
                    <Image source={require('@/images/plus.png')} resizeMode='contain' style={{ width: 30, height: 30, tintColor: Colors.white }} />
                </View>
            </Pressable>
        </View>
        <Modal
            visible={modalVisible}
            animationType={'slide'}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.cameraContainer}>
                <Camera
                    ratio='16:9'
                    style={styles.camera}
                    flashMode={flashType}
                    onBarCodeScanned={res => {
                        console.log(res);
                        //  navigation.navigate('your_next_screen', { result });
                    }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={changeFlashType}>
                            <Image
                                style={styles.flashButton}
                                tintColor={Colors.white}
                                source={flashType === Camera.Constants.FlashMode.off ? require('@/images/flash_off.png') : require('@/images/flash_on.png')} />
                        </TouchableOpacity>
                    </View>
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
    },
    cameraContainer: {
        flex: 1
    },
    camera: {
        flex: 1,

    },
    buttonContainer: {
        flex: 1,
        margin: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    flashButton: {
        width: 35,
        height: 35
    }
});