import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch, ScrollView } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const SPSetting = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [preferredRadius, setPreferredRadius] = useState(''); // Default preferred radius in miles
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [serviceType, setServiceType] = useState('Towing'); // Default service type
  const [profileName, setProfileName] = useState('User');

  // Function to toggle notification settings
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Function to toggle location settings
  const toggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };

  // Function to save preferred search radius
  const saveRadius = async() => {
    await AsyncStorage.setItem("radius", JSON.stringify(preferredRadius));
    console.log("Radius saved: " + preferredRadius);
    // Validate and save the preferred search radius
    // You can implement server communication or app-specific logic here
  };

  // Function to save emergency contact
  const saveEmergencyContact = () => {
    // Validate and save the emergency contact
    // You can implement server communication or app-specific logic here
  };

  // Function to update user profile
  const updateProfile = () => {
    // Validate and update user profile information
    // You can implement server communication or app-specific logic here
  };

  // Function to change app theme
  const changeAppTheme = (theme) => {
    setAppTheme(theme);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Personalization Settings</Text>

      {/* Notifications Setting */}
      <View style={styles.setting}>
        <Text>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Location Setting */}
      <View style={styles.setting}>
        <Text>Enable Location</Text>
        <Switch
          value={locationEnabled}
          onValueChange={toggleLocation}
        />
      </View>

      {/* Preferred Search Radius Setting */}
      <Text style={styles.subheading}>Preferred Search Radius (in KMs)</Text>
      <Picker
        selectedValue={preferredRadius}
        style={styles.input1}
        onValueChange={(itemValue) => setPreferredRadius(itemValue)}
      >
        <Picker.Item label="Select Radius" />
        <Picker.Item label="1 KM" value="1000" />
        <Picker.Item label="3 KM" value="3000" />
        <Picker.Item label="5 KM" value="5000" />
      </Picker>
      <Button title="Save Map Radius" onPress={saveRadius} />
      <Text>Current Radius: {preferredRadius} M</Text>
      {/* Dark Mode Setting */}
      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
        />
      </View>

      {/* Emergency Contact Setting */}
      <Text style={styles.subheading}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact info"
        value={emergencyContact}
        onChangeText={(text) => setEmergencyContact(text)}
      />
      <Button title="Save Contact" onPress={saveEmergencyContact} />

      {/* User Profile Settings */}
      {/* <Text style={styles.subheading}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={profileName}
        onChangeText={(text) => setProfileName(text)}
      />
      <Button title="Update Profile" onPress={updateProfile} /> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input1: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SPSetting;
