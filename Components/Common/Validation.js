import validator from 'validator';

const isValidDate = date => {
    let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

    // Matching the date through regular expression      
    if (date.match(dateformat)) {
        let operator = date.split('/');

        // Extract the string into month, date and year      
        let datepart = [];
        if (operator.length > 1) {
            datepart = date.split('/');
        }
        let month = parseInt(datepart[0]);
        let day = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);

        // Create a list of days of a month      
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || month > 2) {
            if (day > ListofDays[month - 1]) {
                //to check if the date is out of range     
                return false;
            }
        } else if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
            if ((leapYear == false) && (day >= 29)) return false;
            else
                if ((leapYear == true) && (day > 29)) {
                    console.log('Invalid date format!');
                    return false;
                }
        }
    } else {
        console.log("Invalid date format!");
        return false;
    }
    return true;
}
const isPopulated = value => !!value.toString().trim().length;
const isEmail = value => validator.isEmail(value);
const isGreaterThanLength = (value, length) => value.length > length;
const isMatched = (value, matchValue) => value === matchValue;
const isNumber = value => validator.isNumeric(value);
const isString = value => !validator.isNumeric(value)
const isPhoneNumber = value => {
    const valueArr = value.split('')
    const plusSign = valueArr[0] && valueArr[0] === '+';
    const valueWithoutPlus = value.replace('+', '');
    const isNumber = validator.isNumeric(valueWithoutPlus)

    return plusSign && isNumber;

    // validator.isNumeric(value)
};
const isCreditCard = value => validator.isCreditCard(value);
const isZipCode = value => validator.isPostalCode(value);

const getErrorsString = errors => errors.reduce((CompleteErrorString, errorMessage, index) => {
    if (index === 0) { return errorMessage; }
    return `${CompleteErrorString}\n${errorMessage}`;
}, '');

const getValidationErrors = fieldsConfig => fieldsConfig
    .map((field) => {
        const matched = field.verify.find((verification) => {
            if (verification.type === 'isDateValid' && !isValidDate(field.value)) {
                return true;
            }
            if (verification.type === 'isPopulated' && !isPopulated(field.value)) {
                return true;
            }

            if (verification.type === 'isTrue' && !field.value) {
                return true;
            }
            if (verification.type === 'isGreaterThanLength' && !isGreaterThanLength(field.value, verification.length)) {
                return true;
            }

            if (verification.type === 'isEmail' && !isEmail(field.value)) {
                return true;
            }
            if (verification.type === 'isEmailOrPhone' && !isEmail(field.value) && !isPhoneNumber(field.value)) {
                return true;
            }

            if (verification.type === 'isNumber' && !isNumber(field.value)) {
                return true;
            }
            if (verification.type === 'isString' && !isString(field.value)) {
                return true;
            }
            if (verification.type === 'isCreditCard' && !isCreditCard(field.value)) {
                return true;
            }
            if (verification.type === 'isZipCode' && !isZipCode(field.value)) {
                return true;
            }

            if (
                verification.type === 'isMatched'
                && isPopulated(field.value)
                && isPopulated(verification.matchValue)
                && !isMatched(field.value, verification.matchValue)
            ) {
                return true;
            }

            if (verification.type === 'isCustom' && !verification.condition) {
                return true;
            }
        });

        return !!matched && matched.message;
    })
    // Filter out all messages that are not false
    .filter(message => message);

const validateForm = (fieldsConfig) => {
    // alert(fieldsConfig)
    // return
    const errors = getValidationErrors(fieldsConfig);

    if (errors.length) {
        return getErrorsString(errors);
    }

    return false;
};

export default validateForm;
