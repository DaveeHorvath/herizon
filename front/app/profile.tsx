import { StatusBar } from "expo-status-bar";
import { Text, View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";

import {ProfileProps, UserProfile} from "@/components/Profile"
import {AchivementProp, Achivement} from "@/components/Achivement"
import {SlotProp, Slot} from "@/components/Slot"

export default function Profile() {
  return (
    <View
      style={{
        backgroundColor: "#F5F4ED",
        flex: 1,
        margin: 0,
      }}
    >
      <Image
        source={require("@/assets/images/background.png")}
        style={{position: "absolute", width: "100%", height:"100%"}}
      />
    <View
      style={{
        flex: 1,
        padding: "5%",
        marginTop: 50
      }}
    >
      <UserProfile
        username={"Natalie"}
        imageurl={"https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ixh~vuvVPBOlfno4yHv7zC1~scO--w94pFTiJkZX~tz~4QflwUidZZIZLFFtrPcPvVrSJ-wtJdJ~B8UzfcS7NXSxcUkeMfE4P~OX9Uv9m5k8YfjaSngMwAYsqkI8wZ053AZZrLVm8heMt9PYO5OLra8wSePpkR6braqWP5L1~YMH4~P8RXbLkBuLmTNUd2R4HBiTWQrCbejH0pI8j5rWjhyj9GuLr0OZXBs9eknMKPgguBgBHFTzVp9cJ7uDMMB9Axulxz~BvJFK3x94NYFHn5yqwGQePxe96jvdeZ503IXM72VfwD3tYbZeev2c0TrvzKViTVsKUVr9G3trE30dPQ__"}      
      />

      <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Achivement</Text>

      { achivements.map((x, index) => {
        return (
          <View key={index} style={{
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
            source={index==0 ? require("@/assets/images/achivement1.png") : require("@/assets/images/meme.png")}
            />
          <Text
            style={{fontSize: 24, fontFamily: "Hagrid", alignSelf: "center", marginLeft: 20}}
            >{x.name}</Text>
        </View>
        )})}

      <View style={{
        flexDirection: "column",
        width: "100%",
        borderRadius: 40,
        backgroundColor: "#EAE7DA",
        padding: 17,
        marginTop: 40
      }}>
        <View style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between"
        }}>
          <Text style={{fontSize: 30, fontWeight: "200", fontFamily: "Hagrid"}}>Question</Text>
          <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: "#fff"}}>
                <Text style={{fontSize: 32, textAlign: "center", alignSelf: "center"}}>+</Text>
          </View>
        </View>

        <Text style={{fontSize: 18, fontFamily: "Hagrid", marginLeft: 10}}>
          Ask me about my hobby
        </Text> 
        <Text style={{fontSize: 18, fontFamily: "Hagrid", marginLeft: 10}}>
          What am I doing on weekends
        </Text> 
        <Text style={{fontSize: 18, fontFamily: "Hagrid", marginLeft: 10}}>
          What is my favourite book
        </Text> 
      </View>
    </View>
    </View>
  );
}

const achivements = [{"name": "Lucky guy", "image": "url"}, {"name": "Meme Destroyer", "image": "url"}]

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
  slots: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-around",
    marginTop: 20
  }

  
})