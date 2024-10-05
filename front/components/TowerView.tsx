import { Text, View, Image, StyleSheet, TouchableHighlight } from "react-native";

export type TowerProps = {
    slug: string;
    imageurl: string;
    location: [number, number],
    challengeId: number
  };


export function TowerView (prop: TowerProps)
{
    return (
      <View style={style.head}>
        <Image
          style={style.profile}
          source={{ "uri": prop.imageurl}}
        />
        <Text style={{fontSize: 25}}>{prop.slug} at {prop.location[0]},{prop.location[1]}</Text>
        {/* <TouchableHighlight>View Challenge</TouchableHighlight> */}
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    }
})