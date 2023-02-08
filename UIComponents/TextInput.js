import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { WScale } from '../Components/Modules/Multi-Resolution/MultiResolution'
import Proptypes, { any } from 'prop-types'
import validateForm from './../Components/Common/Validation'
import Colors from './../UIComponents/Popups/Colors/Colors';


export class AppInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
    }
  }
  validate = () => {
    const { validationType, value, onValidationChange, validationName } = this.props;
    // alert(JSON.stringify({ validationType, value }))
    // return
    if (validationType) {
      let fields = [
        {
          value: value,
          verify: validationType
        },
      ];
      // alert(fields)
      const errorMessage = validateForm(fields);
      if (errorMessage) {
        this.setState({ errorMessage: errorMessage })
        onValidationChange(validationName, false)
        return false;
      }
      else {
        this.setState({ errorMessage: null })
        onValidationChange(validationName, true)
        return true;
      }
    }
  }

  static propTypes = {
    ...Text.prototype,
    containerStyle: Proptypes.object,
    width: Proptypes.number,
    noUnderline: Proptypes.bool,
    validationType: any,
    errorMessage: any,
    onValidationChange: Proptypes.func,
    validationName: Proptypes.string,
  }
  render() {
    const { clearButtonMode, containerStyle,
      autoFocus = false, maxLength, onBlur } = this.props;
    const { errorMessage } = this.state;
    return (
      <>
        <View style={[containerStyle,
          errorMessage && styles.inputError]}>
          <TextInput
            style={{ color: Colors.getColor('leadTextColor') }}
            placeholderTextColor={Colors.getColor('placeHolderText')}
            autoFocus={autoFocus}
            maxLength={maxLength ? maxLength : 50}
            onBlur={onBlur ? onBlur : this.validate}
            clearButtonMode={clearButtonMode ? clearButtonMode : 'while-editing'}
            {...this.props}
          />
        </View>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      </>
    )
  }
}




const styles = StyleSheet.create({
  placeholder: {
    fontSize: WScale(10),
    lineHeight: WScale(12),
  },
  noUnderline: {
    borderBottomWidth: 0
  },
  inputError: {
    borderColor: Colors.getColor("errorRed")
  },
  errorIconContainer: {
    position: 'absolute',
    right: 0,
  },

})