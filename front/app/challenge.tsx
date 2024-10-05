import { Challenge, ChallengeProps } from "@/components/challengeComponent";
import { Text, View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Monster, MonsterProp } from "@/components/Monster";

export default function ChallengeView() {
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
      <ScrollView>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Challenges</Text>

        {monster.map((x) => {
          return (
            <Monster
              name={x.name}
              exp={x.exp}
              people={x.people}
            />
          )
        })}
        
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Towers</Text>

        {tower.map((x) => {
          return (
            <Monster
              name={x.name}
              exp={x.exp}
              people={x.people}
            />
          )
        })}
        
      </ScrollView>
    </View>

    </View>
)}


const monster = [
  {"name": "Bob", "exp": 1200, "people": 3},
  {"name": "TIm", "exp": 1400, "people": 4}
]
const tower = [
  {"name": "evil tower", "exp": 1200, "people": 3},
  {"name": "kela office", "exp": 1400, "people": 1}
]
