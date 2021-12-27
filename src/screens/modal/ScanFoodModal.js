import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import { BarcodeStatus } from '../../constants/BarcodeStatus';
import { FindFoodById } from '../../services/FoodService'

export default ScanFoodModal = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.torch)
    const [barcodeFood, setBarcodeFood] = useState(null)
    const [isBarcodeLoading, setIsBarcodeLoading] = useState(false)

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

    const changeFlashType = () => {
        setFlashType(
            flashType === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
        );
    }

    const getFood = async (id) => {
        try {
            const food = await FindFoodById(id)
            console.log(food);
            setBarcodeFood(food)
        } catch (error) {
            console.error(error)
        }

        setIsBarcodeLoading(false)
    }

    const closeCamera = () => {
        setBarcodeFood(null)
        setIsBarcodeLoading(false)
        setModalVisible(!modalVisible)
    }

    return (<>
        <View style={styles.buttonView}>
            <Pressable style={styles.pressableView} onPress={() => setModalVisible(!modalVisible)} android_ripple={{ borderless: false }}>
                <View>
                    <Image source={require('../../images/plus.png')} resizeMode='contain' style={{ width: 30, height: 30, tintColor: Colors.white }} />
                </View>
            </Pressable>
        </View>
        <Modal
            visible={modalVisible}
            animationType={'slide'}
            onRequestClose={closeCamera}>
            <View style={styles.cameraContainer}>
                <Camera
                    ratio='16:9'
                    style={styles.camera}
                    flashMode={flashType}
                    onBarCodeScanned={res => {
                        if (res.type == 32 && !isBarcodeLoading) {
                            setIsBarcodeLoading(true)
                            getFood(res.data)
                        }
                    }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={changeFlashType}>
                            <Image
                                style={styles.flashButton}
                                tintColor={Colors.white}
                                source={flashType === Camera.Constants.FlashMode.off ? require('../../images/flash_off.png') : require('../../images/flash_on.png')} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>

            {isBarcodeLoading &&
                <View style={styles.modalProgressBar}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>}

            {barcodeFood &&
                <View style={styles.barcodeHintView}>
                    <View style={styles.barcodeHintModalView}>
                        {barcodeFood.type == BarcodeStatus.Exist && <>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.modalMain}>
                                    <Text style={styles.modalHeader}>{barcodeFood.name}</Text>
                                    <Text style={styles.modalText}>Uknown brand</Text>
                                    <Text style={styles.modalText}>No info</Text>
                                </View>
                                <Image style={styles.modalImage} source={require('../../../assets/no_image.jpg')} />
                            </View>
                            <View style={styles.modalBottom}>
                                <Button style={styles.modalBtn} title='Edit' />
                                <Button style={styles.modalBtn} title='Add' />
                            </View>
                        </>}
                        {barcodeFood.type == BarcodeStatus.NotFound &&
                            <View style={styles.modalBottomNoProduct}>
                                <Text>No product</Text>
                                <Button title='Add' />
                            </View>}
                    </View>
                </View>}
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
    },

    barcodeHintView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    barcodeHintModalView: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalMain: {
        width: '55%'
    },
    modalHeader: {
        color: 'red',
        fontWeight: 'bold'
    },
    modalText: {
        color: 'red',
    },
    modalImage: {
        height: 100,
        width: '45%'
    },
    modalBottom: {
        height: 40,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4'
    },
    modalBtn: {
        width: '50%',
        backgroundColor: 'transparent'
    },
    modalBottomNoProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    modalProgressBar: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }
});