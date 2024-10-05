import { Text, View, Image, StyleSheet } from "react-native";

export type SlotProp = {
    imageurl?: string,
    index: number
}

export function Slot(prop: SlotProp) {
    return (
        <View key={prop.index} style={style.slot}>
            {prop.imageurl? <Image
                source={{"uri": prop.imageurl}}
                style={style.slotImage}
            /> : <View></View>}
        </View>
    )
}

const style = StyleSheet.create({
    slot: {
        margin: "2%",
        flexDirection: "row",
        borderColor: "#0000000",
        borderWidth: 1, 
        height : "100%",
        minHeight: 20,
        width: "20%",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 10
    },
    slotImage: {
        width: "90%",
        height: "90%",
        borderRadius: 10
    }
})