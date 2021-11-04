import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from "react-native";
import {AvailablePillsState, ChosenPills, Updates} from "../StateMachine"
import {Separator, FilterChosenPillsOutOfAvailablePills} from "./Utils";

export default function SearchPills({navigation}) {
    // const [GetAvailablePills, setAvailablePills] = AvailablePillsState.use();
    // const [GetChosenPills, setChosenPills] = ChosenPills.use();
    const [GetUpdates, SetUpdates] = Updates.use();

    // console.log(GetAvailablePills)
    console.log(navigation.getState())
    console.log(navigation.getState().index);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{GetUpdates}</Text>
            {/*<FlatList*/}
            {/*    data={FilterChosenPillsOutOfAvailablePills(GetAvailablePills, GetChosenPills)}*/}
            {/*    extraData={GetChosenPills.length}*/}
            {/*    keyExtractor={(_, index) => index.toString()}*/}
            {/*    renderItem={({item: pill}) => {*/}
            {/*        return (*/}
            {/*            <View style={styles.PillChoice}>*/}
            {/*                <Text style={styles.title}>{pill.name}</Text>*/}

            {/*                <FlatList*/}
            {/*                    data={pill.variants}*/}
            {/*                    extraData={GetChosenPills.length}*/}
            {/*                    renderItem={({item: strength}) => {*/}
            {/*                        return (*/}
            {/*                            <Button*/}
            {/*                                title={`${strength.mg} mg`}*/}
            {/*                                disabled={!strength.show}*/}
            {/*                                onPress={() => {*/}
            {/*                                    console.log("sChoice: " + pill.name + " of " + strength.mg + " mg")*/}

            {/*                                    setChosenPills(GetChosenPills.concat({*/}
            {/*                                        "name": pill.name,*/}
            {/*                                        "strength": strength.mg*/}
            {/*                                    }))*/}
            {/*                                }}*/}
            {/*                            />*/}
            {/*                        )*/}
            {/*                    }}*/}
            {/*                    keyExtractor={(_, index) => index.toString()}*/}
            {/*                />*/}

            {/*                <Separator/>*/}
            {/*            </View>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    PillChoice: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
});
