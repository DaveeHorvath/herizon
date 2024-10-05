import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Waiting_Driver_Screen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      fetch('http://10.18.200.69:3000/location/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 5,
          lat: location.coords.latitude,
          lon: location.coords.longitude
        }),
      });
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}
        customMapStyle={[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]}
        >

          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            >
              <Image
                source={require('@/assets/images/user.png')}
                style={{width: 32, height: 32}}
                resizeMethod="scale"
              />
            </Marker>
          )}
          { enemies.map((x, index) => {
            return <Marker
            coordinate={{
              latitude: x.location.lat,
              longitude: x.location.lon,
            }}
            title={"enemy" + index}
            key={index}
            style={{width: 32, height: 32}}
            >
              <Image
                source={{"uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}}
                style={{width: 32, height: 32, resizeMode: "contain"}}
              />
            </Marker>
            })}

          { towers.map((x, index) => {
            return <Marker
            coordinate={{
              latitude: x.location.lat,
              longitude: x.location.lon,
            }}
            style={{width: 32, height: 32}}
            title={"tower" + index}
            key={index}
            >
              <Image
                source={{"uri": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfL-rkQ5OZOi2Nm_nGo7BXKKtj77it7oXUgg&s"}}
                style={{width: 32, height: 32}}
              />
            </Marker>
            })}

          { teams.map((x, index) => {
            return <Marker
            coordinate={{
              latitude: x.location.lat,
              longitude: x.location.lon,
            }}
            style={{width: 32, height: 32}}
            title={"tower" + index}
            key={index}
            >
              
              <Image
                source={{"uri": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsAOdbGiC4UmM9Sm_ZEQFE0m_-v1Vuc6Itg&s"}}
                style={{width: 32, height: 32}}
              />
            </Marker>
            })}
        </MapView>
      )}
    </View>
  );
};

// { lon: 24.9586832, lat: 60.1806915 }
const enemies = [
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9706832, "lat": 60.1806915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9386832, "lat": 60.1906915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9186832, "lat": 60.1606915}}
]

const towers = [
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9706832, "lat": 60.1706915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9396832, "lat": 60.2006915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9187832, "lat": 60.1506915}}
]

const teams = [
  {"image": '@/assets/images/user.png', "location": {"lon": 25.0006832, "lat": 60.1676915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9596832, "lat": 60.2106915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.8187832, "lat": 60.1306915}}
]

const styles = StyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Waiting_Driver_Screen;