import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Rate = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRate = (selectedRating) => {
    console.log(selectedRating);
    if (rating === selectedRating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
  };
  const submitRating = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(savedUser);
    console.log(currentUser);
    const response1 = await axios.post("http://10.0.2.2:3000/api/rate", {
      id: currentUser.id,
      username: currentUser.username,
      rating: rating,
      message: message,
    });
    if (response1.data === "success") {
      Alert.alert(
        "Rating Submitted",
        " Thank You For Support.",
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
    console.log(response1.data);
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
          <Text style={styles.title}>Rate Us</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Thank you for using our Roadway Assistance app. Please rate your
          experience:
        </Text>
      </View>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.starButton,
              rating >= index ? styles.selectedStar : null,
            ]}
            onPress={() => handleRate(index)}
          >
            <View style={styles.starOutline}>
              <Animatable.View animation="bounceIn" duration={500}>
                <Icon
                  name="star"
                  size={40}
                  color={rating >= index ? "#FFC436" : "grey"}
                />
              </Animatable.View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <TextInput
          placeholder="Enter Suggestion"
          onChangeText={setMessage}
          style={styles.messageInput}
        />
        <View style={{ marginTop: 20 }}></View>

        <Button title="Submit" onPress={submitRating} />
        <View style={{ marginTop: 300 }}></View>
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
    marginRight: responsiveScreenWidth(40),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    color: "#333",
  },
  starContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: responsiveScreenHeight(2),
    width: responsiveScreenWidth(90), // 90% of screen width
    height: responsiveScreenHeight(30),
  },
  starButton: {
    marginBottom: responsiveScreenHeight(70),
    marginHorizontal: responsiveScreenWidth(2),
    borderWidth: responsiveScreenWidth(0),
    padding: responsiveScreenHeight(2),
    borderColor: "black",
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderColor: "black",
  },
  selectedStar: {
    borderColor: "white",
    borderColor: "black",
    borderWidth: 0,
  },
  starOutline: {
    position: "absolute",
    Outlined: "black",
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
});

export default Rate;
