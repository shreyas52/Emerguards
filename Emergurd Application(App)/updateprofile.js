import React, { useState ,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './profile1';
import axios, { Axios } from 'axios';
import { Alert } from "react-native";


const UpdateProfile = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [vehicleRegisterNumber, setVehicleRegisterNumber] = useState("");

  const updateProfile = async() => {
    try{ 
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);        
        console.log("signup clicked")
        const response1 = await axios.post('http://10.0.2.2:3000/api/update',{id:currentUser.id,fullname:fullName, username:username, password:confirmPassword ,birthdate:birthdate,mobilenumber:mobileNo,vehicalno:vehicleRegisterNumber});
        console.log(response1.data);
        console.log(fullName,username,confirmPassword,birthdate,mobileNo,vehicleRegisterNumber);
        Alert.alert("Update Sucessful ,"+username);

    }
    catch(err){
        console.log("err",err.message)
    }
  };
  useEffect(() => {
  const info = async () => {
    try{   
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);   

      console.log("info clicked")
      const response2 = await axios.post('http://10.0.2.2:3000/api/info',{ id:currentUser.id});
      console.log(response2.data);
      const fullname = response2.data.fullname;
      const username = response2.data.username;
      const password = response2.data.password;
      const birthdate = response2.data.birthdate;
      const mobilenumber = response2.data.mobilenumber;
      const vehicalno = response2.data.vehicalno;
      console.log(fullname,username,password,birthdate,mobilenumber,vehicalno);
      setFullName(fullname);
      setUsername(username);
      setConfirmPassword(password);
      setBirthdate(birthdate);
      setMobileNo(mobilenumber);
      setVehicleRegisterNumber(vehicalno);
      
    }
    catch(err){ 
      console.log("err",err.message)
    }
  };
  info();
},[]);


  return (
    <View style={styles.container}>

      <Button title="Home" onPress={() => navigation.push('Home')} />

      <Text>Update Profile</Text>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput placeholder="Birth Date" value={birthdate} onChangeText={setBirthdate} />
      <TextInput placeholder="Mobile Number" value={mobileNo} onChangeText={setMobileNo} />
      <TextInput placeholder="Vehicle Number" value={vehicleRegisterNumber} onChangeText={setVehicleRegisterNumber} />
      <Button title="Update Profile" onPress={updateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default UpdateProfile;