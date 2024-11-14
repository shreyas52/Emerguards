import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import SPSide from "./SPSide";
import SPLogout from "./SPLogout";
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import prompt from "react-native-prompt-android";

const SPmainpage = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [cost, setCost] = useState("");

  const [username, setUsername] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [] = useFonts({
    // 'Galeextra-bold': require('./assets/fonts/Galeextra-bold.otf'),
  });
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [mainType, setmainType] = useState("trackrequest");
  const toggleFormType = () => {
    setmainType((prevType) =>
      prevType === "trackrequest" ? "acceptedtask" : "trackrequest"
    );
  };
  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const containerStyle =
    theme === "dark" ? styles.darkContainer : styles.lightContainer;
  const textStyle = theme === "dark" ? styles.darkText : styles.lightText;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const accept = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      // setUsername(currentUser.username);
      console.log(selectedId);
      const response1 = await axios.post("http://10.0.2.2:3000/api/reqacp", {
        id: currentUser.id,
        username: currentUser.username,
        reqid: selectedId,
      });

      console.log(response1.data);
    } catch (error) {}
    Alert.alert(
      "Request Accepted",
      `Selected ID: ${selectedId}`,
      [
        {
          text: "OK",
          style: "default",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      {
        cancelable: false,
        titleStyle: { color: "#000000", fontWeight: "bold" },
        containerStyle: { backgroundColor: "#FFFFFF" },
        contentContainerStyle: { backgroundColor: "#FFFFFF" },
        buttonStyle: { backgroundColor: "#FF0000" },
        buttonTextStyle: { color: "#FFFFFF" },
      }
    );
  };

  const complete = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      // setUsername(currentUser.username);
      console.log(selectedId);
      const response1 = await axios.post("http://10.0.2.2:3000/api/reqcomp", {
        cost: "x",
        reqid: selectedId,
        sid: currentUser.id,
        username: currentUser.username,
      });

      console.log(response1.data);
    } catch (error) {}
    // setmainType('trackrequest')
  };

  useEffect(() => {
    const fetchData = async () => {
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setUsername(currentUser.username);
      fetch(`http://10.0.2.2:3000/api/reqhissp2/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setData1(data))
        .catch((error) => console.error(error));
    };

    const fetchData2 = async () => {
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setUsername(currentUser.username);
      fetch(`http://10.0.2.2:3000/api/reqhissp3/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setData2(data))
        .catch((error) => console.error(error));
    };

    fetchData();
    fetchData2();
  }, [mainType]);

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
        <TouchableOpacity
          onPress={() => {
            setSelectedId(item._id);
            Alert.alert(
              "Selected Item",
              `Selected item id: ${item._id}`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }}
          style={{
            backgroundColor: item._id === selectedId ? "orange" : "white",
          }}
        >
          <Text style={styles.label1}>Request Date :</Text>
          <Text style={styles.value1}>{item.date}</Text>

          <Text style={styles.label1}>Time :</Text>
          <Text style={styles.value1}>{item.time}</Text>

          <Text style={styles.label1}>Address :</Text>
          <Text style={styles.value1}>{item.eaddress}</Text>

          <Text style={styles.label1}>Location Co-ordinate :</Text>
          <Text style={styles.value1}>
            {item.mlatitude},{item.mlongitude}
          </Text>

          <Text style={styles.label1}>Request Type :</Text>
          <Text style={styles.value1}>{item.selectServiceType}</Text>

          {/* <Text style={styles.label1}>Description :</Text>
    <Text style={styles.value1}>{item.issue}</Text> */}

          <Text style={styles.label1}>Issue In Detail :</Text>
          <Text style={styles.value1}>{item.issue}</Text>

          <Text style={styles.label1}>Service Provider Name :</Text>
          <Text style={styles.value1}>{item.serviceprovider}</Text>

          <Text style={styles.label1}>Cost :</Text>
          <Text style={styles.value1}>{item.cost}</Text>

          <Text style={styles.label1}>Request Status :</Text>
          <Text style={styles.value1}>{item.status}</Text>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: `http://10.0.2.2:3000/uploads/${item.filename}` }}
              style={{ width: 300, height: 225 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.sidebaricon}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="ios-menu" size={32} color="#279EFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.logoShadow}>
            {/* <Image
              source={require('./assets/projectlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            /> */}
          </View>
        </View>
        <View style={styles.profileicon}>
          <TouchableOpacity onPress={toggleLogoutModal}>
            <Ionicons name="ios-person" size={24} color="#279EFF" />
          </TouchableOpacity>
        </View>
        <SPLogout
          isVisible={isLogoutModalOpen}
          onClose={toggleLogoutModal}
          navigation={navigation}
        />
      </View>
      {mainType === "trackrequest" && (
        <View style={styles.mainContainer}>
          <View style={styles.titlename}>
            <Text style={styles.title}>Track Request</Text>
          </View>
          <View style={styles.RequestContainer}>
            <ScrollView>
              <FlatList
                data={data1}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
            </ScrollView>
          </View>
          {/* <View style={styles.titlename}>
        <Text style={styles.title}>Accepted Task</Text>
        </View>
        <View style={styles.RecentContainer}>

        </View> */}
          <View style={styles.ButtonContainer}>
            <View style={styles.ButtonRow}>
              <TouchableOpacity
                style={styles.Button1}
                onPress={() => setmainType("acceptedtask")}
              >
                <View>
                  <Text style={styles.Buttontext}>Accepted Task</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Button2} onPress={accept}>
                <View style={mainType === "acceptedtask"}>
                  <Text style={styles.Buttontext}>Accept</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {mainType === "acceptedtask" && (
        <View style={styles.mainContainer}>
          <View style={styles.titlename}>
            <Text style={styles.title}>Accepted Task</Text>
          </View>

          <View style={styles.RequestContainer}>
            <ScrollView>
              <FlatList
                data={data2}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
            </ScrollView>
          </View>

          <View style={styles.ButtonContainer}>
            <View style={styles.ButtonRow}>
              <TouchableOpacity
                style={styles.Button1}
                onPress={() => setmainType("trackrequest")}
              >
                <View>
                  <Text style={styles.Buttontext}>Track Request</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Button2} onPress={complete}>
                <View style={mainType === "trackrequest"}>
                  <Text style={styles.Buttontext}>Task Completed</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {isSidebarOpen && (
        <SPSide
          theme={theme} // Pass the theme to the Sidebar component
          toggleTheme={toggleTheme} // Pass the toggleTheme function to the Sidebar component
          closeSidebar={closeSidebar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
  },
  darkTheme: {
    backgroundColor: "#404258",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: responsiveScreenHeight(1),
    height: responsiveScreenHeight(8),
    justifyContent: "center",
    backgroundColor: "#282A3A",
  },
  sidebaricon: {
    marginRight: responsiveScreenWidth(25),
  },
  profileicon: {
    marginLeft: responsiveScreenWidth(29),
  },
  logoContainer: {
    alignItems: "cover",
  },
  logo: {
    width: responsiveScreenWidth(25),
  },
  mainContainer: {
    backgroundColor: "lightgrey",
    height: responsiveScreenHeight(77), // Adjust the height as needed
    marginHorizontal: responsiveScreenWidth(5), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(4),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#6C22A6",
  },
  titlename: {
    width: responsiveScreenWidth(40),
    marginLeft: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2),
  },
  title: {
    color: "#6C22A6",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.5),
    marginRight: responsiveScreenHeight(0),
  },
  RequestContainer: {
    backgroundColor: "white",
    width: responsiveScreenWidth(85),
    height: responsiveScreenHeight(59),
    borderRadius: 5,
    marginHorizontal: responsiveScreenWidth(2), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(2),
  },
  RecentContainer: {
    backgroundColor: "blue",
    width: responsiveScreenWidth(85),
    height: responsiveScreenHeight(20),
    borderRadius: 5,
    marginHorizontal: responsiveScreenWidth(2.5), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(1),
  },
  ButtonContainer: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(25),
    position: "absolute",
    marginTop: responsiveScreenHeight(68),
  },
  ButtonRow: {
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: responsiveScreenWidth(0),
    width: responsiveScreenWidth(90),
  },
  Button1: {
    flexDirection: "column",
    marginRight: responsiveScreenWidth(2),
    backgroundColor: "red",
    borderRadius: 8,
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(6),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 3.2,
    shadowRadius: 8,
    elevation: 5,
  },
  Button2: {
    flexDirection: "column",
    marginLeft: responsiveScreenWidth(2),
    backgroundColor: "green",
    borderRadius: 8,
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(6),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 3.2,
    shadowRadius: 8,
    elevation: 5,
  },
  Buttonicon: {
    marginRight: responsiveScreenHeight(0),
    height: responsiveScreenHeight(7),
    width: responsiveScreenWidth(13),
  },
  Buttontext: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: responsiveFontSize(1.8),
  },
  label1: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  value1: {
    color: "#666",
    marginBottom: 10,
  },
  view1: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
});

export default SPmainpage;
