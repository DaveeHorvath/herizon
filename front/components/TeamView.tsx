import { Text, View, Image, StyleSheet, TouchableHighlight } from "react-native";

export type TeamProps = {
    teamName: string;
    exp: number;
    useramount: number,
    users: [string, string, string, string, string, string, string, string]
  };


export function Team (prop: TeamProps)
{
    return (
        <View style={style.head}>
        <Text style={{fontSize: 30, fontWeight: "200", fontFamily: "Hagrid", marginLeft: 20,marginTop: 20,  width: "100%"}}>{prop.teamName}</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
          <View style={style.yellowBox}>
            <Image source={require("@/assets/images/exp.png")} />
            <Text style={{textAlign: "center", alignSelf: "center", fontSize: 14, marginTop: -30}}>{prop.exp} XP</Text>
          </View>
          <View>
            <Text style={{fontSize: 14, fontFamily: "Hagrid", alignContent: "center", marginRight: 20, marginTop: 10}}>Event 12:00 someplace</Text>
          </View>
        </View>
        <View>
        <View style={{flexDirection: "row", marginTop: 20, justifyContent: "space-around", width: "100%"}}>
          <View style={{flexDirection: "row"}}>
            {prop.users.map((x)=> {
              return <Image source={{"uri": x}}
              style={{width: 40, height: 40, borderRadius: 20, marginLeft: -15, borderColor: "#F5F4ED", borderWidth: 2}}
              />
            })}
          </View>
          <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: "#fff"}}>
              <Text style={{fontSize: 32, textAlign: "center", alignSelf: "center"}}>+</Text>
          </View>
          </View>
        </View>
      </View>
    )
}

const style = StyleSheet.create({
    profile: {
      width: 100,
      height: 100,
      borderRadius: 20,
    },
    head: {
      alignItems: "center",
      // justifyContent: "space-between",
      marginBottom: 20,
      width: 350,
      height: 180,
      borderRadius: 40,
      backgroundColor: "#EAE7DA"
    },
    yellowBox: {
      marginLeft: 12,
      // alignSelf: "baseline",
      height: 40,
      width: 120,
      
    }
})