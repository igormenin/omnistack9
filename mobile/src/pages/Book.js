import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert, TouchableOpacity, View, Text, TextInput, Image, StyleSheet, Platform, StatusBar, AsyncStorage } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Book({ navigation }) {
  
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');
  
  async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user_id');
    
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })
    Alert.alert('Solicitação de reserva enviada!')
    navigation.navigate('List');
  }

  function handleCancel(){
    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView enabled={Platform.android} behavior="padding" style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <Text style={styles.label}>DATA DE INTERRESSE *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Qual a data deseja reservar?"
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Solicitar Reserva</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.buttonCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
  }, 
  button:{
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonCancel:{
    marginTop: 10,
    height: 42,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});