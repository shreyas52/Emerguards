import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';

const SPSide = ({ theme, toggleTheme, closeSidebar}) => {
  const [] = useFonts({
    // 'Galeextra-bold': require('./assets/fonts/Galeextra-bold.otf'),
  });
  const [activeButton, setActiveButton] = useState('');

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };
  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  //   const newTheme = isDarkTheme? 'white' : 'black';
  //   handleThemeChange(newTheme);
  // };

  // const handleButtonPress = (button) => {
  //   setActiveButton(button);
  // };
  const navigation = useNavigation();
  const handleSPProfile = () => {
    navigation.navigate('SPProfile');  
  };
  const handleSPContact = () => {
    navigation.navigate('SPContact');
  };
  // const handleAbout = () => {
  //   navigation.navigate('About');
  // };
  // const handleRate = () => {
  // //   navigation.navigate('Rate');  
  // };
  const handleSPHistory = () => {
    navigation.navigate('SPHistory');
  }; 
  const handleSPSetting = () => {
    navigation.navigate('SPSetting');
  };    
  return (
    <View style={styles.container}>
      <View style={styles.sideheaderContainer}>
        <View style={styles.sideheaderclossButton}>
        <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
          <Ionicons name="ios-close" size={30} color="#222e50" />
        </TouchableOpacity>
        </View>
        <View style={styles.sideheaderlogo}>
        {/* <Image
          source={require('./assets/projectlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'dashboard' && styles.activeNavItem,
          ]}
          onPress={handleSPProfile}
        >
          <Ionicons name="ios-create" size={24} color={activeButton === 'profile' ? '#fccb06' : '#edf7f6'} />
          <Text style={[styles.navText, activeButton === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'contact' && styles.activeNavItem,
          ]}
          onPress={handleSPContact}
        >
          <Ionicons name="call" size={24} color={activeButton === 'contact' ? '#fccb06' : '#edf7f6'} />
          <Text style={[styles.navText, activeButton === 'contact' && styles.activeNavText]}>Contact Us</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'about' && styles.activeNavItem,
          ]}
          onPress={handleAbout}
        >
          <Ionicons name="ios-information-circle" size={24} color={activeButton === 'about' ? '#fccb06' : 'white'} />
          <Text style={[styles.navText, activeButton === 'about' && styles.activeNavText]}>About Us</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'rate' && styles.activeNavItem,
          ]}
          onPress={handleRate}
        >
          <Ionicons name="ios-star" size={24} color={activeButton === 'rate' ? '#fccb06' : 'white'} />
          <Text style={[styles.navText, activeButton === 'rate' && styles.activeNavText]}>Rate Us</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'history' && styles.activeNavItem,
          ]}
          onPress={handleSPHistory}
        >
          <Ionicons name="ios-book" size={24} color={activeButton === 'history' ? '#fccb06' : 'white'} />
          <Text style={[styles.navText, activeButton === 'history' && styles.activeNavText]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'settings' && styles.activeNavItem,
          ]}
          onPress={handleSPSetting}
        >
          <Ionicons name="ios-settings" size={24} color={activeButton === 'settings' ? '#fccb06' : 'white'} />
          <Text style={[styles.navText, activeButton === 'settings' && styles.activeNavText]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeButton === 'logout' && styles.activeNavItem,
          ]}
          onPress={() => handleButtonPress('logout')}
        >
          <Ionicons name="ios-log-out" size={24} color={activeButton === 'logout' ? '#fccb06' : 'white'} />
          <Text style={[styles.navText, activeButton === 'logout' && styles.activeNavText]}>Logout</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.themeToggle}>
          <Text style={[styles.themeText, { color: theme ? '#edf7f6' : '#edf7f6' }]}>Theme:</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#FFF3DA', true: '#FFF3DA' }}
            thumbColor={theme ? '#fccb06' : '#FFF3DA'}
          />
          {theme === 'dark' ? (
            <Ionicons name="ios-moon" size={24} color="#FFF3DA" />
          ) : (
            <Ionicons name="ios-sunny" size={24} color="#fccb06"/>
          )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(80),
    backgroundColor: '#edf7f6',
    position: 'absolute',
    top: responsiveScreenHeight(0),
    left: responsiveScreenWidth(0),
    bottom: responsiveScreenHeight(0),
    zIndex: 1,
    paddingTop: responsiveScreenHeight(0),
    paddingLeft: responsiveScreenWidth(0),
    paddingRight: responsiveScreenWidth(0),
  },
  sideheaderContainer:{
    backgroundColor: '#edf7f6',
    width:responsiveScreenWidth(80),
    height: responsiveScreenHeight(11),
    right: responsiveScreenWidth(0),
  },
  sideheaderclossButton: {
    top: responsiveScreenHeight(1),
    left: responsiveScreenWidth(70),
  },
  sideheaderlogo: {
    alignItems: 'center',
    marginTop: responsiveScreenHeight(-2),
    marginLeft: responsiveScreenWidth(0),
  },
  logo: {
    marginLeft: responsiveScreenWidth(-38),
    marginBottom: responsiveScreenHeight(-10),
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(8),
  },
  content: {
    backgroundColor:'#222e50',
    paddingLeft: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(2),
    flex: 1,
    marginBottom: responsiveScreenHeight(0),
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:responsiveScreenHeight(2.5),
    marginBottom: responsiveScreenHeight(2.5),
    paddingHorizontal: responsiveScreenWidth(2),
    borderRadius: 5,
  },
  activeNavItem: {
    bcolor: '#fccb06',
  },
  navText: {
    fontFamily: 'Galeextra-bold',
    fontSize: responsiveFontSize(2.3), // Apply the Galey Extra Bold font here
    color: '#edf7f6',
    marginLeft: responsiveScreenWidth(3),
  },
  activeNavText: {
    color: '#09bbd8',
  },
  themeToggle: {
    position:'absolute',
    backgroundColor: '#222e50',
    width: responsiveScreenWidth(80),
    marginTop:responsiveScreenHeight(85),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveScreenWidth(43),
  },
  themeText: {
    // fontStyle: 'Galeextra-bold',
    fontSize: responsiveFontSize(2),
  },
});

export default SPSide;
