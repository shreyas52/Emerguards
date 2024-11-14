import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { set } from "mongoose";
const RecentEvents = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [data1, setData1] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setUsername(currentUser.username);
      fetch(`http://10.0.2.2:3000/api/reqhis/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setData1(data))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const getBorderColor = (requestStatus) => {
    switch (requestStatus) {
      case "Pending":
        return "red";
      case "In Progress":
        return "orange";
      case "Complete":
        return "green";
      default:
        return "black";
    }
  };
  const renderItem = ({ item }) => (
    <View>
      <View
        style={[styles.view1, { borderColor: getBorderColor(item.status) }]}
      >
        <Text style={styles.label1}>Request Date And Time :</Text>
        <Text style={styles.value1}>{item.date}</Text>

        <Text style={styles.label1}>Time :</Text>
        <Text style={styles.value1}>{item.time}</Text>

        <Text style={styles.label1}>Address :</Text>
        <Text style={styles.value1}>{item.eaddress}</Text>

        <Text style={styles.label1}>Location Co-ordinate :</Text>
        <Text style={styles.value1}>
          {item.latitude},{item.longitude}
        </Text>

        <Text style={styles.label1}>Request Type :</Text>
        <Text style={styles.value1}>{item.selectServiceType}</Text>

        {/* <Text style={styles.label1}>Description :</Text>
      <Text style={styles.value1}>{item.issue}</Text> */}

        <Text style={styles.label1}>Issue In Detail :</Text>
        <Text style={styles.value1}>{item.issue}</Text>

        <Text style={styles.label1}>Service Provider Name :</Text>
        <Text style={styles.value1}>{item.serviceprovider}</Text>

        {/* <Text style={styles.label1}>Cost :</Text>
        <Text style={styles.value1}>{item.cost}</Text> */}

        <Text style={styles.label1}>Request Status :</Text>
        <Text style={styles.value1}>{item.status}</Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: `http://10.0.2.2:3000/uploads/${item.filename}` }}
            style={{
              width: 300,
              height: 225,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
      </View>
    </View>
  );

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
            <Text style={styles.title}>Recent Events</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodycontainer}>
            <View style={styles.updatePhotoContainer}>
              <Image style={styles.profilePhoto} />
              <TouchableOpacity>
                <Ionicons
                  style={styles.updatePhotoIcon}
                  name="ios-camera"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <View style={styles.username}>
                <Text style={styles.usernametext}>{username}</Text>
              </View>
            </View>
            <Text style={styles.formTitle}>Recent Events</Text>
            <View style={styles.personalInfoForm}>
              <ScrollView>
                <View>
                  <Text style={styles.title1}>Request History</Text>
                  <FlatList
                    data={data1}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                  />
                </View>
                <View style={{ marginTop: 20 }}></View>
                <View style={{ marginTop: 20 }}></View>
                <View style={{ marginTop: 20 }}></View>
                <View style={{ marginTop: 20 }}></View>
                <View style={{ marginTop: 20 }}></View>
                <View style={{ marginTop: 20 }}></View>
                {/* Next button */}
              </ScrollView>
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
    marginRight: responsiveScreenWidth(32),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    color: "white",
  },
  title1: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
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
    paddingBottom: 30,
    padding: 5,
    borderRadius: 10,
  },
  formField: {
    backgroundColor: "white",
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
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    fontSize: 16,
  },
  // view1:{
  //   borderRadius:10,
  //   borderWidth:4,
  //   marginBottom:responsiveScreenHeight(2.4),
  //   marginTop:responsiveScreenHeight(2.4),
  //   marginHorizontal:responsiveScreenWidth(3.5),
  // },
  // label1:{
  //   marginTop:5,
  //   color:'black',
  //   marginLeft:responsiveScreenWidth(1),
  //   fontWeight:'500',
  //   marginHorizontal:responsiveScreenWidth(2),
  // },

  view1: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  label1: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 1,
  },
  value1: {
    color: "#666",
    marginBottom: 10,
  },
  image: {
    width: 200, // Or whatever width you want
    height: 200, // Or whatever height you want
  },
});

export default RecentEvents;
