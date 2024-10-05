import { Text, View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";

export type ChallengeProps = {
    question: string,
    rigthAnswer: string,
    wrongAnswer1: string,
    wrongAnswer2: string
}

export function Challenge(props: ChallengeProps) {
    let answers= [props.rigthAnswer, props.wrongAnswer1, props.wrongAnswer2]
  return (
    <View
      style={{
        flex: 1,
        padding: "5%",
        margin: 0
      }}
    >
        <Text style={{fontSize: 42, fontFamily: 'Hagrid'}}>
            {props.question}
        </Text>
        {
            answers.sort( () => .5 - Math.random() ).map((x)=>{
                return <Text style={{fontSize: 32, fontFamily: 'Hagrid'}}>{x}</Text> 
            })
        }
    </View>
)}