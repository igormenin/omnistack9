import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Platform, Alert, StatusBar, ScrollView, SafeAreaView, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(user_id => {
      const socket = socketio(`http://192.168.0.108:3333`, {
        query: { user_id }
      })
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  });

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  }
});