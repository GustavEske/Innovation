import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from "react-native";
import {Pills} from "../StateMachine"
import {SetShow} from "./Utils";

export default function ViewChosenPills({navigation}) {
    const [GetPills, setPills] = Pills.use();

    return (
        <View style={{margin: 15}}>
            <FlatList
                data={GetPills}
                renderItem={({item: pill}) => {
                    return (
                        <FlatList
                            data={pill.variants.filter((variant) => !variant.show)}
                            renderItem={({item: variant}) => {
                                return (
                                    <View style={styles.button}>
                                        <View>
                                            <Text style={styles.text}>{pill.name}</Text>
                                            <Text style={styles.text}>{variant.mg} mg</Text>
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                setPills(SetShow(GetPills, pill.name, variant.mg, true))
                                            }}
                                        >
                                            <Text style={styles.delete}>Fjern</Text>
                                        </Pressable>
                                    </View>
                                )
                            }}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    )
                }}
                keyExtractor={(_, index) => index.toString()}
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
        color: "black"
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 100,
        backgroundColor: 'lightgreen',
        margin: 5,
    },
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        color: 'black',
    },
});