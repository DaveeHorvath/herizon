import { Text, View, Image, StyleSheet } from "react-native";

export type MonsterProp = {
    name: string,
    exp: number,
    people: number
}

export function Monster(prop: MonsterProp) {
return (
    <View
          style={{
            width: 350,
            height: 110,
            backgroundColor: "white",
            borderRadius: 13,
            padding: 20,
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <Image
            source={require("@/assets/images/monster1.png")}
            style={{
              width: 70,
              height: 70,
            }}
          />
          <View style={{
            flexDirection: "column",
            marginLeft: 10
          }}>
            <Text
              style={{fontSize: 20, fontFamily: "Hagrid"}}
            >
              {prop.name}
            </Text>
            <View style={{
              flexDirection: "row",
              alignItems:"center",
              justifyContent: "space-around"
              }}
            >
              <View style={style.yellowBox}>
                <Image source={require("@/assets/images/exp.png")} />
                <Text style={{height: 40, textAlign: "center", alignSelf: "center", fontSize: 14, marginTop: -30}}>{prop.exp} XP</Text>
              </View>
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
                  {prop.people} PPL
                </Text>
              </View>
            </View>
          </View>
        </View>
)}

const style = StyleSheet.create({
    yellowBox: {
      height: 40,
      width: 120  
    }
  })