import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import Modal from "react-native-modal";
import { WScale } from '../../Components/Modules/Multi-Resolution/MultiResolution'
import Colors from './Colors/Colors';
import { AppInput } from '../TextInput';
import validator from 'validator';
import { validationTypes } from '../../Components/Common/ValidationTypes';


class DataForm extends Component {

    requestCompleted = false
    constructor(props) {
        super(props)
        this.state = {
            validationErrors: [{
                type: 'fullName', isValidated: false,
                type: 'phone', isValidated: false,
                type: 'email', isValidated: false,

            }],
            isValidationComplete: false,
            fullName: '',
            phone: '',
            email: '',

        }
    }

    handleUserInput = (type, value) => this.setState({ [type]: value })

    handleSubmit = async () => {
        Keyboard.dismiss();
        const { fullName, phone, email } = this.state;
        if (!this.state.isValidationComplete) {
            alert("Please fill the form correctly")
            return
        }
        // this.setState({ isLoading: true });
        let userData = {
            fullName,
            phone,
            email,

        }
        console.log("data", userData)
        this.props.closeModal()

    }
    onValidationChange = (type, isValidated) => {
        const { validationErrors } = this.state
        const newValidationErrors = [...validationErrors];
        const existingIndex = validationErrors.findIndex(i => i.type === type);
        newValidationErrors[existingIndex] = { type, isValidated }

        const isValidationComplete = !newValidationErrors.find(i => !i.isValidated)
        this.setState({ validationErrors: newValidationErrors, isValidationComplete })
    }

    RenderContent = () => {
        const { fullName, phone, email } = this.state;

        return (
            <View style={styles.container}>
                <View style={[styles.popupBody, { backgroundColor: Colors.getColor('primary') }]}>
                    <View style={[styles.header, { backgroundColor: Colors.getColor('popupTitleBG') }]}>
                        <Text style={styles.headingText}>User Data</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.body}>
                            <AppInput
                                placeholder={'Name'}
                                value={fullName}
                                validationName='fullName'
                                onValidationChange={this.onValidationChange}
                                // validationType={[validationTypes.isDateValid]}
                                validationType={[validationTypes.isFullNamePopulated, validationTypes.isString]}
                                containerStyle={styles.textInputStyle}
                                onChangeText={(text) => { this.handleUserInput('fullName', text) }}

                            />
                            <AppInput
                                placeholder={'Phone Number'}
                                value={phone}
                                validationName='phone'
                                onValidationChange={this.onValidationChange}
                                validationType={[validationTypes.isMobileNumberPopulated, validationTypes.isNumber]}
                                containerStyle={styles.textInputStyle}
                                onChangeText={(text) => { this.handleUserInput('phone', text) }}

                            />
                            <AppInput
                                placeholder={'Email Address'}
                                value={email}
                                validationName='email'
                                onValidationChange={this.onValidationChange}
                                validationType={[validationTypes.isEmailPopulated, validationTypes.isEmailFormated]}
                                containerStyle={styles.textInputStyle}
                                onChangeText={(text) => { this.handleUserInput('email', text) }}

                            />

                        </View>
                        <View style={styles.bottomButtonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.closeModal()
                                }}
                            >
                                <View style={[styles.cancelButton, { backgroundColor: Colors.getColor('buttonColorLight') }]}>
                                    <Text style={{ fontSize: WScale(18), color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.handleSubmit()

                                }}
                            >
                                <View style={[styles.saveButton, { backgroundColor: Colors.getColor('buttonColor') }]}>
                                    <Text style={{ fontSize: WScale(18), color: '#fff', fontWeight: 'bold' }}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={this.props.visible}
                    animationIn='fadeIn'
                    presentationStyle="overFullScreen"
                >
                    {this.RenderContent()}

                </Modal>
            </View>
        )
    }
}
export default DataForm
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "55%",
        // paddingVertical: WScale(20)
    },
    popupBody: {
        width: '95%',
        flexGrow: 1,
        // height: WScale(70),
        // height: '35%',
        borderRadius: WScale(10),
        backgroundColor: "green",
        // backgroundColor: Colors.getColor('primary'),
        shadowOffset: { width: 3.5, height: 3.5 },
        shadowOpacity: 0.5,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        borderTopLeftRadius: WScale(10),
        borderTopRightRadius: WScale(10),
        backgroundColor: Colors.getColor('topBarColor'),
    },
    headingText: {
        fontSize: WScale(24),
        fontWeight: 'bold',
        color: '#fff'
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    body: {
        flex: 0.60,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    saveButton: {
        width: WScale(110),
        height: WScale(40),
        borderRadius: 6,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: WScale(5)
        },
        shadowOpacity: 0.5,
        backgroundColor: 'rgba(74,144,226,1)',
        alignItems: 'center',
        justifyContent: "center"
    },

    cancelButton: {
        width: WScale(110),
        height: WScale(40),
        borderRadius: 6,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: WScale(5)
        },
        shadowOpacity: 0.5,
        backgroundColor: 'rgb(147,149,152)',
        alignItems: 'center',
        justifyContent: "center"
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: WScale(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: "center"
    },
    textInputStyle: {
        // backgroundColor: "green",
        // marginVertical: WScale(15),
        borderColor: Colors.getColor('leadTextColor'),
        borderWidth: 0.5,
        width: '90%',
        // height: WScale(100),
        borderRadius: WScale(10)
    }
})
