import React, { useState } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import SPSide from './SPSide';
import SPLogout from './SPLogout';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const SPmainpage = () => {
  const [] = useFonts({
    // 'Galeextra-bold': require('./assets/fonts/Galeextra-bold.otf'),
  });
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [mainType, setmainType] = useState('trackrequest');
  const toggleFormType = () => {
    setmainType((prevType) => (prevType === 'trackrequest' ? 'acceptedtask' : 'trackrequest'));
  };
  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const containerStyle = theme === 'dark' ? styles.darkContainer : styles.lightContainer;
  const textStyle = theme === 'dark' ? styles.darkText : styles.lightText;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.sidebaricon}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="ios-menu" size={32} color="#279EFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.logoShadow}>
            {/* <Image
              source={require('./assets/projectlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            /> */}
          </View>
        </View>
        <View style={styles.profileicon}>
          <TouchableOpacity onPress={toggleLogoutModal}>
            <Ionicons name="ios-person" size={24} color="#279EFF" />
          </TouchableOpacity>
        </View>
        <SPLogout isVisible={isLogoutModalOpen} onClose={toggleLogoutModal} navigation={navigation}/>
      </View>
      {mainType === 'trackrequest' && (
      <View style={styles.mainContainer}>
        <View style={styles.titlename}>
        <Text style={styles.title}>Track Request</Text>
        </View>
        <View style={styles.RequestContainer}>

        </View>
        {/* <View style={styles.titlename}>
        <Text style={styles.title}>Accepted Task</Text>
        </View>
        <View style={styles.RecentContainer}>

        </View> */}
        <View style={styles.ButtonContainer}>
        <View style={styles.ButtonRow}>
          <TouchableOpacity style={styles.Button1}>
          <View>
            <Text style={styles.Buttontext}>Decline</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button2} onPress={() => setmainType('acceptedtask')}>
          <View style={mainType === 'acceptedtask'}>
            <Text style={styles.Buttontext} >
              Accept</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      )}
      {mainType === 'acceptedtask' && (
      <View style={styles.mainContainer}>
        <View style={styles.titlename}>
        <Text style={styles.title}>Accepted Task</Text>
        </View>
        <View style={styles.RequestContainer}>

        </View>
        <View style={styles.ButtonContainer}>
        <View style={styles.ButtonRow}>
        <TouchableOpacity style={styles.Button2} onPress={() => setmainType('trackrequest')}>
          <View style={mainType === 'trackrequest'}>
            <Text style={styles.Buttontext} >
              Task Completed</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      )}
      {isSidebarOpen && (
        <SPSide
          theme={theme} // Pass the theme to the Sidebar component
          toggleTheme={toggleTheme} // Pass the toggleTheme function to the Sidebar component
          closeSidebar={closeSidebar}
        />
      )}
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
  },
  darkTheme: {
    backgroundColor: '#404258',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(1),
    height: responsiveScreenHeight(8),
    justifyContent: 'center',
    backgroundColor:'#282A3A',
  },
  sidebaricon:{
    marginRight: responsiveScreenWidth(25)
  }, 
  profileicon:{
    marginLeft: responsiveScreenWidth(29),
  },
  logoContainer: {
    alignItems: 'cover',
  },
  logo: {
    width: responsiveScreenWidth(25),
  },
  mainContainer: {
    backgroundColor:'lightgrey',
    height: responsiveScreenHeight(77), // Adjust the height as needed
    marginHorizontal: responsiveScreenWidth(5), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(4),
    borderRadius: 5,
    borderWidth: 2,
    borderColor:'#6C22A6',
  },
  titlename:{
    width:responsiveScreenWidth(40),
    marginLeft:responsiveScreenWidth(2),
    marginTop:responsiveScreenHeight(2),
  },
  title:{
    color:'#6C22A6',
    fontWeight:'bold',
    fontSize: responsiveFontSize(2.5),
    marginRight: responsiveScreenHeight(0),
  },
  RequestContainer: {
    backgroundColor:'white',
    width:responsiveScreenWidth(85),
    height: responsiveScreenHeight(59),
    borderRadius: 5,
    marginHorizontal: responsiveScreenWidth(2), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(2),
  },
  RecentContainer: {
    backgroundColor:'blue',
    width:responsiveScreenWidth(85),
    height: responsiveScreenHeight(20),
    borderRadius: 5,
    marginHorizontal: responsiveScreenWidth(2.5), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(1),
  },
  ButtonContainer: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(25),
    position:'absolute',
    marginTop: responsiveScreenHeight(68),
  },
  ButtonRow: {
    justifyContent:'center',
    flexDirection: 'row', 
    marginHorizontal: responsiveScreenWidth(0),
    width: responsiveScreenWidth(90),
    
  },
  Button1: {
    flexDirection: 'column',
    marginRight: responsiveScreenWidth(2),
    backgroundColor: 'red',
    borderRadius: 8,
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 3.2,
    shadowRadius: 8,
    elevation: 5,
  },
  Button2: {
    flexDirection: 'column',
    marginLeft: responsiveScreenWidth(2),
    backgroundColor: 'green',
    borderRadius: 8,
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 3.2,
    shadowRadius: 8,
    elevation: 5,
  },
  Buttonicon: {
    marginRight: responsiveScreenHeight(0),
    height: responsiveScreenHeight(7),
    width: responsiveScreenWidth(13),
  },
  Buttontext: {
    flexDirection:"row",
    alignItems:'center',
    fontWeight: 'bold',
    color:'white',
    fontSize: responsiveFontSize(1.8),
  },
});

export default SPmainpage;