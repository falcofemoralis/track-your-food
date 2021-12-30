import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import { AppContext } from '../../../AppContext';
import { useNavigation } from '@react-navigation/native';
import Food from '../../objects/Food'

export default ScanFoodModal = () => {
    const { foodService } = useContext(AppContext);
    const navigation = useNavigation()
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.torch) // Тип вспышки камеры
    const [currentFood, setCurrentFood] = useState(null) // Текущая отсканированая еда
    const [isBarcodeLoading, setIsBarcodeLoading] = useState(false) // Бар загрузки
    const [notFoundFood, setNotFoundFood] = useState(true) // Состояние окна о не найденной еде

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

    /**
     * Открытие модального окна камеры
     */
    const openCamera = () => {
        setModalVisible(!modalVisible)
    }

    /**
     * Закрытие модального окна камеры
     */
    const closeCamera = () => {
        setCurrentFood(null)
        setIsBarcodeLoading(false)
        setNotFoundFood(false)
        setModalVisible(!modalVisible)
    }

    /**
     * Изменение состояние вспышки у камеры
     */
    const changeFlashType = () => {
        setFlashType(
            flashType === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
        );
    }

    /**
     * Обработчик сканирования штрих кода
     * @param {number} type - тип штрих-кода
     * @param {number} data - id штрих-кода 
     */
    const onBarCodeScanned = async ({ type, data }) => {
        if (type == 32 && !isBarcodeLoading) {
            setIsBarcodeLoading(true)

            // Получение объекта еды
            try {
                const food = await foodService.findFoodById(data)
                setCurrentFood(food)
                setNotFoundFood(false)
            } catch (error) {
                setNotFoundFood(true)
            }

            setIsBarcodeLoading(false)
        }
    }

    /**
     * Обработчик добавления еды
     */
    const onAddFoodHandler = async () => {
        foodService.addFood(currentFood)
        setCurrentFood(null)
    }

    /**
     * Открытие окна редактирования еды
     */
    const onEditFoodHandler = () => {
        navigation.navigate('EditFoodScreen', { food: currentFood })
        closeCamera()
    }

    return (<>
        <View style={styles.buttonView}>
            <Pressable style={styles.pressableView} onPress={openCamera} android_ripple={{ borderless: false }}>
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
                    onBarCodeScanned={onBarCodeScanned}>
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


            {!notFoundFood && currentFood &&
                <View style={styles.barcodeHintView}>
                    <View style={styles.barcodeHintModalView}>
                        <View style={styles.modalTop}>
                            <View style={styles.modalMain}>
                                <Text style={styles.modalHeader}>{currentFood.name}</Text>
                                <Text style={styles.modalText}>Uknown brand</Text>
                                <Text style={styles.modalText}>No info</Text>
                            </View>
                            <Image style={styles.modalImage} source={require('../../../assets/no_image.png')} />
                        </View>

                        <View style={styles.modalBottom}>
                            <Pressable style={styles.modalBtn} android_ripple={{ borderless: false }} onPress={onEditFoodHandler}>
                                <Text style={styles.actionBtn}>Edit</Text>
                            </Pressable>
                            <Pressable style={styles.modalBtn} android_ripple={{ borderless: false }} onPress={onAddFoodHandler}>
                                <Text style={styles.actionBtn}>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>}

            {notFoundFood &&
                <View style={styles.barcodeHintView}>
                    <View style={styles.barcodeHintModalView}>
                        <View style={styles.modalBottomNoProduct}>
                            <Text style={{ ...styles.modalText, ...styles.noProductText }}>No product</Text>
                            <Pressable style={styles.noProductBtn} android_ripple={{ borderless: false }} onPress={onEditFoodHandler}>
                                <Text style={styles.actionBtn}>Create new</Text>
                            </Pressable>
                        </View>
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
        backgroundColor: Colors.white,
        borderRadius: 20,
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
        color: Colors.black,
        fontWeight: 'bold'
    },
    modalText: {
        color: Colors.black,
    },
    modalImage: {
        height: 100,
        width: '45%'
    },
    modalTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    modalBottom: {
        height: 50,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    modalBtn: {
        width: '50%',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
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
    },
    actionBtn: {
        textAlign: 'center',
    },
    modalBottomNoProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    noProductBtn: {
        width: '20%',
        height: '100%',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    noProductText: {
        paddingStart: 15,
        paddingTop: 10,
        paddingBottom: 10,
        width: '80%'
    }
});