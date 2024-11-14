import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SPLogout = ({ navigation, isVisible, onClose}) => {

  const handleLogout = async () => {
    await AsyncStorage.removeItem("sp");
    navigation.push('Home');  
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.container}>
      <View style={styles.closebutton}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="ios-close" size={32} color="white" />
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
              <Text style={styles.LogoutButtonText}>Logout</Text>
            </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  closebutton: {
    position: 'absolute',
    top: responsiveScreenHeight(8),
    marginLeft: responsiveScreenWidth(60),
    zIndex: 1,
  },
  LogoutButton:{
    width:responsiveScreenWidth(25),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    height:responsiveScreenHeight(4),
    marginLeft:responsiveScreenWidth(70),
    marginTop:responsiveScreenHeight(8),
    backgroundColor:'royalblue',
  },
  LogoutButtonText:{
    color:'white',
    fontWeight:'700',
  },
});

export default SPLogout;