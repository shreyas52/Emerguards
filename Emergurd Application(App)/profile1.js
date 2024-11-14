import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert } from "react-native";
import axios, { Axios } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "./App";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
// import { EmojiAngryFill } from "react-bootstrap-icons";

const Profile = ({ isVisible, onClose, navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const [loginUserId, setLoginUserId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleRegisterNumber, setVehicleRegisterNumber] = useState("");

  const handleSignUp = async () => {
    try {
      console.log("signup clicked");
      const response1 = await axios.post("http://10.0.2.2:3000/api/signup", {
        fullname: fullName,
        username: username,
        password: signupPassword,
        birthdate: birthdate,
        mobilenumber: mobileNo,
        vehicalno: vehicleRegisterNumber,
      });
      console.log(response1.data);
      console.log(
        fullName,
        username,
        confirmPassword,
        birthdate,
        mobileNo,
        vehicleRegisterNumber
      );
    } catch (err) {
      console.log("err", err.message);
    }

    Alert.alert("SignUp Sucessful ," + username);

    setFullName("");
    setUsername("");
    setSignupPassword("");
    setConfirmPassword("");
    setBirthdate("");
    setMobileNo("");
    setVehicleRegisterNumber("");
  };

  const login = async () => {
    try {
      console.log("Login clicked1");
      const response = await axios.post("http://10.0.2.2:3000/api/login", {
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
        Alert.alert("User not found");
      } else if (response.data == "password did not match") {
        Alert.alert("password did not match");
      } else {
        Alert.alert("login complete ,Welcome " + loginUserId);
        await AsyncStorage.setItem("user", JSON.stringify(value));

        navigation.navigate("Home", { loginUserId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <LinearGradient colors={["#068FFF", "#0A1C5A"]} style={styles.header}>
          <View style={styles.closebutton}>
            <TouchableOpacity onPress={() => navigation.push("Home")}>
              <Ionicons name="ios-close" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        </LinearGradient>
        {isLogin ? (
          <View style={styles.form}>
            {/* Login Form */}
            <TextInput
              style={styles.input}
              placeholder="User ID / Mobile Number"
              onChangeText={(text) => setLoginUserId(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setLoginPassword(text)}
            />
            <Button title="Login" onPress={login} />
            <TouchableOpacity onPress={toggleForm}>
              <Text style={styles.toggleButton}>
                {isLogin ? "Switch to Sign Up" : "Switch to Login"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            {/* Sign Up Form */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={(e) => setFullName(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(e) => setUsername(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(e) => setSignupPassword(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(e) => setConfirmPassword(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Birthdate"
              onChangeText={(e) => setBirthdate(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              onChangeText={(e) => setMobileNo(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Vehicle Register Number"
              onChangeText={(e) => setVehicleRegisterNumber(e)}
            />
            <Button title="Sign Up" onPress={handleSignUp} />

            <TouchableOpacity onPress={toggleForm}>
              <Text style={styles.toggleButton}>
                {isLogin ? "Switch to Sign Up" : "Switch to Login"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  closebutton: {
    position: "absolute",
    top: 15,
    right: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    padding: 16,
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#279EFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  toggleButton: {
    color: "#279EFF",
    marginTop: 16,
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Profile;
