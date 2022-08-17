import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";
import {useState} from "react";

export default function App() {

  // récupération des datas user
  const [location, setLocation] = useState(null);
  React.useEffect(() => {
    // récupération de la position où se trouve l'user
    const getCoordinates = async () => {

     const {status} = await Location.requestForegroundPermissionsAsync()
      if(status !=="granted") {
        return alert("Il faut accepter de partager votre position, sinon l'app ne fonctionnera pas correctement !")
      }

      const userLocation = await  Location.getCurrentPositionAsync();
      setLocation(userLocation);
    }
    getCoordinates()

  }, [])
  // check location not null
  if(!location) {
    return (
      <View style={styles.container}>
        <Text> Location est null </Text>
      </View>
    );
  }
  // faire une request vers le serveur (city, méteo du moment,prévisions)

  return (
    <View style={styles.container}>
      <Text> {location.coords.latitude}</Text>
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
