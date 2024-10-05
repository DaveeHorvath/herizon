import { Text, View, Image, StyleSheet } from "react-native";

export type ProfileProps = {
  username: string;
  imageurl: string;
};


export function UserProfile(prop: ProfileProps) {
  return (
    <View style={style.head}>
      <Image
        style={style.profile}
        source={{ "uri": prop.imageurl }}
      />
      <View style={{
        flexDirection: "column",
        alignItems: "baseline",
        marginLeft: 40
      }}>
      <Text style={{ fontSize: 32, fontFamily: "Hagrid"}}>{prop.username}</Text>
      <View style={style.yellowBox}>
        <Image source={require("@/assets/images/exp.png")} />
        <Text style={{ textAlign: "center", alignSelf: "center", fontSize: 14, marginTop: -30 }}>1400 XP</Text>
      </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  profile: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40
  },
  yellowBox: {
    height: 40,
    width: 120,

  }
})