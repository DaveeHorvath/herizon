
import { Text, View, Image, TouchableHighlight} from "react-native";

export default function Friend() {
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
            <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>This is a long question?</Text>
            <TouchableHighlight><Text>This is the right answer</Text></TouchableHighlight>
            <TouchableHighlight><Text>This is a wrong answer</Text></TouchableHighlight>
            <TouchableHighlight><Text>This is also a wrong answer</Text></TouchableHighlight>
        </View>
    </View>
    )
}