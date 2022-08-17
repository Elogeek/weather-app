import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";

export default function App() {

  // récupération des datas user

  // faire une request vers le serveur (city, méteo du moment,prévisions)
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
