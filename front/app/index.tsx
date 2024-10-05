import { StatusBar } from "expo-status-bar";
import { Text, View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native";
import { Team } from "@/components/TeamView";

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <View
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: "#F5F4ED"
      }}
    >
      <Image
        source={require("@/assets/images/background.png")}
        style={{position: "absolute", width: "100%", height:"100%"}}
      />
      <View
      style={{
        flex: 1,
        margin: 0,
        padding: "5%"
      }}
    >
      <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>My team</Text>
      <Team
        teamName={"Avenger fighters"}
        exp={1200}
        users={["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"]}
        useramount={5}
      />

      <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Teams Nearby</Text>

      {nearby.map((x) => {
        return <Team
        teamName={x.name}
        exp={x.exp}
        users={["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"]}
        useramount={x.useramount}
      />
      })}
      </View>

      <GestureHandlerRootView>
    <BottomSheet
        snapPoints={['6%', '80%']}
        ref={bottomSheetRef}
      >
        <BottomSheetView style={style.contentContainer}>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Add questions about yourself</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>question</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>rigthAnswer</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>wrong answer</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>other wrong answer</Text>
        <TouchableHighlight>
          Add +
        </TouchableHighlight>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const achivements = ["these", "are", "the", "example", "notification", "to", "show", "this", "feature"]

const nearby = [{"name": "Avengers", "exp": 1200, "useramount": 5}, {"name": "X-men", "exp": 1300, "useramount": 10}]

const style = StyleSheet.create({
  profile: {
    width: "100%",
    height: 200,
    borderRadius: 15
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

})