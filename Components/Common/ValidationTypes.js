export const validationTypes = {
    isUrgencyPopulated: {
        type: 'isPopulated',
        message: 'Please enter value',
    },

    isFullNamePopulated: {
        type: 'isPopulated',
        message: ('Please enter name'),
    },

    isServicePopulated: {
        type: 'isPopulated',
        message: ('Please enter eervice'),
    },
    isAddressPopulated: {
        type: 'isPopulated',
        message: ('Please enter address'),
    },
    isSourcePopulated: {
        type: 'isPopulated',
        message: ('Please enter source'),
    },
    isString: {
        type: 'isString',
        message: 'Please string',
    },
    isDateValid: {
        type: 'isDateValid',
        message: 'Please enter a valid date.',
    },
    isEmailPopulated: {
        type: 'isPopulated',
        message: ('Please enter email'),
    },

    isFirstNamePopulated: {
        type: 'isPopulated',
        message: ('please_enter_firstname'),
    },
    isLastNamePopulated: {
        type: 'isPopulated',
        message: ('please_enter_lastname'),
    },
    isMobileNumberPopulated: {
        type: 'isPopulated',
        message: ('Please Enter Mobile Number'),
    },
    isStreetAddressPopulated: {
        type: 'isPopulated',
        message: ('please_enter_street_address'),
    },
    isEmailFormated: {
        type: 'isEmail',
        message: ('Please enter email format'),
    },
    isEmailOrPhone: {
        type: 'isEmailOrPhone',
        message: ('please_format_email_r_phone'),
    },
    isNumber: {
        type: 'isNumber',
        message: ('Please enter number only'),
    },
    isCreditCardNumber: {
        type: 'isCreditCard',
        message: ('please_enter_valid_cc_number'),
    },
    isExpiryM_Y: {
        type: 'isGreaterThanLength',
        length: 3,
        message: ('please_enter_valid_expiry_m_y'),
    },
    isZipCode: {
        type: 'isPopulated',
        message: ('please_enter_valid_zip_code'),
    },
    isSubjectPopulated: {
        type: 'isPopulated',
        message: ('please_enter_subject'),
    },
    isEnquiryPopulated: {
        type: 'isPopulated',
        message: ('please_enter_enquiry'),
    },
    isPassword: {
        type: 'isGreaterThanLength',
        length: 5,
        message: ('password_limit_text'),
    },
    isDeviceId: {
        type: 'isPopulated',
        message: ('please_enter_imei'),
    },
    isMatchingPassword: (matchValue) => ({
        ...generateIsMatchObj(matchValue),
        message: ('password_does_not_match'),
    })


}

const generateIsMatchObj = (matchValue) => ({
    type: 'isMatched',
    matchValue,
})