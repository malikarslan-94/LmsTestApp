
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Drawer from "./UIComponents/DrawerCotent"

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <Drawer />
    </View>
  );
};

export default App;
