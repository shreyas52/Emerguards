import React, { useState ,useEffect } from "react";
import{
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

import Profile from './profile1'; // Adjust the path according to your file structure
import axios, { Axios } from 'axios';
import { Alert } from "react-native";
import { useRoute } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateprofile from './updateprofile';

const Spinfo =({ navigation ,route}) =>{  
    
    const [fullName, setFullName] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [newId, setNewId] = useState(null);

    const { id2 } = route.params || {};



useEffect(() => {

    const fetchData = async () => {
    setNewId(id2);
    console.log(id2);
    fetch(`http://10.0.2.2:3000/api/sp/${id2}`)
      .then(response => response.json())
      .then(data =>  {
        console.log(data);
        // setUser(data);
        const fullName = data.fullName;
        const email = data.email;
        const mobileNo = data.mobileNo;
        const company = data.company;
        const companyAddress = data.companyaddress;
        const city = data.city;
        const pincode = data.pincode;
  
        setFullName(fullName);
        setEmail(email);
        setMobileNo(mobileNo);
        setCompany(company);
        setCompanyAddress(companyAddress);
        setCity(city);
        setPincode(pincode);
   
      })
      .catch(error => console.error(error));
    };

    fetchData();
}, [id2]);

return (
    <View style={styles.container}>
    <Text style={styles.title}>Service Provider Information</Text>
    <Text style={styles.text}>Full Name: {fullName}</Text>
    <Text style={styles.text}>Email: {email}</Text>
    <Text style={styles.text}>Mobile Number: {mobileNo}</Text>
    <Text style={styles.text}>Company: {company}</Text>
    <Text style={styles.text}>Company Address: {companyAddress}</Text>
    <Text style={styles.text}>City: {city}</Text>
    <Text style={styles.text}>Pincode: {pincode}</Text>
</View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Spinfo;