// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// export default function App() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//             {location ? (
//                         <MapView style={styles.map} 
//                         initialRegion={{
//                           latitude: location.coords.latitude,
//                           longitude: location.coords.longitude,
//                           latitudeDelta: 0.0922,
//                           longitudeDelta: 0.0421,
//                         }}
//                       >
//                       <Marker
//                       coordinate={{
//                           latitude: location.coords.latitude,
//                           longitude: location.coords.longitude,
//                       }}
//                       title="My Location"
//                       />
//                       </MapView>
//             ) : (
//                 <Text>Loading...</Text>
//             )}
//         </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });