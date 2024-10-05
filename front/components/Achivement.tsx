import { Text, View, Image, StyleSheet } from "react-native";

export type AchivementProp = {
    imageurl: string,
    achivement: string,
    requirement: number,
    progress: number,
    index: number
}

export function Achivement(prop: AchivementProp) {
    return (
        <View key={prop.index} style={style.achivement}>
            <Image
                source={{"uri": prop.imageurl}}
                style={style.achivementImage}
            />
            <Text>{prop.achivement}</Text>
            <Text>{prop.progress} / {prop.requirement}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    achivement: {
        marginTop: 30,
        flexDirection: "row",
        borderColor: "#0000000",
        borderWidth: 1, 
        height : 70,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    achivementImage: {
        width: 50,
        height: 50,
        borderRadius: 8
    }
})