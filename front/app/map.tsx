import { Text, View, Image, StyleSheet, TouchableHighlight, Platform } from "react-native";
import { ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";


import {Team, TeamProps} from '@/components/TeamView'
import {TowerView, TowerProps} from '@/components/TowerView'
import Waiting_Driver_Screen from "@/components/WaitScreen";


export default function Map() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
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
          {hasSelected ? <Text>Looking for something</Text> : <View></View>}
          <Text>Awesome 🎉</Text>
            <Text>Teams near you</Text>
            {teamsNearYou.map((team, index) => {
              return <Team key={index}
              teamName={"Avenger fighters"}
              exp={1200}
              users={["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"]}
              useramount={5}
              />
            })}

          <Text>Towers near you</Text>
          {towerNearYou.map((team, index) => {
              return <TowerView
                slug={team.name}
                imageurl="https://www.netmaps.net/wp-content/uploads/2016/03/Helsinki-Vector-Map.jpg"
                location={[team.location.lat, team.location.lon]}
                challengeId={index}
              />
            })}

          <Text>Your regions stats</Text>
          <Text>...</Text>
          <Text>...</Text>
          <Text>...</Text>
          <Text>...</Text>
          <Text>...</Text>
          <Text>...</Text>


          <Text>actions:</Text>
          <Text>Use item</Text>
          <Text>Repair Tower</Text>
          <Text>Upgrade Tower</Text>
          <Text>Attack enemies</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
    
    </View>
  );
}

let currentSelected = {}
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
  }
})