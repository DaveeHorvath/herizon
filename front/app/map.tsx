import { Text, View, Image, StyleSheet, TouchableHighlight, Platform } from "react-native";
import { ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";


import {Team, TeamProps} from '@/components/TeamView'
import {TowerView, TowerProps} from '@/components/TowerView'
import Waiting_Driver_Screen from "@/components/WaitScreen";

function getCurrentSelected(e: any) {
  currentSelected = e
}

export default function Map() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenPress = (e: any) => {
      getCurrentSelected(e)
      hasSelected = true
      bottomSheetRef.current.expand()
    }
    
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
      if (index == 1)
      {
        getCurrentSelected({})
        hasSelected = false
      }

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
        <Waiting_Driver_Screen/>
    }
    <GestureHandlerRootView>
    <BottomSheet
        snapPoints={['6%', '80%']}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        
      >
        <BottomSheetView style={style.contentContainer}>
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

const towerNearYou = [
    {"name": "tower1", "location": {"lon": 32.0, "lat": 0.2}},
    {"name": "tower2", "location": {"lon": 42.0, "lat": 1.2}},
    {"name": "tower3", "location": {"lon": 52.0, "lat": 2.2}}
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
    alignItems: 'center',
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
  }
})