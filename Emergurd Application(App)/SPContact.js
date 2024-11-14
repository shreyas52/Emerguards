import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
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
import axios from "axios";
const SPContact = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("http://10.0.2.2:3000/api/contactus", {
      name: name,
      email: email,
      message: message,
    });
    console.log(response.data);
    if (response.data === "success") {
      Alert.alert(
        "Message Sent Successfully",
        "Your message has been sent successfully.",
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
          // For example, you can set the color of the buttons using the `color` property
          color: "#FF0000",
        }
      );
    } else {
      Alert.alert(
        "Message Not Sent",
        "Sorry, there was an error sending your message.",
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
          // For example, you can set the color of the buttons using the `color` property
          color: "#FF0000",
        }
      );
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <View style={styles.backicon}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={25} color="#007BFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Contact Us</Text>
        </View>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Email"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          onChangeText={setMessage}
          multiline
        />
        <View style={styles.Button}>
          <TouchableOpacity>
            <Button
              color={"#FE0000"}
              style={styles.clearButton}
              title="Clear"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              color={"#068FFF"}
              style={styles.submitButton}
              title="Submit"
              onPress={handleSubmit}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contactfield}>
          <View style={styles.address}>
            {/* <Image source={require("./assets/map.png")}
            style={styles.addressimage}
            /> */}
            <Text style={styles.addresstext}>: A/P Devrukh, Kanjiwara</Text>
          </View>
          <View style={styles.contact}>
            <Image
              // source={require("./assets/contact1.png")}
              style={styles.contactimage}
            />
            <Text style={styles.contacttext}>: +91 7507475803</Text>
          </View>
          <View style={styles.mail}>
            {/* <Image
            source={require("./assets/gmail.png")}
            style={styles.mailimage}
            /> */}
            <Text
              style={styles.mailtext}
              onPress={() => {
                Linking.openURL("https://emergaurd07@gmail.com");
              }}
            >
              : emergaurd07@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    width: responsiveScreenWidth(80),
    margin: responsiveScreenWidth(10),
  },
  input: {
    paddingLeft: responsiveScreenWidth(4),
    alignContent: "center",
    width: responsiveScreenWidth(70),
    height: responsiveScreenHeight(5),
    borderColor: "gray",
    borderWidth: responsiveScreenWidth(0.5),
    borderRadius: 7,
    marginTop: responsiveScreenHeight(3),
  },
  messageInput: {
    paddingBottom: responsiveScreenHeight(9),
    paddingLeft: responsiveScreenWidth(4),
    justifyContent: "center",
    alignContent: "center",
    height: responsiveScreenHeight(15),
    borderColor: "gray",
    borderWidth: responsiveScreenWidth(0.5),
    marginTop: responsiveScreenHeight(3),
    width: responsiveScreenWidth(70),
    borderRadius: 7,
  },
  Button: {
    marginTop: responsiveScreenHeight(2),
    flexDirection: "row",
    backgroundolor: "gray",
    justifyContent: "space-between",
    width: responsiveScreenWidth(40),
  },
  submitButton: {
    paddingHorizontal: responsiveScreenWidth(8),
    borderRadius: 7,
    marginTop: responsiveScreenHeight(2),
  },
  clearButton: {
    paddingHorizontal: responsiveScreenWidth(8),
    borderRadius: 7,
    marginTop: responsiveScreenHeight(2),
  },
  contactfield: {
    backgroundColor: "#D0D4CA",
    width: responsiveScreenWidth(100),
    marginTop: responsiveScreenHeight(19),
    height: responsiveScreenHeight(19),
    marginBottom: responsiveScreenHeight(0),
  },
  address: {
    marginLeft: responsiveScreenWidth(20),
    flexDirection: "row",
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(60),
    height: responsiveScreenHeight(6),
  },
  addressimage: {
    marginTop: responsiveScreenHeight(0),
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(9),
  },
  addresstext: {
    paddingLeft: responsiveScreenWidth(3),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveScreenHeight(2),
    textAlign: "center",
  },
  contact: {
    marginHorizontal: responsiveScreenWidth(23.5),
    flexDirection: "row",
    marginTop: responsiveScreenHeight(0),
    width: responsiveScreenWidth(60),
    height: responsiveScreenHeight(6),
  },
  contactimage: {
    marginTop: responsiveScreenHeight(1.2),
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(9),
  },
  contacttext: {
    paddingLeft: responsiveScreenWidth(3),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveScreenHeight(2),
    textAlign: "center",
  },
  mail: {
    marginHorizontal: responsiveScreenWidth(18.5),
    flexDirection: "row",
    marginTop: responsiveScreenHeight(0),
    width: responsiveScreenWidth(60),
    height: responsiveScreenHeight(6),
  },
  mailimage: {
    marginTop: responsiveScreenHeight(1),
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(8.5),
  },
  mailtext: {
    paddingLeft: responsiveScreenWidth(3),
    fontSize: responsiveFontSize(2),
    marginTop: responsiveScreenHeight(2),
    textAlign: "center",
  },
});

export default SPContact;
