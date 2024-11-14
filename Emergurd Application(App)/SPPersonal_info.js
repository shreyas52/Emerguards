import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const SPPersonal_info = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [formSection, setFormSection] = useState(1);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [image, setImage] = useState(null);

  const [selectedState, setSelectedState] = useState("Maharashtra");

  const handleNext = () => {
    setFormSection(2);
  };

  const handleBack = () => {
    setFormSection(1);
  };

  const handleSave = async () => {
    try {
      const uploadResponse = await uploadImage(image);
      console.log(uploadResponse.data.filename, uploadResponse.data.path);

      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);

      console.log("handleSave");
      const response1 = await axios.post("http://10.0.2.2:3000/api/profilesp", {
        id: currentUser.id,
        fullName: fullName,
        username: username,
        mobileNo: mobileNo,
        email: email,
        company: company,
        companyaddress: companyAddress,
        city: city,
        pincode: pincode,
        latitude: latitude,
        longitude: longitude,
        licenseNumber: licenseNumber,
        selectedState: selectedState,
        selectedCountry: selectedCountry,
        filename: uploadResponse.data.filename,
      });
      console.log(response1.data);

      Alert.alert(
        "Update Successful",
        `${username}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const uploadImage = async (uri) => {
    let formData = new FormData();
    let filename = uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append("photo", { uri: uri, name: filename, type });

    return axios.post("http://10.0.2.2:3000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);

      fetch(`http://10.0.2.2:3000/api/sp/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // setUser(data);
          const fullName = data.fullName;
          const username = data.username;
          const email = data.email;
          const mobileNo = data.mobileNo;
          const company = data.company;
          const companyAddress = data.companyaddress;
          const city = data.city;
          const pincode = data.pincode;
          const latitude = data.latitude;
          const longitude = data.longitude;
          const licenseNumber = data.licenseNumber;

          const selectedCountry = data.selectedCountry;
          const selectedState = data.selectedState;

          setFullName(fullName);
          setUsername(username);
          setEmail(email);
          setMobileNo(mobileNo);
          setCompany(company);
          setCompanyAddress(companyAddress);
          setCity(city);
          setPincode(pincode);
          setLatitude(latitude);
          setLongitude(longitude);
          setLicenseNumber(licenseNumber);

          setSelectedCountry(selectedCountry);
          setSelectedState(selectedState);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);
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
            <Text style={styles.title}>Guard Info</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodycontainer}>
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

              <View style={styles.username}>
                <Text style={styles.usernametext}>{username}</Text>
              </View>
            </View>
            <Text style={styles.formTitle}>Personal Information</Text>
            <View>
              <View style={styles.personalInfoForm}>
                {/* Full Name */}
                {formSection === 1 && (
                  <View>
                    {/* Full Name */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Full Name:</Text>
                      <TextInput
                        value={fullName}
                        style={styles.input}
                        // Add necessary props for full name field
                      />
                    </View>

                    {/* Email */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Email:</Text>
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        // Add necessary props for email field
                      />
                    </View>

                    {/* Mobile Number */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Mobile Number:</Text>
                      <TextInput
                        value={mobileNo}
                        onChangeText={setMobileNo}
                        style={styles.input}
                        // Add necessary props for mobile number field
                      />
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Company Name:</Text>
                      <TextInput
                        value={company}
                        onChangeText={setCompany}
                        style={styles.input}
                        // Add necessary props for date of birth field
                      />
                    </View>

                    {/* Address */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Address:</Text>
                      <TextInput
                        value={companyAddress}
                        onChangeText={setCompanyAddress}
                        style={styles.input}
                        // Add necessary props for address field
                      />
                    </View>
                    {/* Next button */}
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={handleNext}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {formSection === 2 && (
                  <View>
                    {/* Country */}
                    <View style={styles.picker}>
                      <Text style={styles.selectname}>Select Country:</Text>
                      <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedCountry(itemValue)
                        }
                        itemStyle={{
                          color: "black",
                          fontSize: responsiveFontSize(2),
                        }} // Adjust fontSize as needed
                        dropdownIconColor={"black"}
                      >
                        <Picker.Item
                          label="India"
                          value="India"
                          style={styles.pickerItem}
                        />
                        {/* Add more countries as needed */}
                      </Picker>
                    </View>
                    {/* State */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>State:</Text>
                      <TextInput
                        value={selectedState}
                        onChangeText={setSelectedState}
                        style={styles.input}
                        // Add necessary props for state field
                      />
                    </View>

                    {/* City */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>City:</Text>
                      <TextInput
                        value={city}
                        onChangeText={setCity}
                        style={styles.input}
                        // Add necessary props for city field
                      />
                    </View>

                    {/* Pincode */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Pincode:</Text>
                      <TextInput
                        value={pincode}
                        onChangeText={setPincode}
                        style={styles.input}
                        // Add necessary props for pincode field
                      />
                    </View>

                    {/* Location */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Location:</Text>
                      <TextInput
                        value={latitude + "," + longitude}
                        style={styles.input}
                        // Add necessary props for license number field
                      />
                    </View>

                    {/* License Number */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>License Number:</Text>
                      <TextInput
                        value={licenseNumber}
                        onChangeText={setLicenseNumber}
                        style={styles.input}
                        // Add necessary props for license number field
                      />
                    </View>

                    {/* Upload License Photo */}
                    <TouchableOpacity style={styles.uploadButton}>
                      <Text style={styles.uploadButtonText} onPress={pickImage}>
                        Upload
                      </Text>
                    </TouchableOpacity>

                    {/* Back and Save buttons */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                      >
                        <Text style={styles.backButtonText}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                      >
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
    backgroundColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: responsiveScreenHeight(8),
    justifyContent: "space-between",
    backgroundColor: "#282A3A",
  },
  backicon: {
    marginLeft: responsiveScreenWidth(3),
  },
  titlecontainer: {
    top: responsiveScreenHeight(0),
    marginRight: responsiveScreenWidth(35),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  body: {
    alignItems: "center",
    height: responsiveScreenHeight(100),
  },
  bodycontainer: {
    marginTop: responsiveScreenHeight(2),
    paddingTop: responsiveScreenHeight(6),
    height: responsiveScreenHeight(80),
    width: responsiveScreenWidth(80),
    backgroundColor: "transparent",
  },
  updatePhotoContainer: {
    paddingTop: 10,
    paddingLeft: 12,
    paddingBottom: 10,
    position: "fixed",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: responsiveScreenHeight(-6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveScreenHeight(2),
  },
  profilePhoto: {
    borderColor: "royalblue",
    borderWidth: 5,
    paddingTop: responsiveScreenHeight(0),
    width: 100,
    height: 100,
    borderRadius: responsiveScreenWidth(100),
    marginBottom: responsiveScreenHeight(0),
    marginLeft: responsiveScreenWidth(-2),
    borderRadius: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  updatePhotoIcon: {
    marginLeft: responsiveScreenWidth(-6),
    marginTop: responsiveScreenHeight(6),
    backgroundColor: "#279EFF",
    borderRadius: 50,
    padding: responsiveScreenWidth(2),
  },
  username: {
    marginRight: responsiveScreenWidth(-2),
    marginLeft: responsiveScreenWidth(2),
    alignItems: "center",
    justifyContent: "center",
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(3),
    marginTop: responsiveScreenHeight(8),
    marginBottom: responsiveScreenHeight(0),
    borderRadius: 40,
  },
  usernametext: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  formTitle: {
    color: "white",
    backgroundColor: "black",
    height: responsiveScreenHeight(3),
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    borderRadius: 50,
  },
  personalInfoForm: {
    backgroundColor: "white",
    marginTop: 15,
    paddingBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
  formField: {
    backgroundColor: "white",
  },
  picker: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "blue",
    marginBottom: responsiveScreenHeight(1),
    backgroundColor: "white",
  },
  pickerItem: {
    color: "black",
    fontSize: responsiveFontSize(2),
  },
  uploadButton: {
    marginLeft: responsiveScreenWidth(1),
    width: responsiveScreenWidth(25),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "darkblue",
    borderWidth: 2,
    height: responsiveScreenHeight(4),
    marginTop: 15,
    backgroundColor: "darkblue",
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "600",
  },
  selectname: {
    marginTop: 10,
    color: "black",
    marginLeft: responsiveScreenWidth(2),
    fontWeight: "500",
  },
  label: {
    marginTop: 12,
    color: "black",
    marginLeft: responsiveScreenWidth(1),
    fontWeight: "500",
  },
  input: {
    paddingLeft: 10,
    height: 50,
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  nextButton: {
    marginLeft: responsiveScreenWidth(62),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 15,
    backgroundColor: "#FC6736",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
  },
  backButton: {
    marginLeft: responsiveScreenWidth(0.5),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 15,
    backgroundColor: "#F8F4EC",
  },
  backButtonText: {
    color: "black",
    fontWeight: "600",
  },
  saveButton: {
    marginLeft: responsiveScreenWidth(41),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 15,
    backgroundColor: "green",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  initials: {
    color: "white",
    fontSize: 40,
  },
});

export default SPPersonal_info;
