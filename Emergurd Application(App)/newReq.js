import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const Userrequest = ({route, navigation}) => {
    const [profilePhoto, setProfilePhoto] = useState('');
    const [formSection, setFormSection] = useState(1);
    
    const [fullName, setFullName] = useState('');
    const [mobileNo, setMobileNo] = useState('+91');
    const [username, setUsername] = useState('');

    const [VehicleBrand, setVehicleBrand] = useState('');
    const [modelName, setModelName] = useState('');
    const [modelColor, setModelColor] = useState('');
    const [veh_Reg_No, setVeh_Reg_No] = useState('');

    const [selectServiceType, setSelectServiceType] = useState('No Fuel');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');  
    const [mlocation, setMlocation] = useState('');   
    const {mlatitude = null, mlongitude = null } = route.params || {};

    const [image, setImage] = useState(null);
    const [issue ,setIssue]=useState("")
    const [eaddress, setEAddress] = useState('');
    

    const handleNext = () => {
      const totalSection= 3;
      setFormSection((prevSection) => {
          const nextSection = (prevSection % totalSection) + 1;
          return nextSection;
      });
    };
    const handleBack = () => {
      if (formSection > 1) {
          setFormSection(formSection - 1);
      }
    };
  
    
    const uploadImage = async (uri) => {
      let formData = new FormData();
      let filename = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
      formData.append('photo', { uri: uri, name: filename, type });
    
      return axios.post('http://10.0.2.2:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    };
    
    const handleSave = async () => {
      try {
        const uploadResponse = await uploadImage(image);
        // console.log('upload success', uploadResponse);
        console.log(uploadResponse.data.filename, uploadResponse.data.path);
        const savedUser = await AsyncStorage.getItem("user");
        const currentUser = JSON.parse(savedUser);
        console.log(currentUser);
    
        const reqpage = await axios.post('http://10.0.2.2:3000/api/reqpage', {
          id: currentUser.id,
          username: currentUser.username,
          latitude: latitude,
          longitude: longitude,
          mlatitude: mlatitude,
          mlongitude: mlongitude,
          eaddress: eaddress,
          selectServiceType: selectServiceType,
          issue: issue,
          filename: uploadResponse.data.filename,
          path: uploadResponse.data.path
        });
    
        console.log(reqpage.data);
      } catch(err) {
        console.log("err", err.message);
      }
    
      Alert.alert(
        "Success",
        "Request submitted successfully: " + username,
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        {
          cancelable: false,
        }
      );
      setLatitude("");
      setUsername("");
      setSelectServiceType("");
      setEAddress("");
      setIssue("");
    };

    const getLocation = async() => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if(!granted){
        return;
      }
      const {coords:{latitude,longitude}} =await Location.getCurrentPositionAsync(); 
      setLatitude(latitude);
      setLongitude(longitude);
      console.log(latitude,longitude);
     };
  
    const selectlocation= async() => {
      navigation.push('Reqmap');
     };

     const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log(result);

      if (!result.canceled) {
        let asset = result.assets[0];
        setImage(asset.uri);
        // uploadImage(asset.uri);

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
          console.log(data);
          const fullName = data.fullname;
          const username = data.username;
          const mobileNo = data.mobilenumber;

          const VehicleBrand = data.VehicleBrand;
          const modelName = data.modelName;
          const veh_Reg_No = data.veh_Reg_No;
          const modelColor = data.modelColor;

          setVehicleBrand(VehicleBrand);
          setModelName(modelName);
          setVeh_Reg_No(veh_Reg_No);
          setModelColor(modelColor);

          setFullName(fullName);
          setUsername(username);
          setMobileNo(mobileNo);
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
                <Text style={styles.title}>Request</Text>
            </View>
          </View>
          <View style={styles.body}>
          <View style={styles.bodycontainer}>
            <Text style={styles.formTitle}>Enter Details</Text>
            <View>
                <View style={styles.personalInfoForm}>
                {/* Full Name */}
                {formSection === 1 && (
          <View>
            {/* Full Name */}
            <View style={styles.formField}>
              <Text style={styles.label}>Full Name:</Text>
              <TextInput value={fullName} onChangeText={setFullName}
                style={styles.input}
                // Add necessary props for full name field
              />
            </View>

            {/* Email */}
            <View style={styles.formField}>
              <Text style={styles.label}>Mobile No.:</Text>
              <TextInput value={mobileNo} onChangeText={setMobileNo}
                style={styles.input}
                // Add necessary props for email field
              />
            </View>

            {/* Mobile Number */}
            <View style={styles.formField}>
              <Text style={styles.label}>Vehicle Brand:</Text>
              <TextInput value={VehicleBrand} onChangeText={setVehicleBrand}
                style={styles.input}
                placeholder='E.g. Tata'
                // Add necessary props for mobile number field
              />
            </View>
            {/* Address */}
            <View style={styles.formField}>
              <Text style={styles.label}>Model Name:</Text>
              <TextInput value={modelName} onChangeText={setModelName}
                style={styles.input}
                placeholder='E.g. Tiago'
                // Add necessary props for address field
              />
            </View>

            {/* Address */}
            <View style={styles.formField}>
              <Text style={styles.label}>Model Color:</Text>
              <TextInput value={modelColor} onChangeText={setModelColor}
                style={styles.input}
                placeholder='Body Color'
                // Add necessary props for address field
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Veh. Registration No.</Text>
              <TextInput value={veh_Reg_No} onChangeText={setVeh_Reg_No}
                style={styles.input}
                // Add necessary props for date of birth field
              />
            </View>
            {/* Next button */}
            {/* Back button*/}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              {/* Next button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            </View>
          </View>
          
        )}
            {formSection === 2 && (
          <View>

            {/* Live current Location */}
            <View style={styles.formField}>
              <Text style={styles.label}>Latitude:</Text>
              <Text style={styles.input1}> {latitude} </Text>
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Longitude:</Text>
              <Text style={styles.input1}> {longitude} </Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.GetLoc} onPress={getLocation}>
                <Text style={styles.GetLocText}>LIVE LOCATION</Text>
              </TouchableOpacity>
            </View>
            {/* Map Location */}
            {/* Latitude */}
            <View style={styles.formField}>
              <Text style={styles.label}>Latitude:</Text>
              <Text style={styles.input1}> {mlatitude} </Text>
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Longitude:</Text>
              <Text style={styles.input1}> {mlongitude} </Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.GetLoc}>
              <Text style={styles.GetLocText} onPress={selectlocation}>USE MAP</Text>
              </TouchableOpacity>
            </View>

            {/* Address */}
            <View style={styles.formField}>
              <Text style={styles.label}>Address:</Text>
              <TextInput value={eaddress} onChangeText={setEAddress}
                style={styles.input} multiline numberOfLines={5} placeholder='Enter address...'
                // Add necessary props for date of birth field
              />
            </View>

            {/* Back button*/}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              {/* Next button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
        {formSection === 3 && (
          <View>
            {/* Select Service Type */}
            <View style={styles.picker}>
              <Text style={styles.selectname}>Select Service Type:</Text>
              <Picker
                selectedValue={selectServiceType}
                onValueChange={(itemValue) => setSelectServiceType(itemValue)}
                itemStyle={{ color: 'black', fontSize: responsiveFontSize(2) }} // Adjust fontSize as needed
                dropdownIconColor={'black'}>
                <Picker.Item label="No Fuel" value="No Fuel"  style={styles.pickerItem}/>
                <Picker.Item label="Flat Tyre" value="Flat Tyre" />
                <Picker.Item label="Battery Dead" value="Battery Dead" />
                <Picker.Item label="Engine Trouble" value="Engine Trouble" />
                {/* Add more items as needed */}
              </Picker>
            </View>

            {/* Describe more */}
            <View style={styles.formField}>
              <Text style={styles.label}>Describe in detail:</Text>
              <TextInput onChangeText={setIssue}
                style={styles.input}
                placeholder='Enter description...'
                multiline
                numberOfLines={5}
              />
            </View>

            {/* Upload Photo */}
            <Text style={styles.label}>Upload Photo:</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText} onPress={pickImage} >Upload</Text>
            </TouchableOpacity>
            
            <View style={{ marginTop: 20  }}></View>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 225 }} />}
            <View style={{ marginTop: 20 }}></View>

            {/* Back and Save buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Submit</Text>
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
        marginRight: responsiveScreenWidth(39),
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
        marginTop:responsiveScreenHeight(0), 
        paddingTop:responsiveScreenHeight(5),
        height:responsiveScreenHeight(80),
        width:responsiveScreenWidth(80),
        backgroundColor: 'transparent',
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
        borderColor:'black',
        marginBottom:responsiveScreenHeight(1),
        marginTop:responsiveScreenHeight(2.4)
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
      input1:{
        paddingLeft:10,
        height:50,
        backgroundColor:'white',
        marginTop:5,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        textAlignVertical:'center',
      },
      GetLoc: {
        marginLeft:responsiveScreenWidth(21.5),
        width:responsiveScreenWidth(35),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'orange',
      },
      GetLocText:{
        color:'black',
        fontWeight:'700',
      },
      nextButton: {
        marginLeft:responsiveScreenWidth(42),
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
      resetButton: {
        marginLeft:responsiveScreenWidth(0.5),
        width:responsiveScreenWidth(15),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:responsiveScreenHeight(4),
        marginTop:15,
        backgroundColor:'#F8F4EC',
      },
      resetButtonText:{
        color:'black',
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

export default Userrequest;

  