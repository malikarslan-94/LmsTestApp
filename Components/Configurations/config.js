/*
    Contains configuration concerning the application.
*/

// Importing React-Native Modules.
import { Text, TextInput } from 'react-native'

// Resolution Configuration.
// Defines the width and heigh of sample screen,
// for making element sizes resolution relative.
const SAMPLE_SPACE_WIDTH = 414
const SAMPLE_SPACE_HEIGHT = 736

// Font scaling flag.
const ENABLE_FONT_SCALING = false;

// Apply Configuration.
ApplyConfiguration = () => {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = ENABLE_FONT_SCALING;
    TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: ENABLE_FONT_SCALING };
}


// Module Exports.
module.exports = { SAMPLE_SPACE_WIDTH, SAMPLE_SPACE_HEIGHT, ENABLE_FONT_SCALING, ApplyConfiguration }