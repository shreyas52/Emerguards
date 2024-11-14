import React from "react";
import {View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from "react";
const SPHistory = ({ navigation}) => {
  const [data1, setData1] = useState([]);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const savedUser = await AsyncStorage.getItem("sp");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);  
      setUsername(currentUser.username);
    fetch(`http://10.0.2.2:3000/api/reqhissp1/${currentUser.id}`)
      .then(response => response.json())
      .then(data => setData1(data))
      .catch(error => console.error(error));
    };
    console.log(data1);


    fetchData();
  },[]);

  const getBorderColor = (requestStatus) => {
    switch (requestStatus) {
      case 'Pending':
        return 'red';
      case 'In Progress':
        return 'orange';
      case 'Complete':
        return 'green';
      default:
        return 'black';
    }
  };

  const renderItem = ({ item }) => (
    <View>
    <View style={[styles.view1, { borderColor: getBorderColor(item.status) }]}>
    <Text style={styles.label1}>Request Date :</Text>
    <Text style={styles.value1}>{item.date}</Text>

    <Text style={styles.label1}>Time :</Text>
    <Text style={styles.value1}>{item.time}</Text>

    <Text style={styles.label1}>Address :</Text>
    <Text style={styles.value1}>{item.eaddress}</Text>

    <Text style={styles.label1}>Location Co-ordinate :</Text>
    <Text style={styles.value1}>{item.mlatitude},{item.mlongitude}</Text>

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
    {/* <Image source={{ uri: 'http://10.0.2.2:3000/uploads/4f592a78-00d6-4694-8a42-d33dbe9d433d.jpeg' }} style={{ width: 300, height: 225 }} /> */}
    <Image source={{ uri: `http://10.0.2.2:3000/uploads/${item.filename}`}} style={{ width: 300, height: 225 }} />

    </View>
    </View>
  );

    return (
      
      <View style={[styles.container]}>
      <View style={styles.header}>
        <View style={styles.backicon}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="#007BFF" />
        </TouchableOpacity>
        </View>
        <View style={styles.titlecontainer}>
            <Text style={styles.title}>History</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.pointname}>
        <Text style={styles.point}>Job Completed:</Text>
        </View>
        <View style={styles.HistoryContainer}>
        <ScrollView>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
        </ScrollView>
        </View>
      </View>
      </View>
      
    );
  }

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
    marginRight: responsiveScreenWidth(40),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'white',
  },
  mainContainer: {
    backgroundColor:'lightgrey',
    height: responsiveScreenHeight(77), // Adjust the height as needed
    marginHorizontal: responsiveScreenWidth(5), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(4),
    borderRadius: 5,
    borderWidth: 2,
    borderColor:'#6C22A6',
  },
  pointname:{
    width:responsiveScreenWidth(40),
    marginLeft:responsiveScreenWidth(2),
    marginTop:responsiveScreenHeight(2),
  },
  point:{
    color:'#6C22A6',
    fontWeight:'bold',
    fontSize: responsiveFontSize(2.5),
    marginRight: responsiveScreenHeight(0),
  },
  HistoryContainer: {
    backgroundColor:'white',
    width:responsiveScreenWidth(85),
    height: responsiveScreenHeight(67),
    borderRadius: 5,
    marginHorizontal: responsiveScreenWidth(2), // Adjust the margin as needed
    marginTop: responsiveScreenHeight(2),
  },
  label1: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  value1: {
    color: '#666',
    marginBottom: 10,
  },
  view1: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default SPHistory;
