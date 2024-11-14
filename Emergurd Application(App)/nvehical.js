import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Alert,  View, Image, Text, TextInput, StyleSheet, TouchableOpacity ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
import { set } from 'mongoose';
const Personal_info = ({navigation}) => {
    const [profilePhoto, setProfilePhoto] = useState('');
    const [VehicleBrand, setVehicleBrand] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [modelName, setModelName] = useState('');
    const [veh_Reg_No, setVeh_Reg_No] = useState('');
    const [modelColor, setModelColor] = useState('');
    const [ChassisNo, setChassisNo] = useState('');
    const [formSection, setFormSection] = useState(1);
    const [username, setUsername] = useState('');

    const handleNext = () => {
        setFormSection(2);
      };
    
      const handleBack = () => {
        setFormSection(1);
      };
    
      const handleSave =async() => {
        try{ 
          const savedUser = await AsyncStorage.getItem("user");
          const currentUser = JSON.parse(savedUser);
          console.log(currentUser);        
            console.log("signup clicked")
            const response1 = await axios.post('http://10.0.2.2:3000/api/vehicle',{id:currentUser.id,VehicleBrand:VehicleBrand, bodyType:bodyType, modelName:modelName ,veh_Reg_No:veh_Reg_No,modelColor:modelColor,ChassisNo:ChassisNo});
            console.log(response1.data);
            Alert.alert("Update Sucessful ,"+username);
        }
        catch(err){
            console.log("err",err.message)
        }
      };

  useEffect(() => {

    const fetchData = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);  

    
    fetch(`http://10.0.2.2:3000/api/user/${currentUser.id}`)
      .then(response => response.json())
      .then(data =>  {
        // console.log(data);

        const username = data.username;
        const VehicleBrand = data.VehicleBrand;
        const bodyType = data.bodyType;
        const modelName = data.modelName;
        const veh_Reg_No = data.veh_Reg_No;
        const modelColor = data.modelColor;
        const ChassisNo = data.ChassisNo;

        setUsername(username);
        setVehicleBrand(VehicleBrand);
        setBodyType(bodyType);
        setModelName(modelName);
        setVeh_Reg_No(veh_Reg_No);
        setModelColor(modelColor);
        setChassisNo(ChassisNo);
      })
      .catch(error => console.error(error));
    };
    fetchData();
  },[]);

      
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View style={styles.header}>
            <View style={styles.backicon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="#007BFF" />
            </TouchableOpacity>
            </View>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Vehicle Details</Text>
            </View>
          </View>
          <View style={styles.body}>
          <View style={styles.bodycontainer}>
            <View style={styles.updatePhotoContainer}>
              <Image style={styles.profilePhoto} />
              <TouchableOpacity>
                <Ionicons style={styles.updatePhotoIcon} name="ios-camera" size={20} color="white" />
              </TouchableOpacity>
              <View style={styles.username}>
              <Text style={styles.usernametext}>
                {username}
              </Text>
            </View>
            </View>
            <Text style={styles.formTitle}>Vehicle Information</Text>
            <View>
                <View style={styles.personalInfoForm}>
                {/* Full Name */}
                {formSection === 1 && (
          <View>

            <View style={styles.formField}>
              <Text style={styles.label}>Vehicle Brand:</Text>
              <TextInput value={VehicleBrand} onChangeText={setVehicleBrand}
                style={styles.input}
                // Add necessary props for full name field
              />
            </View>

            {/* Email */}
            <View style={styles.formField}>
              <Text style={styles.label}>Body Type:</Text>
              <TextInput value={bodyType} onChangeText={setBodyType}
                style={styles.input}
                // Add necessary props for email field
              />
            </View>

            {/* Mobile Number */}
            <View style={styles.formField}>
              <Text style={styles.label}>Model Name :</Text>
              <TextInput value={modelName} onChangeText={setModelName}
                style={styles.input}
                // Add necessary props for mobile number field
              />
            </View>

            {/* Date of Birth */}
            <View style={styles.formField}>
              <Text style={styles.label}>Veh. Registration No.</Text>
              <TextInput value={veh_Reg_No} onChangeText={setVeh_Reg_No}
                style={styles.input}
                // Add necessary props for date of birth field
              />
            </View>

            {/* Address */}
            <View style={styles.formField}>
              <Text style={styles.label}>Model Color:</Text>
              <TextInput value={modelColor} onChangeText={setModelColor}
                style={styles.input}
                // Add necessary props for address field
              />
            </View>
            {/* Next button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
            {formSection === 2 && (
          <View>
            <View style={styles.formField}>
              <Text style={styles.label}>Chassis No:</Text>
              <TextInput value={ChassisNo} onChangeText={setChassisNo}
                style={styles.input}
                // Add necessary props for state field
              />
            </View>
            {/* Back and Save buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
    </View>
    </View>
    </View>
    </ScrollView>
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
        marginRight: responsiveScreenWidth(32),
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
        paddingTop: 10,
        paddingLeft: 12,
        paddingBottom: 10,
        position: 'fixed',
        backgroundColor:'white',
        borderRadius:10,
        marginTop: responsiveScreenHeight(-6),
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
        marginBottom: responsiveScreenHeight(0),
        marginLeft: responsiveScreenWidth(-2),
      },
      updatePhotoIcon: {
        marginLeft:responsiveScreenWidth(-6),
        marginTop:responsiveScreenHeight(6),
        backgroundColor: '#279EFF',
        borderRadius: 50,
        padding: responsiveScreenWidth(2),
      },
      username:{
        marginRight:responsiveScreenWidth(-2),
        marginLeft:responsiveScreenWidth(2),
        alignItems:'center',
        justifyContent:'center',
        width: responsiveScreenWidth(50),
        height: responsiveScreenHeight(3),
        marginTop:responsiveScreenHeight(8),
        marginBottom: responsiveScreenHeight(0),
        borderRadius:40,
      },
      usernametext:{
        fontSize:responsiveFontSize(2),
        fontWeight:'600',
      },
      formTitle:{
        color:'white',
        backgroundColor:'black',
        height:responsiveScreenHeight(3),
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:responsiveFontSize(2),
        fontWeight:'600',
        borderRadius: 50,
      },
      personalInfoForm:{
        backgroundColor:'white',
        marginTop:15,
        paddingBottom:20,
        padding:5,
        borderRadius:10,
      },
      formField:{
        backgroundColor:'white',
      },
      picker:{
        borderRadius:10,
        borderWidth:1.5,
        borderColor:'blue',
        marginBottom:responsiveScreenHeight(1),
      },
      uploadButton:{
        marginLeft:responsiveScreenWidth(1),
        width:responsiveScreenWidth(25),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        borderColor:'darkblue',
        borderWidth:2,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'darkblue',
      },
      uploadButtonText:{
        color:'white',
        fontWeight:'600',
      },
      selectname:{
        marginTop:10,
        color:'black',
        marginLeft:responsiveScreenWidth(2),
        fontWeight:'500',
      },
      label:{
        marginTop:12,
        color:'black',
        marginLeft:responsiveScreenWidth(1),
        fontWeight:'500',
      },
      input:{
        paddingLeft:10,
        height:50,
        backgroundColor:'white',
        marginTop:5,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
      },
      nextButton: {
        marginLeft:responsiveScreenWidth(62),
        width:responsiveScreenWidth(15),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'#FC6736',
      },
      nextButtonText:{
        color:'white',
        fontWeight:'600',
      },
      backButton: {
        marginLeft:responsiveScreenWidth(0.5),
        width:responsiveScreenWidth(15),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'#F8F4EC',
      },
      backButtonText:{
        color:'black',
        fontWeight:'600',
      },
      saveButton: {
        marginLeft:responsiveScreenWidth(41),
        width:responsiveScreenWidth(15),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'green',
      },
      saveButtonText:{
        color:'white',
        fontWeight:'600',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default Personal_info;

