import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {isSameDay} from "date-fns";

const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

export default function CurrentWeather({data}) {

    const [currentWeather, setCurrentWeather] = useState(null);

    // récupere le temps du jour via la date
    // voir docs : https://openweathermap.org/forecast5#5days
    useEffect(() => {
        // la date actuelle
        const nowWeather = data.list.filter(forecast => {
            //check si les dates sont identitiques (date actuelle et date de la prévision météo)
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000) ;
            // la date de la prévision
            const forecastDate = new Date(forecast.dt * 1000);
            return isSameDay(today, forecastDate);
        })
        setCurrentWeather(nowWeather[0]);
    }, [data])

    return (

        <View style={styles.container}>
            <Text style={styles.city}>{data?.city?.name}</Text>
            <Text style={styles.today}>Aujourd'hui</Text>
            <Image
                source={{ uri: getIcon(currentWeather?.weather[0].icon) }}
                style={styles.image}
            />
            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
        </View>

    );
}

const COLOR = "#54565B";

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        alignItems: "center",
        height: "65%"
    },
    city: {
        fontSize: 36,
        fontWeight: "500",
        color: COLOR
    },
    today: {
        fontSize: 24,
        fontWeight: "300",
        color: COLOR
    },
    image: {
        width:150,
        height: 150,
        marginVertical: 10
    },
    temp: {
        fontSize: 80,
        fontWeight: "bold",
        color: COLOR
    },
    description: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLOR,
        marginBottom: 20
    }
});