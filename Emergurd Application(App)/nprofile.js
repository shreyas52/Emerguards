import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(''); // State to store the profile photo URI
  const [username, setUsername] = useState('');

  const handlePersonal_info = () => {
    navigation.navigate('Personal_info');  
  };
  const handleVehicleDetails = () => {
    navigation.navigate('VehicleDetails');  
  };
  const handleRecentEvents = () => {
    navigation.navigate('RecentEvents');  
  };

  const handleRecentEvents1 = () => {
    navigation.navigate('Req1');  
  };
  useEffect(() => {
    const getuser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const currentUser = JSON.parse(savedUser);
        console.log(currentUser); 
        setUsername(currentUser.username);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, []);
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <View style={styles.backicon}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="#007BFF" />
        </TouchableOpacity>
        </View>
        <View style={styles.titlecontainer}>
            <Text style={styles.title}>Profile</Text>
        </View>
      </View>
      <View style={styles.body}>
      <View style={styles.bodycontainer}>

        <View style={styles.updatePhotoContainer}>
        <View style={styles.updatePhotoContainer}>
          {username ? (
            <View style={styles.profilePhoto}>
              <Text style={styles.initials}>
                {username[0].toUpperCase()}
              </Text>
            </View>
          ) : (
            <Image style={styles.profilePhoto} />
          )}
          
        </View>
          {/* <TouchableOpacity>
            <Ionicons style={styles.updatePhotoIcon} name="ios-camera" size={20} color="white" />
          </TouchableOpacity> */}
        </View>
        <View style={styles.username}>
          <Text style={styles.usernametext}>
            {username}
          </Text>
        </View>
      <TouchableOpacity style={styles.button} onPress={handlePersonal_info}>
        <Ionicons style={styles.icon} name="ios-person" size={24} color="#279EFF" />
        <Text style={styles.text}>Personal info</Text>
        <Ionicons style={styles.arrow} name="arrow-forward-circle" size={25} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVehicleDetails}>
        <Ionicons style={styles.icon} name="ios-car" size={24} color="#279EFF" />
        <Text style={styles.text}>Vehicle Details</Text>
        <Ionicons style={styles.arrow} name="arrow-forward-circle" size={25} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRecentEvents}>
        <Ionicons style={styles.icon} name="ios-person" size={24} color="#279EFF" />
        <Text style={styles.text}>Recent Events</Text>
        <Ionicons style={styles.arrow} name="arrow-forward-circle" size={25} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRecentEvents1}>
        <Ionicons style={styles.icon} name="ios-person" size={24} color="#279EFF" />
        <Text style={styles.text}>Request</Text>
        <Ionicons style={styles.arrow} name="arrow-forward-circle" size={25} color="blue" />
      </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveScreenHeight(8),
    justifyContent: 'space-between',
    backgroundColor:'#282A3A',
  },
  backicon: {
    marginLeft: responsiveScreenWidth(3),
  },
  titlecontainer:{
    top: responsiveScreenHeight(0),
    marginRight: responsiveScreenWidth(41),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'white',
  },
  body:{
    alignItems: 'center',
    height: responsiveScreenHeight(100),
  },
  bodycontainer:{
    marginTop:responsiveScreenHeight(2), 
    paddingTop:responsiveScreenHeight(6),
    height:responsiveScreenHeight(80),
    width:responsiveScreenWidth(80),
    backgroundColor: 'transparent',
  },
  updatePhotoContainer: {
    marginTop: responsiveScreenHeight(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  profilePhoto: {
    borderColor:'royalblue',
    borderWidth:5,
    paddingTop: responsiveScreenHeight(0),
    width: 100,
    height: 100,
    borderRadius: responsiveScreenWidth(100),
    marginBottom: responsiveScreenHeight(4),
    marginRight: responsiveScreenWidth(-5),
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatePhotoIcon: {
    marginTop:responsiveScreenHeight(2),
    backgroundColor: '#279EFF',
    borderRadius: 50,
    padding: responsiveScreenWidth(2),
  },
  username:{
    alignItems:'center',
    justifyContent:'center',
    height: responsiveScreenHeight(3),
    backgroundColor: 'white',
    marginTop:responsiveScreenHeight(-4),
    marginBottom: responsiveScreenHeight(4),
    borderRadius:40,
  },
  usernametext:{
    fontSize:responsiveFontSize(1.9),
    fontWeight:'600',
  },
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:responsiveScreenHeight(1),
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(6),
    paddingHorizontal: responsiveScreenWidth(2),
    borderRadius: 10,
  },
  icon:{
    color:'royalblue',
    marginLeft: responsiveScreenWidth(2),
    marginRight: responsiveScreenWidth(2),
  },
  text: {
    position: 'absolute',
    fontFamily: 'Galeextra-bold',
    fontSize: responsiveFontSize(2.3), // Apply the Galey Extra Bold font here
    color: 'black',
    marginLeft: responsiveScreenWidth(15),
  },
  arrow:{
    position: 'absolute',
    color: 'gray',
    marginLeft: responsiveScreenWidth(70),
  },
  initials: {
    color: 'white',
    fontSize: 40,
  },
});

export default Profile;
