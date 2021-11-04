import React from 'react';
import {View, Text, FlatList, StyleSheet, Button, Pressable} from "react-native";
import {ChosenPills, Updates} from "../StateMachine"
import {Separator, FilterChosenPillsOutOfAvailablePills, deleteChosenPill} from "./Utils";

export default function ViewChosenPills({navigation}) {
    const [GetChosenPills, setChosenPills] = ChosenPills.use();
    const [GetUpdates, SetUpdates] = Updates.use();

    return (
        <View style={{width: '90%', height: '80%', margin: 15}}>
             {/*<FlatList*/}
        {/*//         data={GetChosenPills}*/}
        {/*//         extraData={GetChosenPills.length}*/}
        {/*//         renderItem={({item: choice}) => {*/}
        {/*//             return (*/}
        {/*//                 <View style={styles.button}>*/}
        {/*//                     <View>*/}
        {/*//                         <Text style={styles.text}>{choice.name}</Text>*/}
        {/*//                         <Text style={styles.text}>{choice.strength} mg</Text>*/}
        {/*//                     </View>*/}
        {/*//                     <Pressable*/}
        {/*//                         onPress={() => {*/}
        {/*//                             // setChosenPills(deleteChosenPill(GetChosenPills, choice.name, choice.strength))*/}
        {/*//                             // setChosenPills([])*/}
        {/*//                         }}*/}
        {/*//                     >*/}
        {/*//                         <Text style={styles.delete}>Fjern</Text>*/}
        {/*//                     </Pressable>*/}
        {/*//                 </View>*/}
        {/*//             )*/}
        {/*//         }}*/}
        {/*//         keyExtractor={(_, index) => index.toString()}*/}
        {/*//     />*/}
            <Button
                title={"helo"}
                onPress={() => {
                    console.log("helo")
                    SetUpdates(GetUpdates + 1)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    },
    delete: {
        fontSize: 20,
        color: "white"
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 100,
        backgroundColor: 'grey',
        margin: 5,
    },
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        color: 'white',
    },
});