import { Challenge, ChallengeProps } from "@/components/challengeComponent";
import { Text, View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Monster, MonsterProp } from "@/components/Monster";

export default function ChallengeView() {

  const getData = ()=> {
  const url = "http://10.18.200.69:3000/all_towers_data";
  try {
    const response = fetch(url);

    const json = response.json();
    towers = json
    console.log(towers)
  } catch (error) {
    console.error(error.message);
  }
}

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

        {monster.map((x, index) => {
          return (
            <Monster
              uri={monsterimages[index % monsterimages.length]}
              name={x.name}
              exp={x.exp}
              people={x.people}
            />
          )
        })}
        
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Towers</Text>

        {tower.map((x, index) => {
          return (
            <Monster
              uri={towerimages[index % towerimages.length]}
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


const monsterimages= [
  require("@/assets/images/monster1.png"),
  require("@/assets/images/monster2.png"),
  require("@/assets/images/monster3.png")
]

const towerimages= [
  require("@/assets/images/tower1.png"),
  require("@/assets/images/tower2.png"),
  require("@/assets/images/tower3.png")
]

const monster = [
  {"name": "TE-office monster", "exp": 1200, "people": 3},
  {"name": "DVV Secret Weapon", "exp": 1400, "people": 4},
  {"name": "Omakela Evil", "exp": 900, "people": 42}
]
const tower = [
  {"name": "Evil tower", "exp": 1200, "people": 3},
  {"name": "Persident palace", "exp": 1400, "people": 2},
  {"name": "Ravechurch", "exp": 6000, "people": 4}
]
