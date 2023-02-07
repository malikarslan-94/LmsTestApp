/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect, useState } from 'react';
import type { Node } from 'react';
import "@walletconnect/react-native-compat";
// import { signClient } from "./component/ConnectWallet"
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SignClient from "@walletconnect/sign-client";
import AuthClient from "@walletconnect/auth-client";










const App: () => Node = () => {
  const [client, setClient] = useState < AuthClient | null > ();
  const [uri, setUri] = useState < string > ("");
  const [address, setAddress] = useState < string > ("");

  const onSignIn = useCallback(() => {
    if (!client) return;
    client
      .request({
        aud: "http://localhost:8081/",
        domain: "localhost:8081",
        chainId: "eip155:1",
        type: "eip4361",
        nonce: "nonce",
        statement: "Sign in with wallet.",
      })
      .then(({ uri }) => setUri(uri));
  }, [client, setUri]);

  useEffect(() => {
    AuthClient.init({
      projectId: "70f4c011426d1106a21bf3fb1b3530b6",
      // relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: 'React Wallet',
        description: 'React Wallet for WalletConnect',
        url: 'https://walletconnect.com/',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    }
    )
      .then((authClient) => {
        setClient(authClient);
      })
      .catch(console.log);
  }, [setClient]);

  useEffect(() => {
    if (!client) return;
    client.on("auth_response", (res) => {
      if (res.params.result.s) {
        setAddress(res.params.result.p.iss.split(":")[4]);
      }
    });
  }, [client]);

  const [view, changeView] = useState < "default" | "qr" | "signedIn" > ("default");

  useEffect(() => {
    if (uri) changeView("qr");
  }, [uri, changeView]);

  useEffect(() => {
    if (address) changeView("signedIn");
  }, [address, changeView]);
  console.log({ uri });
  return (
    <View style={{ flex: 1 }}>
      {view === "default" && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button color={'red'} onPress={onSignIn} title='signIn' />
        </View>
      )}
      {view === "qr" && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>SCAN QR CODE</Text>
          <Text>{uri}</Text>
        </View>
      )}
      {view === "signedIn" && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>SignedIn</Text>
        </View>
      )}

    </View>
  );
};














// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const Section = ({ children, title }): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   onConnectPress = async () => {
//     try {

//       let data = await AuthClient.init({
//         projectId: "70f4c011426d1106a21bf3fb1b3530b6",
//         // relayUrl: 'wss://relay.walletconnect.com',
//         metadata: {
//           name: 'React Wallet',
//           description: 'React Wallet for WalletConnect',
//           url: 'https://walletconnect.com/',
//           icons: ['https://avatars.githubusercontent.com/u/37784886']
//         }
//         // metadata: {
//         //     name: "Test Wallet",
//         //     description: "Test Wallet",
//         //     url: "https://forentechnologies.com/",
//         //     icons: ["https://walletconnect.com/walletconnect-logo.png"],
//         // },
//       });
//       console.log({ data });
//       data.request({
//         aud: "http://localhost:8081/",
//         domain: "localhost:8081",
//         chainId: "eip155:1",
//         type: "eip4361",
//         nonce: "nonce",
//         statement: "Sign in with wallet.",
//       })
//         .then(({ uri }) => console.log({ uri }));
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         {/* <Header /> */}
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//             height: 800
//           }}>
//           <Section title="New Technology">
//             <Text style={styles.highlight}>Block Chain Developement</Text>
//           </Section>
//           <View style={{ marginTop: 90 }}>
//             <Button onPress={onConnectPress} title="Connect Wallet">
//               Connect Wallet
//             </Button>
//           </View>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
