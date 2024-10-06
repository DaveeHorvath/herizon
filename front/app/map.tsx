import { Text, View, Image, StyleSheet, TouchableHighlight, Platform } from "react-native";
import { ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import {Team, TeamProps} from '@/components/TeamView'
import {TowerView, TowerProps} from '@/components/TowerView'
import { processColorsInProps } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

async function getTowerData() {
  const url = "http://10.18.200.69:3000/all_towers";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    towers = json
    console.log(towers)
  } catch (error) {
    console.error(error.message);
  }
}

async function getEnemyData() {
  const url = "http://10.18.200.69:3000/all_towers";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    enemies = json
    console.log(towers)
  } catch (error) {
    console.error(error.message);
  }
}



type prop = {
  e: any
}

const Waiting_Driver_Screen = (pros: prop) => {
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
      getTowerData()
      getEnemyData()
    };

    getLocation();
  }, []);

  return (
    <View style={style.container}>
      {initialRegion && (
        <MapView style={style.map} initialRegion={initialRegion}
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
              onPress={() => {pros.e({"test": 1})}}
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
            title={"enemy " + index}
            key={index}
            style={{width: 32, height: 32}}
            onPress={() => {pros.e({"test": 1})}}
            >
              <Image
                source={enemyImages[index]}
                style={{width: 32, height: 32, resizeMode: "contain"}}
              />
            </Marker>
            })}

          { towers.map((x, index) => {
            return <Marker
            onPress={() => {pros.e({"test": 1})}}
            coordinate={{
              latitude: x.location.lat,
              longitude: x.location.lon,
            }}
            style={{width: 32, height: 32}}
            title={"tower" + index}
            key={index}
            >
              <Image
                source={towerImages[index]}
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
                source={team[index]}
                style={{width: 32, height: 32}}
              />
            </Marker>
            })}
        </MapView>
      )}
    </View>
  );
};


function getCurrentSelected(e: any) {
  currentSelected = e
}

export default function Map() {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenPress = (e: any) => {
      console.log("Weird shit")
      bottomSheetRef.current?.expand()
      // getCurrentSelected(e)
      hasSelected = true
    }
    
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
      // if (index == 1)
      // {
      //   getCurrentSelected({})
      //   hasSelected = false
      // }

    }, []);


    
    return (
    <View
      style={{
        flex: 1,
        padding: "0%",
        margin: 0
      }}
    >
      {
        Platform.OS == "web" ?
        <Image
          style={StyleSheet.absoluteFill}
          source={{ "uri": "https://geology.com/world/world-map-360.gif"}}
        />
        :
        <Waiting_Driver_Screen
          e={handleOpenPress}
        />
    }
    <GestureHandlerRootView>
    <BottomSheet
        snapPoints={[100, 400]}
        ref={bottomSheetRef}
        detached={false}
      >
        <BottomSheetView style={style.contentContainer} >
          <View>
            {hasSelected ? <Text>Looking for something?</Text> : 
            <View>
              <Image 
                source={{"uri" : currentSelected.image}}
              />
              <View style={style.yellowBox}>
                <Image source={require("@/assets/images/exp.png")} />
                <Text style={{height: 40, textAlign: "center", alignSelf: "center", fontSize: 14, marginTop: -30}}>{currentSelected.exp} XP</Text>
                <View style={{
              flexDirection: "row",
              alignItems: "center"
              }}>
                <Image
                  source={require("@/assets/images/person.png")}
                />
                <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontFamily: "Hagrid"
                  }}>
                  {currentSelected.people} PPL
                </Text>
              </View>
              </View>
              <Text>{currentSelected.challenge}</Text>
              <View style={{
                flexDirection: "row",
                width: "100%",
                borderRadius: 40,
                height: 88,
                backgroundColor: "#EAE7DA",
                padding: 17,
                marginBottom: 16
              }}>
                <Image
                  style={{height: 50}}
                  source={require("@/assets/images/achivement1.png")}
                  />
                <Text
                  style={{fontSize: 24, fontFamily: "Hagrid", alignSelf: "center", marginLeft: 20}}
                  >{currentSelected.achivement}</Text>
              </View>
              {currentSelected.people < currentTeam.size ? <Text>Arrange meetup?</Text> : <Text>Fight!</Text>}
            </View>
            }
          </View>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
    
    </View>
  );
}

let currentSelected = {}


let currentTeam = {
  "size": 2
}
let hasSelected = false

const teamsNearYou = ["Team zelda", "Team pokemon", "Team Final Fantasy"]

const enemyImages = [require("@/assets/images/monster1.png"), require("@/assets/images/monster2.png"), require("@/assets/images/monster3.png")]
const towerImages = [require("@/assets/images/tower1.png"), require("@/assets/images/tower2.png"), require("@/assets/images/tower3.png")]
const team = [require("@/assets/images/meme.png"), require("@/assets/images/achivement1.png"), require("@/assets/images/evil.png")]
// { lon: 24.9586832, lat: 60.1806915 }
let enemies = [
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9706832, "lat": 60.1806915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9386832, "lat": 60.1906915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9186832, "lat": 60.1606915}}
]

let towers = [
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9706832, "lat": 60.1706915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9396832, "lat": 60.2006915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9187832, "lat": 60.1506915}}
]

let teams = [
  {"image": '@/assets/images/user.png', "location": {"lon": 25.0006832, "lat": 60.1676915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.9596832, "lat": 60.2106915}},
  {"image": '@/assets/images/user.png', "location": {"lon": 24.8187832, "lat": 60.1306915}}
]

const regionStats = {
  "standing": 0.69,
  "usersInArea": 42,
  "towersInArea": 5,
  "towerStatus": [0.5, 0.7, 0.2, 0.1, 0.3],
  "events": []
}
const style = StyleSheet.create({
  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  achivement: {
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#0000000",
    borderWidth: 1, 
    height : 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  yellowBox: {
    height: 40,
    width: 120  
  },
  container: {
    width:"100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -1
  },
})