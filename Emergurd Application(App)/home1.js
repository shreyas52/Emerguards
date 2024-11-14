import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

import Profile from "./profile1"; // Adjust the path according to your file structure
import axios, { Axios } from "axios";
import { Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import updateprofile from "./updateprofile";

const App = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [newId, setNewId] = useState(null);

  const info = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);

      console.log("info clicked");
      const response2 = await axios.post("http://10.0.2.2:3000/api/info", {
        id: currentUser.id,
      });
      // console.log(response2.data);
      const fullname = response2.data.fullname;
      const username = response2.data.username;
      const password = response2.data.password;
      const birthdate = response2.data.birthdate;
      const mobilenumber = response2.data.mobilenumber;
      const vehicalno = response2.data.vehicalno;
      console.log(
        fullname,
        username,
        password,
        birthdate,
        mobilenumber,
        vehicalno
      );
      setFullName(fullname);
      setUsername(username);
      setPassword(password);
      setBirthDate(birthdate);
      setMobileNumber(mobilenumber);
      setVehicleNo(vehicalno);
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const updateProfile = async () => {
    const savedUser = await AsyncStorage.getItem("radius");
    setNewId(JSON.parse(savedUser));
    console.log(newId);
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setFullName("");
      setUsername("");
      setPassword("");
      setBirthDate("");
      setMobileNumber("");
      setVehicleNo("");
      console.log("logout clicked");

      info();
      // clearImmediate(fullName,username,password,birthDate,mobileNumber,vehicleNo);
      // setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.v1}>
      <ScrollView>
        <Button
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />

        <Button title="logout" onPress={logout} />
        <View style={styles.detailsContainer}>
          <Text>Full Name: {fullName}</Text>
          <Text>Username: {username}</Text>
          <Text>Password: {password}</Text>
          <Text>Birth Date: {birthDate}</Text>
          <Text>Mobile Number: {mobileNumber}</Text>
          <Text>Vehicle Number: {vehicleNo}</Text>
        </View>
        <Button
          title="Update Profile"
          onPress={() => navigation.push("uProfile")}
        />
        <Button title="request" onPress={() => navigation.push("req")} />
        <Button title="map" onPress={() => navigation.push("map2")} />
        <Button title="profile1" onPress={() => navigation.push("Profile1")} />
        <Button title="updateprofile" onPress={updateProfile} />
        <Button title="nsetting" onPress={() => navigation.push("nsetting")} />
        <Button title="nrating" onPress={() => navigation.push("Rate")} />

        <Text> service</Text>
        <Button
          title="SPconnect"
          onPress={() => navigation.push("SPconnect")}
        />
        <Button
          title="SPContact"
          onPress={() => navigation.push("SPContact")}
        />
        <Button
          title="SPHistory"
          onPress={() => navigation.push("SPHistory")}
        />
        <Button
          title="SPProfile"
          onPress={() => navigation.push("SPProfile")}
        />
        <Button title="SPLogout" onPress={() => navigation.push("SPLogout")} />
        <Button
          title="SPmainpage"
          onPress={() => navigation.push("SPmainpage")}
        />
        <Button
          title="SPPersonal_info"
          onPress={() => navigation.push("SPPersonal_info")}
        />
        <Button title="SPSide" onPress={() => navigation.push("SPSide")} />
        <Button
          title="SPSetting"
          onPress={() => navigation.push("SPSetting")}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  v1: {
    flex: 1, //cover the all space on screen
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
export default App;
