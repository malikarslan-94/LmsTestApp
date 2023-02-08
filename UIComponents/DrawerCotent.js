import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { WScale } from '../Components/Modules/Multi-Resolution/MultiResolution'
import DataForm from './Popups/DataForm';
import LeadPopup from './Popups/LeadPopup';

// import store from '../Store/store';
// import NotificationService from '../Components/Notification/NotificationService';
// import { GoogleSignin } from 'react-native-google-signin'
// import NavigationService from '../Components/Navigation/NavigationService';
// import CustomPopup, { PopupType } from '../UIComponents/Popups/CustomPopup';
// import AntIcons from 'react-native-vector-icons/AntDesign';
import Colors from './Popups/Colors/Colors';
// import { Switch } from 'react-native-switch';
// import { connect } from 'react-redux'
// import { GetAppData,UpdateAppData } from '../Store/Actions/Setting/setting';
class DrawerContent extends Component {
    requestCompleted = false
    constructor(props) {
        super(props)
        this.state = {
            showPopup: false,
            autoFollowupEnabled: false,
            showModal: false
        }
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: Colors.getColor('primary') }]}>

                <View style={[styles.headerContainer, { backgroundColor: "#454F63" }]}>

                    <View style={styles.headerContent}>
                        <View style={{ width: WScale(60), height: WScale(60), justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginBottom: 5 }}>

                            {/* <Image
                                resizeMode='contain'
                                style={{ width: 39.13, height: 13.13 }}
                                source={require('../assets/newIcons/user/user.png')}
                            /> */}

                        </View>
                        <Text style={[styles.headerText, { color: '#fff' }]}>Name</Text>
                        <Text style={[styles.designationText, { color: '#97A2BA' }]}>Project Manager</Text>
                    </View>
                </View>
                <View style={styles.screenContainer}>

                    <TouchableOpacity style={[styles.screenStyle, { marginTop: 40 }]} onPress={() => this.navigateToScreen('CannedSmsScreen')}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26 }}
                            source={require('../assets/newIcons/autoFollowup/autoFollowup.png')}
                        />
                        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.itemText, { color: Colors.getColor("leadTextColor") }]}>Auto Follow-Up</Text>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenStyle}
                    //  onPress = {()=>this.navigateToScreen('LeadsAutoAssigningRulesScreen')}
                    >
                        <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26 }}
                            source={require('../assets/newIcons/autoAssign/autoAssign.png')}
                        />
                        <Text style={[styles.itemText, { color: Colors.getColor("leadTextColor") }]}>Lead Assignment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.screenStyle}
                    //  onPress = {()=>this.navigateToScreen('SettingScreen')}
                    >
                        <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26 }}
                            source={require('../assets/newIcons/setting/setting.png')}
                        />
                        <Text style={[styles.itemText, { color: Colors.getColor("leadTextColor") }]}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.screenStyle}
                        onPress={() => this.setState({ showModal: true })}

                    >
                        <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26 }}
                            source={require('../assets/newIcons/autoFollowup/autoFollowup.png')}
                        />
                        <Text style={[styles.itemText, { color: Colors.getColor("leadTextColor") }]}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ position: 'absolute', alignItems: 'center', flexDirection: 'row', bottom: 39, left: 32 }]}>
                        {/* <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26 }}
                            source={require('../assets/newIcons/logout/logout.png')}
                        /> */}
                        <Text style={[styles.itemText, { color: Colors.getColor("leadTextColor") }]}>Log out</Text>
                    </TouchableOpacity>
                </View>
                {/* <DataForm
                    visible={this.state.showModal}
                    closeModal={this.handleCloseModal}
                /> */}
                <LeadPopup
                    visible={this.state.showModal}
                    closeModal={this.handleCloseModal}
                />

            </View>
        )
    }
}

export default DrawerContent
const styles = StyleSheet.create({
    container: {
        width: "70%",
        flex: 1,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    headerContainer: {
        width: '100%',
        height: '30%',
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4c8cfe'
    },
    headerContent: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'SFProDisplay-Medium',
        fontSize: 24
    },
    designationText: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 14,
        letterSpacing: 0,
        textAlign: "left",
    },
    screenContainer: {
        height: '70%'
    },
    screenStyle: {
        height: 30,
        marginTop: 12,
        marginBottom: 32,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 27,
    },
    itemText: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 18,
        marginLeft: 24,
        letterSpacing: 0,
        textAlign: "left"
    }

});