import { StatusBar } from "expo-status-bar";
import { Text, View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native";
import { Team } from "@/components/TeamView";

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
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
      <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>My team</Text>
      <Team
        teamName={"Avenger fighters"}
        exp={1200}
        users={
          [
            "https://s3-alpha-sig.figma.com/img/261d/783d/a4147da7fea569d1940840845897657f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ULPoGQkINS-YLalVwYb19v5i23Y81CiW-jAdgJmTj7QWGWqCg4chiRhhg2n8LHvzWJSyAJhGaNHi2c6FvcQrG5n1uVlZrNFl99QDNTU0NIfLT12N7v9M1BGUiZNqNuBPJIeSyq1K87GKmUQ~4AVA~gOTZzjZh9pXKS2lJjbFVWwR5Je0591lZBqKJ57DsRtw~eFu22-j8NOPxvKJ0MvUPiOleG34WdDGsv6Zh8G3btJXvdGsHemB7~QAm2lOyLQpNfUYuaL7LBS-6boqgcHj6Nj0wZvaguj-vPUUV~Gk2wjC54DyHcaR1pnb8I7oBuCxZeywFKNxsIy8VmRb4XtN4Q__", 
            "https://s3-alpha-sig.figma.com/img/30d4/a462/ea7b6e1428ffcb7ed5d646ca522e5a23?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZ6bfqaNApxqXw7BPcBHmeHsy~X4mJAnIIl3nho~Uvy5RrAS4AeVrU86Ez0i4fz4Qg8y3T5yKwvoWz63mv-VOBPDHYcSsku-6j611ByR0XJNeWlZAMyVdOfQTQlvS-PF7REpMY6Az6Kknw9hT2E-d1M4V2fmxJkknefpLCItHpXQdQKykvB6pHXbE0rzIPYz4jxWqNVVAauts9jqPt4Irt1qWakfKG8UhYo~Sedd6SDRcf1EA3ExUxS2R42EiLK~i9Ik7CQn7fo3SFZ-ZTnKACzjvPOphjH94vSguF2o5EF~znVm7kf9m4Tx1QmHjBaE7EWg7qulBP9hk5xHpBBdvg__", 
            "https://s3-alpha-sig.figma.com/img/4e18/492d/9e016d792d3dfe93dd80d52dd96046ee?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XtPbMLSU8Q11fjiQ0ziSNFrsMBwf5YlAMgOB7I6wM0XKF3sJ167d52K-TsjLcJN~YILNgesA~YfflEtmPd6y3t~KvpU-FKAR6wITbQYvyzw8~4JGYcdQhHRFrOxuDTLVTQVe1keWRzMF~Cc3IRB8sq7vVLkh6ANhU6sK4yMDk3ZppaKIcMomeYAozatq7jj9X9Q9mkV6E3Q7juqlO6~im~3Zudf9P4cJScekmOMxLnb1j0jgbWz5C9wK2xaZip4TaOaubPsBOyTESaOgsaYMBxP0cUWElg5dG69Me0WrrYelHuDVz1KxwIXW201dra2A90b4IY4i~0KckHqyBlLhEg__",
            "https://s3-alpha-sig.figma.com/img/264a/e50c/597aef89a0c4eff3aa6d5fa1503db174?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RI751jImtIO4LULSxnAyeI-y~6jLzwWFHxvtwpkyhsJVUQ8V4c1wYhrbHcqSVDr5H1xRMfPhskFTpIEHWGhr~IHql4eyk7FCt2KXxgStclqIESIVicxBsNxCvclc0ZD11b3yR9UkAH3zsHzFvExYT~rD~ATals8E6YT-cphm-gxSHM-WLeJDHLqti9hOy-UZ7PpV5mKDYXor5lqzdZLlITJLFl20bzNbDf3AnQB6QBLrxmFq9FLLXw~ESntF5Yvsi-71RA1Td2vbhI2LW~kXBuSHyMH-2nGGKyr2JFMkkHPhKiGvA1QpzFeIanVl9eIv15hKLwGicyQvUXBg7JxvKA__",
            "https://s3-alpha-sig.figma.com/img/d62f/72d9/c8052940bb7983e7caefb57013f80477?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bbz1nu-r~CgjpSJgZzc~vFfnHB6CKNU1~~UDmtv9XycowYzbwcx57CaweqcdsP1Zjqsf3Nyl5z7wzvtvAvVGzsNfLoEjO7VfprgkiocZQrFKGkhqpWiTHDNFibWAL42CGQuSvF06OOgMMLA-whGms27luFUcLSe~JIA-hhrqlDaO-jv7jjIvZ~HrzO3cQPii2wNCTRbOPiEHsLK1-E9ZDCsGB~z0NgjDiodFJAnni~OqOETojNM1EkDO-wUTyJZIyKO3VlPmMNAJ5pB3VfwAQPkJaM8oEicXWMTlJmjiIdbAtQgbePoykUpgzokmVyAjGXnZp-vMJtYt7k51-bQQLQ__",
            "https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ixh~vuvVPBOlfno4yHv7zC1~scO--w94pFTiJkZX~tz~4QflwUidZZIZLFFtrPcPvVrSJ-wtJdJ~B8UzfcS7NXSxcUkeMfE4P~OX9Uv9m5k8YfjaSngMwAYsqkI8wZ053AZZrLVm8heMt9PYO5OLra8wSePpkR6braqWP5L1~YMH4~P8RXbLkBuLmTNUd2R4HBiTWQrCbejH0pI8j5rWjhyj9GuLr0OZXBs9eknMKPgguBgBHFTzVp9cJ7uDMMB9Axulxz~BvJFK3x94NYFHn5yqwGQePxe96jvdeZ503IXM72VfwD3tYbZeev2c0TrvzKViTVsKUVr9G3trE30dPQ__",
            "https://s3-alpha-sig.figma.com/img/4e18/492d/9e016d792d3dfe93dd80d52dd96046ee?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XtPbMLSU8Q11fjiQ0ziSNFrsMBwf5YlAMgOB7I6wM0XKF3sJ167d52K-TsjLcJN~YILNgesA~YfflEtmPd6y3t~KvpU-FKAR6wITbQYvyzw8~4JGYcdQhHRFrOxuDTLVTQVe1keWRzMF~Cc3IRB8sq7vVLkh6ANhU6sK4yMDk3ZppaKIcMomeYAozatq7jj9X9Q9mkV6E3Q7juqlO6~im~3Zudf9P4cJScekmOMxLnb1j0jgbWz5C9wK2xaZip4TaOaubPsBOyTESaOgsaYMBxP0cUWElg5dG69Me0WrrYelHuDVz1KxwIXW201dra2A90b4IY4i~0KckHqyBlLhEg__",
            "https://s3-alpha-sig.figma.com/img/264a/e50c/597aef89a0c4eff3aa6d5fa1503db174?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RI751jImtIO4LULSxnAyeI-y~6jLzwWFHxvtwpkyhsJVUQ8V4c1wYhrbHcqSVDr5H1xRMfPhskFTpIEHWGhr~IHql4eyk7FCt2KXxgStclqIESIVicxBsNxCvclc0ZD11b3yR9UkAH3zsHzFvExYT~rD~ATals8E6YT-cphm-gxSHM-WLeJDHLqti9hOy-UZ7PpV5mKDYXor5lqzdZLlITJLFl20bzNbDf3AnQB6QBLrxmFq9FLLXw~ESntF5Yvsi-71RA1Td2vbhI2LW~kXBuSHyMH-2nGGKyr2JFMkkHPhKiGvA1QpzFeIanVl9eIv15hKLwGicyQvUXBg7JxvKA__"]}
        useramount={5}
      />

      <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Teams Nearby</Text>

      {nearby.map((x) => {
        return <Team
        teamName={x.name}
        exp={x.exp}
        users={
          [
            "https://s3-alpha-sig.figma.com/img/261d/783d/a4147da7fea569d1940840845897657f?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ULPoGQkINS-YLalVwYb19v5i23Y81CiW-jAdgJmTj7QWGWqCg4chiRhhg2n8LHvzWJSyAJhGaNHi2c6FvcQrG5n1uVlZrNFl99QDNTU0NIfLT12N7v9M1BGUiZNqNuBPJIeSyq1K87GKmUQ~4AVA~gOTZzjZh9pXKS2lJjbFVWwR5Je0591lZBqKJ57DsRtw~eFu22-j8NOPxvKJ0MvUPiOleG34WdDGsv6Zh8G3btJXvdGsHemB7~QAm2lOyLQpNfUYuaL7LBS-6boqgcHj6Nj0wZvaguj-vPUUV~Gk2wjC54DyHcaR1pnb8I7oBuCxZeywFKNxsIy8VmRb4XtN4Q__", 
            "https://s3-alpha-sig.figma.com/img/30d4/a462/ea7b6e1428ffcb7ed5d646ca522e5a23?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZ6bfqaNApxqXw7BPcBHmeHsy~X4mJAnIIl3nho~Uvy5RrAS4AeVrU86Ez0i4fz4Qg8y3T5yKwvoWz63mv-VOBPDHYcSsku-6j611ByR0XJNeWlZAMyVdOfQTQlvS-PF7REpMY6Az6Kknw9hT2E-d1M4V2fmxJkknefpLCItHpXQdQKykvB6pHXbE0rzIPYz4jxWqNVVAauts9jqPt4Irt1qWakfKG8UhYo~Sedd6SDRcf1EA3ExUxS2R42EiLK~i9Ik7CQn7fo3SFZ-ZTnKACzjvPOphjH94vSguF2o5EF~znVm7kf9m4Tx1QmHjBaE7EWg7qulBP9hk5xHpBBdvg__", 
            "https://s3-alpha-sig.figma.com/img/4e18/492d/9e016d792d3dfe93dd80d52dd96046ee?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XtPbMLSU8Q11fjiQ0ziSNFrsMBwf5YlAMgOB7I6wM0XKF3sJ167d52K-TsjLcJN~YILNgesA~YfflEtmPd6y3t~KvpU-FKAR6wITbQYvyzw8~4JGYcdQhHRFrOxuDTLVTQVe1keWRzMF~Cc3IRB8sq7vVLkh6ANhU6sK4yMDk3ZppaKIcMomeYAozatq7jj9X9Q9mkV6E3Q7juqlO6~im~3Zudf9P4cJScekmOMxLnb1j0jgbWz5C9wK2xaZip4TaOaubPsBOyTESaOgsaYMBxP0cUWElg5dG69Me0WrrYelHuDVz1KxwIXW201dra2A90b4IY4i~0KckHqyBlLhEg__",
            "https://s3-alpha-sig.figma.com/img/264a/e50c/597aef89a0c4eff3aa6d5fa1503db174?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RI751jImtIO4LULSxnAyeI-y~6jLzwWFHxvtwpkyhsJVUQ8V4c1wYhrbHcqSVDr5H1xRMfPhskFTpIEHWGhr~IHql4eyk7FCt2KXxgStclqIESIVicxBsNxCvclc0ZD11b3yR9UkAH3zsHzFvExYT~rD~ATals8E6YT-cphm-gxSHM-WLeJDHLqti9hOy-UZ7PpV5mKDYXor5lqzdZLlITJLFl20bzNbDf3AnQB6QBLrxmFq9FLLXw~ESntF5Yvsi-71RA1Td2vbhI2LW~kXBuSHyMH-2nGGKyr2JFMkkHPhKiGvA1QpzFeIanVl9eIv15hKLwGicyQvUXBg7JxvKA__",
            "https://s3-alpha-sig.figma.com/img/d62f/72d9/c8052940bb7983e7caefb57013f80477?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bbz1nu-r~CgjpSJgZzc~vFfnHB6CKNU1~~UDmtv9XycowYzbwcx57CaweqcdsP1Zjqsf3Nyl5z7wzvtvAvVGzsNfLoEjO7VfprgkiocZQrFKGkhqpWiTHDNFibWAL42CGQuSvF06OOgMMLA-whGms27luFUcLSe~JIA-hhrqlDaO-jv7jjIvZ~HrzO3cQPii2wNCTRbOPiEHsLK1-E9ZDCsGB~z0NgjDiodFJAnni~OqOETojNM1EkDO-wUTyJZIyKO3VlPmMNAJ5pB3VfwAQPkJaM8oEicXWMTlJmjiIdbAtQgbePoykUpgzokmVyAjGXnZp-vMJtYt7k51-bQQLQ__",
            "https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ixh~vuvVPBOlfno4yHv7zC1~scO--w94pFTiJkZX~tz~4QflwUidZZIZLFFtrPcPvVrSJ-wtJdJ~B8UzfcS7NXSxcUkeMfE4P~OX9Uv9m5k8YfjaSngMwAYsqkI8wZ053AZZrLVm8heMt9PYO5OLra8wSePpkR6braqWP5L1~YMH4~P8RXbLkBuLmTNUd2R4HBiTWQrCbejH0pI8j5rWjhyj9GuLr0OZXBs9eknMKPgguBgBHFTzVp9cJ7uDMMB9Axulxz~BvJFK3x94NYFHn5yqwGQePxe96jvdeZ503IXM72VfwD3tYbZeev2c0TrvzKViTVsKUVr9G3trE30dPQ__",
            "https://s3-alpha-sig.figma.com/img/4e18/492d/9e016d792d3dfe93dd80d52dd96046ee?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XtPbMLSU8Q11fjiQ0ziSNFrsMBwf5YlAMgOB7I6wM0XKF3sJ167d52K-TsjLcJN~YILNgesA~YfflEtmPd6y3t~KvpU-FKAR6wITbQYvyzw8~4JGYcdQhHRFrOxuDTLVTQVe1keWRzMF~Cc3IRB8sq7vVLkh6ANhU6sK4yMDk3ZppaKIcMomeYAozatq7jj9X9Q9mkV6E3Q7juqlO6~im~3Zudf9P4cJScekmOMxLnb1j0jgbWz5C9wK2xaZip4TaOaubPsBOyTESaOgsaYMBxP0cUWElg5dG69Me0WrrYelHuDVz1KxwIXW201dra2A90b4IY4i~0KckHqyBlLhEg__",
            "https://s3-alpha-sig.figma.com/img/264a/e50c/597aef89a0c4eff3aa6d5fa1503db174?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RI751jImtIO4LULSxnAyeI-y~6jLzwWFHxvtwpkyhsJVUQ8V4c1wYhrbHcqSVDr5H1xRMfPhskFTpIEHWGhr~IHql4eyk7FCt2KXxgStclqIESIVicxBsNxCvclc0ZD11b3yR9UkAH3zsHzFvExYT~rD~ATals8E6YT-cphm-gxSHM-WLeJDHLqti9hOy-UZ7PpV5mKDYXor5lqzdZLlITJLFl20bzNbDf3AnQB6QBLrxmFq9FLLXw~ESntF5Yvsi-71RA1Td2vbhI2LW~kXBuSHyMH-2nGGKyr2JFMkkHPhKiGvA1QpzFeIanVl9eIv15hKLwGicyQvUXBg7JxvKA__"]}
        useramount={x.useramount}
      />
      })}
      </View>

      <GestureHandlerRootView>
    <BottomSheet
        snapPoints={['6%', '80%']}
        ref={bottomSheetRef}
      >
        <BottomSheetView style={style.contentContainer}>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>Add questions about yourself</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>question</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>rigthAnswer</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>wrong answer</Text>
        <Text style={{fontSize: 48, fontFamily: "Hagrid", fontWeight: 400}}>other wrong answer</Text>
        <TouchableHighlight>
          <Text>Add +</Text>
        </TouchableHighlight>
        </BottomSheetView>
      </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const achivements = ["these", "are", "the", "example", "notification", "to", "show", "this", "feature"]

const nearby = [{"name": "Avengers", "exp": 1200, "useramount": 5}, {"name": "X-men", "exp": 1300, "useramount": 10}]

const style = StyleSheet.create({
  profile: {
    width: "100%",
    height: 200,
    borderRadius: 15
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20
  },

  achivement: {
    marginTop: 30,
    flexDirection: "row",
    borderColor: "#0000000",
    borderWidth: 1, 
    height : 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

})