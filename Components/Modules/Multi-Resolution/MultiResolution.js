/*
    Module used fro setting the resolution of devices,
    on multiple screen.
*/

// Fetching dependencies
import { Dimensions } from 'react-native';

// Importing configurations
import { SAMPLE_SPACE_WIDTH,SAMPLE_SPACE_HEIGHT } from '../../Configurations/config'

// Calculating current device width/height
const { width, height } = Dimensions.get('window');


const WScale = size => width / SAMPLE_SPACE_WIDTH * size;
const HScale = size => height / SAMPLE_SPACE_HEIGHT * size;
const MScale = (size, factor = 0.5) => size + ( WScale(size) - size ) * factor;

// Module Exports.
module.exports = { WScale,HScale,MScale }