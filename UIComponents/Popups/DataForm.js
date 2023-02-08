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
                type: 'urgency', isValidated: false,
                type: 'fullName', isValidated: false,
                type: 'phone', isValidated: false,
                type: 'email', isValidated: false,
                type: 'service', isValidated: false,
                type: 'address', isValidated: false,
                type: 'source', isValidated: false
            }],
            isValidationComplete: false,
            urgency: '',
            fullName: '',
            phone: '',
            email: '',
            service: '',
            address: '',
            source: ''
        }
    }

    handleUserInput = (type, value) => this.setState({ [type]: value })
    // validate = (field, value) => {
    //     if (value == "")
    //         alert("please input field")
    // }
    handleSubmit = async () => {
        Keyboard.dismiss();
        console.log(
            "error Data===>", this.state.isValidationComplete, this.state.validationErrors
        )
        const { urgency, fullName, phone, email, service, address, source } = this.state;
        if (!this.state.isValidationComplete) {
            alert("Please fill the form correctly")
            return
        }
        let userData = {
            urgency,
            fullName,
            phone,
            email,
            service,
            address,
            source
        }
        console.log("data===>", userData)
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
        const { urgency, fullName, phone, email, service, address, source } = this.state;

        return (
            <View style={styles.container}>
                <View style={[styles.popupBody, { backgroundColor: Colors.getColor('primary') }]}>
                    <View style={[styles.header, { backgroundColor: Colors.getColor('popupTitleBG') }]}>
                        <Text style={styles.headingText}>User Data</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                        >
                            <View style={styles.body}>

                                <AppInput
                                    placeholder={'Urgency'}
                                    value={urgency}
                                    validationName='urgency'
                                    onValidationChange={this.onValidationChange}
                                    // validationType={[validationTypes.isDateValid]}
                                    validationType={[validationTypes.isUrgencyPopulated, validationTypes.isString]}
                                    containerStyle={styles.textInputStyle}
                                    onChangeText={(text) => { this.handleUserInput('urgency', text) }}

                                />
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
                                <AppInput
                                    placeholder={'Service Requested'}
                                    value={service}
                                    validationName='service'
                                    onValidationChange={this.onValidationChange}
                                    validationType={[validationTypes.isServicePopulated, validationTypes.isString]}
                                    containerStyle={styles.textInputStyle}
                                    onChangeText={(text) => { this.handleUserInput('service', text) }}

                                />
                                <AppInput
                                    placeholder={'Address'}
                                    value={address}
                                    validationName='address'
                                    onValidationChange={this.onValidationChange}
                                    // validationType={[validationTypes.isDateValid]}
                                    validationType={[validationTypes.isAddressPopulated, validationTypes.isString]}
                                    containerStyle={styles.textInputStyle}
                                    onChangeText={(text) => { this.handleUserInput('address', text) }}

                                />
                                <AppInput
                                    placeholder={'Source'}
                                    value={source}
                                    validationName='source'
                                    onValidationChange={this.onValidationChange}
                                    // validationType={[validationTypes.isDateValid]}
                                    validationType={[validationTypes.isSourcePopulated, validationTypes.isString]}
                                    containerStyle={styles.textInputStyle}
                                    onChangeText={(text) => { this.handleUserInput('source', text) }}

                                />


                                {/* <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Urgency'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    // onBlur={() => this.validate("urgency", urgency)}
                                    onChangeText={(text) => { this.handleUserInput('urgency', text) }}
                                >
                                </TextInput>

                            </View>
                            <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Name'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    // onBlur={() => this.validate("name", fullName)}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    onChangeText={(text) => { this.handleUserInput('email', text) }}
                                >
                                </TextInput>

                            </View>
                            <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Phone Number'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    // onBlur={() => this.validate("number", fullName)}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    onChangeText={(text) => { this.handleUserInput('phoneNumber', text) }}
                                >
                                </TextInput>

                            </View>

                            <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Service Requested'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    onChangeText={(text) => { this.handleUserInput('serviceRequested', text) }}
                                >
                                </TextInput>

                            </View>
                            <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Address'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    onChangeText={(text) => { this.handleUserInput('address', text) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textInputStyle, { color: Colors.getColor('leadTextColor') }]}>
                                <TextInput
                                    // ref= {(ref) => { this.FollowUpTexInput = ref; }} 
                                    placeholder='Source'
                                    placeholderTextColor={Colors.getColor('placeHolderText')}
                                    style={{ width: '100%', color: Colors.getColor('leadTextColor'), marginLeft: WScale(2) }}
                                    // numberOfLines={5}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    returnKeyType='done'
                                    onChangeText={(text) => { this.handleUserInput('source', text) }}
                                >
                                </TextInput>

                            </View> */}
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
                        </ScrollView>
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
        height: "100%",
        paddingVertical: WScale(20)
    },
    popupBody: {
        width: '95%',
        flexGrow: 1,
        // height: WScale(70),
        // height: '35%',
        borderRadius: WScale(10),
        backgroundColor: Colors.getColor('primary'),
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
        justifyContent: 'center'

    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    body: {
        flex: 0.93,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: "center"
    },
    textInputStyle: {
        borderColor: Colors.getColor('leadTextColor'),
        borderWidth: 0.5,
        width: '90%',
        borderRadius: WScale(10)
    }
})
