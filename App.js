import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";

import CurrentWeather from "./components/CurrentWeather";
import Forecasts from "./components/Forecasts";

const API_URL = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/forecast?` +
    `lat=${lat}` +
    `&lon=${lon}` +
    `&appid=${'476fe241ab27c6446b5f153b18a24504'}` +
    "&lang=fr" +
    `&units=metric`
;

export default function App() {

    const [errorMsg, setErrorMsg] = useState(null);

    // Users datas recovery
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Retrieval of the user's position (where he is)
        const getCoordinates = async () => {

            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const userLocation = await Location.getCurrentPositionAsync();
            getWeather(userLocation);
        }
        getCoordinates()
    }, [])

    // Make a request to the server (city, current weather, forecast)
    const getWeather = async (location) => {
        try {
            const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude));
            setData(response.data);
            setLoading(false);
        } catch (e) {
            console.log("Error dans getWeather :" + setErrorMsg(errorMsg))
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CurrentWeather data={data}/>
            <Forecasts data={data} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E6E1',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
