import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ weather, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <View style={styles.headerContainer}>
      </View>
      <View style={styles.bodyContainer}>
        <MaterialCommunityIcons
          size={40}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.title}>{temperature}˚C</Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
});

export default Weather;
