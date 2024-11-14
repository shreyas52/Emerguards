import React, { useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native';
import * as Location from 'expo-location';

const Reqmap= ({ navigation }) =>{
  const [markerPosition, setMarkerPosition] = useState(null);
  const [location, setLocation] = useState(null);

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    alert(`Marker set at: Latitude ${latitude}, Longitude ${longitude}`);
    console.log(latitude, longitude);
  };

  const handleSubmit = () => {
    if (markerPosition) {
      console.log(markerPosition);
      navigation.navigate('Req1', { mlatitude: markerPosition.latitude, mlongitude: markerPosition.longitude });
    }
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
     {location && (
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
          />
        )}
      </MapView>
       )}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Reqmap;

