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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const SPconnect = ({ navigation, isVisible, onClose }) => {
  const [formSection, setFormSection] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [formType, setFormType] = useState("register");

  const [loginUserId, setLoginUserId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  const [filename, setfilename] = useState(null);
  const [filename1, setfilename1] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("Maharashtra");

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "register" ? "login" : "register"));
  };
  const handleStateChange = (itemValue, itemIndex) => {
    setSelectedState(itemValue);
  };
  const indiaStates = [
    { label: "Andaman & Nicobar", value: "Andaman & Nicobar" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Dadra & Nagar Haveli", value: "Dadra & Nagar Haveli" },
    { label: "Daman & Diu", value: "Daman & Diu" },
    { label: "Delhi", value: "Delhi" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu & Kashmir", value: "Jammu & Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Ladakh", value: "Ladakh" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Puducherry", value: "Puducherry" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "West Bengal", value: "West Bengal" },
    // Add more states and union territories as needed
  ];
  const handleNext = () => {
    const totalSection = 3;
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

  const handleSave = async () => {
    try {
      const uploadResponse = await uploadImage(filename);
      console.log(uploadResponse.data.filename, uploadResponse.data.path);

      const uploadResponse1 = await uploadImage(filename1);
      console.log(uploadResponse.data.filename, uploadResponse.data.path);

      console.log("signup clicked");
      const responsesp = await axios.post("http://10.0.2.2:3000/api/signupsp", {
        fullName: fullName,
        username: username,
        password: confirmPassword,
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
      console.log(responsesp.data);
      console.log(fullName);
    } catch (err) {
      console.log("err", err.message);
    }

    Alert.alert(
      "SignUp Successful",
      `Welcome, ${username}!`,
      [
        {
          text: "OK",
          style: "default",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      {
        cancelable: false,
        // You can add more options here to customize the appearance
      }
    );

    setFullName("");
    setUsername("");
    setSignupPassword("");
    setConfirmPassword("");
    setMobileNo("");
    setEmail("");
    setCompany("");
    setCompanyAddress("");
    setCity("");
    setPincode("");
    setLatitude("");
    setLongitude("");
    setLicenseNumber("");
  };
  const handleReset = () => {
    // Implement reset logic here
    setFullName("");
    setPassword("");
  };
  const uploadImage = async (uri) => {
    if (!uri) {
      throw new Error("Invalid URI");
    }

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
      setfilename(asset.uri);
      // uploadImage(asset.uri);
    }
  };
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let asset = result.assets[0];
      setfilename1(asset.uri);
      // uploadImage(asset.uri);
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Login clicked sp");
      const response = await axios.post("http://10.0.2.2:3000/api/loginsp", {
        username: loginUserId,
        password: loginPassword,
      });
      console.log(response.data.fullname, response.data.id);
      // console.log(loginUserId,loginPassword);
      const value = {
        username: loginUserId,
        id: response.data.id,
      };
      // console.log(password);
      // console.log(response.data.error);
      if (response.data == "User not found") {
        Alert.alert(
          "User not found",
          "",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => console.log("OK pressed"),
            },
          ],
          {
            cancelable: false,
            titleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#007BFF",
            },
            messageStyle: {
              fontSize: 16,
              color: "#333",
            },
            containerStyle: {
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
            },
            buttonTextStyle: {
              color: "#007BFF",
            },
          }
        );
      } else if (response.data == "password did not match") {
        Alert.alert(
          "Password did not match",
          "",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => console.log("OK pressed"),
            },
          ],
          {
            cancelable: false,
            titleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#007BFF",
            },
            messageStyle: {
              fontSize: 16,
              color: "#333",
            },
            containerStyle: {
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
            },
            buttonTextStyle: {
              color: "#007BFF",
            },
          }
        );
      } else if (response.data.status == "Not Verified") {
        Alert.alert(
          "Account not verified",
          "Please wait some time for verification...",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => console.log("OK pressed"),
            },
          ],
          {
            cancelable: false,
            titleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#007BFF",
            },
            messageStyle: {
              fontSize: 16,
              color: "#333",
            },
            containerStyle: {
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
            },
            buttonTextStyle: {
              color: "#007BFF",
            },
          }
        );
      } else if (response.data.status == "Denied") {
        Alert.alert(
          "Access Denied",
          "",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => console.log("OK pressed"),
            },
          ],
          {
            cancelable: false,
            titleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#007BFF",
            },
            messageStyle: {
              fontSize: 16,
              color: "#333",
            },
            containerStyle: {
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
            },
            buttonTextStyle: {
              color: "#007BFF",
            },
          }
        );
      } else {
        Alert.alert(
          "Login Complete",
          "Welcome " + loginUserId,
          [
            {
              text: "OK",
              style: "default",
              onPress: () => console.log("OK pressed"),
            },
          ],
          {
            cancelable: false,
            titleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#007BFF",
            },
            messageStyle: {
              fontSize: 16,
              color: "#333",
            },
            containerStyle: {
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
            },
            buttonTextStyle: {
              color: "#007BFF",
            },
          }
        );
        await AsyncStorage.setItem("sp", JSON.stringify(value));

        navigation.navigate("SPmainpage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    setLatitude(latitude);
    setLongitude(longitude);
    console.log(latitude, longitude);
  };

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
            <Text style={styles.title}>Guard Form</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodycontainer}>
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={
                  formType === "login"
                    ? styles.switcherContainer
                    : styles.switcherContainerInactive
                }
                onPress={() => setFormType("login")}
              >
                <View style={styles.Login}>
                  <Text
                    style={
                      formType === "login"
                        ? styles.switchertext
                        : styles.switchertextInactive
                    }
                  >
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  formType === "register"
                    ? styles.switcherContainer1
                    : styles.switcherContainerInactive
                }
                onPress={() => setFormType("register")}
              >
                <View style={styles.Register}>
                  <Text
                    style={
                      formType === "register"
                        ? styles.switchertext
                        : styles.switchertextInactive
                    }
                  >
                    Register
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View> */}
            {formType === "register" && (
              <View>
                <Text style={styles.formTitle}>Registration</Text>
                <View style={styles.personalInfoForm}>
                  {/* Full Name */}
                  {formSection === 1 && (
                    <View>
                      {/* Full Name */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Full Name:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Full Name"
                          onChangeText={(e) => setFullName(e)}
                        />
                      </View>

                      {/* Username */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Username:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Username"
                          onChangeText={(e) => setUsername(e)}
                        />
                      </View>

                      {/* Password */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Password:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          secureTextEntry
                          onChangeText={(e) => setSignupPassword(e)}
                        />
                      </View>

                      {/* confirm Password */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Confirm Password:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm Password"
                          secureTextEntry
                          onChangeText={(e) => setConfirmPassword(e)}
                        />
                      </View>

                      {/* Email */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Email"
                          secureTextEntry
                          onChangeText={(e) => setEmail(e)}
                        />
                      </View>

                      {/* Mobile Number */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Mobile Number:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Mobile Number"
                          onChangeText={(e) => setMobileNo(e)}
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
                      {/* Shop */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Company Name:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Company Name"
                          onChangeText={(e) => setCompany(e)}
                        />
                      </View>
                      {/* Address */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Company Address:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Company Address"
                          onChangeText={(e) => setCompanyAddress(e)}
                        />
                      </View>
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
                      <View style={styles.picker}>
                        <Text style={styles.selectname}>Select State:</Text>
                        <Picker
                          selectedValue={selectedState}
                          onValueChange={handleStateChange}
                          itemStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(2),
                          }} // Adjust fontSize as needed
                          dropdownIconColor={"black"}
                        >
                          {indiaStates.map((state, index) => (
                            <Picker.Item
                              key={index}
                              label={state.label}
                              value={state.value}
                              style={styles.pickerItem}
                            />
                          ))}
                        </Picker>
                      </View>

                      {/* City */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>City:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="City"
                          onChangeText={(e) => setCity(e)}
                        />
                      </View>

                      {/* Back and Save buttons */}
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.backButton}
                          onPress={handleBack}
                        >
                          <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.nextButton1}
                          onPress={handleNext}
                        >
                          <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {formSection === 3 && (
                    <View>
                      {/* Pincode */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Pincode:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Pincode"
                          onChangeText={(e) => setPincode(e)}
                        />
                      </View>
                      {/* Location Coordinates */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>Location Coordinates:</Text>
                        <TextInput
                          style={styles.input}
                          value={latitude + "," + longitude}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={getLocation}
                      >
                        <Text style={styles.uploadButtonText}>Location</Text>
                      </TouchableOpacity>

                      {/* Upload Shop Documents */}
                      {/* <Text style={styles.label}>Upload Shop Documents:</Text>
                      <TouchableOpacity style={styles.uploadButton}>
                        <Text
                          style={styles.uploadButtonText}
                          onPress={pickImage1}
                        >
                          Upload
                        </Text>
                      </TouchableOpacity> */}

                      {/* License Number */}
                      <View style={styles.formField}>
                        <Text style={styles.label}>License Number:</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="License Number"
                          onChangeText={(e) => setLicenseNumber(e)}
                        />
                      </View>

                      {/* Upload License Photo */}
                      <Text style={styles.label}>Upload License:</Text>
                      <TouchableOpacity style={styles.uploadButton}>
                        <Text
                          style={styles.uploadButtonText}
                          onPress={pickImage}
                        >
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
            )}
            {formType === "login" && (
              <View>
                <Text style={styles.formTitle}>Login</Text>
                <View style={styles.personalInfoForm}>
                  {/* Full Name */}
                  <View>
                    {/* username*/}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Username:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={(text) => setLoginUserId(text)}
                      />
                    </View>

                    {/* Password */}
                    <View style={styles.formField}>
                      <Text style={styles.label}>Password:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setLoginPassword(text)}
                      />
                    </View>

                    {/* Back and Save buttons */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleReset}
                      >
                        <Text style={styles.resetButtonText}>Reset</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                      >
                        <Text style={styles.loginButtonText}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* </View> */}
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
    marginRight: responsiveScreenWidth(32),
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
  switchContainer: {
    height: responsiveScreenHeight(7),
    flexDirection: "row",
    position: "fixed",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
    marginTop: responsiveScreenHeight(-6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveScreenHeight(2),
  },
  switcherContainer: {
    marginRight: responsiveScreenWidth(1),
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(37),
    position: "fixed",
    backgroundColor: "#EFECEC",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6C22A6",
    justifyContent: "center",
    alignItems: "center",
  },
  switcherContainer1: {
    marginLeft: responsiveScreenWidth(1),
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(37),
    position: "fixed",
    backgroundColor: "#EFECEC",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6C22A6",
    justifyContent: "center",
    alignItems: "center",
  },
  switcherContainerInactive: {
    marginLeft: responsiveScreenWidth(1),
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(37),
    position: "fixed",
    backgroundColor: "#6C22A6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Login: {
    alignItems: "center",
    borderRadius: 1,
  },
  Register: {
    alignItems: "center",
    borderRadius: 1,
  },
  switchertext: {
    color: "#6C22A6",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
  },
  switchertextInactive: {
    color: "white",
    fontSize: responsiveFontSize(2.2),
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
    borderRadius: 5,
  },
  personalInfoForm: {
    backgroundColor: "white",
    marginTop: 25,
    paddingBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
  formField: {
    backgroundColor: "white",
  },
  picker: {
    marginTop: 15,
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
    marginTop: 8,
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
    marginTop: 25,
    backgroundColor: "#FC6736",
  },
  nextButton1: {
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 25,
    backgroundColor: "#FC6736",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
  },
  backButton: {
    marginRight: responsiveScreenWidth(44),
    marginLeft: responsiveScreenWidth(0.5),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 25,
    backgroundColor: "#F8F4EC",
  },
  backButtonText: {
    color: "black",
    fontWeight: "600",
  },
  saveButton: {
    marginLeft: responsiveScreenWidth(2),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 25,
    backgroundColor: "green",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  resetButton: {
    marginRight: responsiveScreenWidth(44),
    marginLeft: responsiveScreenWidth(0.5),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 25,
    backgroundColor: "#F8F4EC",
  },
  resetButtonText: {
    color: "black",
    fontWeight: "600",
  },
  loginButton: {
    marginLeft: responsiveScreenWidth(2),
    width: responsiveScreenWidth(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: responsiveScreenHeight(4),
    marginTop: 25,
    backgroundColor: "green",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SPconnect;
