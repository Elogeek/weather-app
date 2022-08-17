import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";
import {useState} from "react";
import * as axios from "axios";

const API_URL = (lat,lon) => "https://api.openweathermap.org/data/2.5/forecast?" +
    "lat={lat}" +
    "&lon={lon}" +
    "&appid={API_KEY}" +
    "&lang=fr"
    "&units=metric"
;

export default function App() {

    const [error, setError] = useState();

  // récupération des datas user
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  React.useEffect(() => {
    // récupération de la position où se trouve l'user
    const getCoordinates = async () => {

     const {status} = await Location.requestForegroundPermissionsAsync()
      if(status !=="granted") {
        return alert("Il faut accepter de partager votre position, sinon l'app ne fonctionnera pas correctement !")
      }

      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    }
    getCoordinates()
  }, [])

  // faire une request vers le serveur (city, méteo du moment,prévisions)
 const getWeather = async(location) => {
      try {
          const response = axios.get(API_URL(location.coords.latitude, location.coords.longitude))
          setData(response.data);
          setLoading(false);
      }
      catch(e){
        console.log("Error :" + setError(error))
      }
 }

 if(loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator/>
        </View>
    );
 }

  return (
    <View style={styles.container}>
      <Text> {data?.city?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
