import { Text, View, Image, TouchableHighlight} from "react-native";

export default function Init() {
    return (
        <View
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: "#F5F4ED",
        position: "absolute",
        top: 0, 
        left: 0
      }}
    >
    <TouchableHighlight>
      <Image
        source={require("@/assets/images/evil.png")}
        style={{position: "absolute", width: "100%", height:"100%"}}
      />
    </TouchableHighlight>
    </View>
    )
}