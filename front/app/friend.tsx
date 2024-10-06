
import { Monster } from "@/components/Monster";
import { Text, View, Image, TouchableHighlight, Pressable} from "react-native";

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
        marginTop: 50,
        padding: "5%"
      }}
    >
            <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400, textAlign: "center"}}>Is this a trick question?</Text>
            <Pressable style={{margin: 10, backgroundColor: "#e3e3e3", padding: 10, borderRadius: 6, justifyContent: "center"}}>
              <Text style={{textAlign:"center", fontSize: 24}}>This is the right answer</Text>
            </Pressable>
            <Pressable style={{margin: 10, backgroundColor: "#e3e3e3", padding: 10, borderRadius: 6, justifyContent: "center"}}>
              <Text style={{textAlign:"center", fontSize: 24}}>This is also a wrong answer</Text>
            </Pressable>
            <Pressable style={{marginTop: 10, backgroundColor: "#e3e3e3", padding: 10, borderRadius: 6, justifyContent: "center", marginBottom: 100}}>
              <Text style={{textAlign:"center", fontSize: 24}}>This is a wrong answer</Text>
            </Pressable>

            <Monster
               uri={ require("@/assets/images/monster2.png")}
               name={"Kelas Evil Twin"}
               exp={200}
               people={2}
            />
        </View>
    </View>
    )
}