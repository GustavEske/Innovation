import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, TextInput} from "react-native";
import {Pills} from "../StateMachine"
import {HideIfNotInSearch, Separator, SetShow} from "./Utils";

export default function SearchPills({navigation}) {
    const [GetPills, setPills] = Pills.use();
    const [GetSearchTerm, setSearchTerm] = useState('')

    return (
        <View style={{margin: 15}}>
            <TextInput
                placeholder="Søg"
                value={GetSearchTerm}
                onChangeText={(term) => {
                    setSearchTerm(term)
                    setPills(HideIfNotInSearch(GetPills, term))
                }}
                style={styles.inputField}
            />
            <FlatList
                data={GetPills}
                keyExtractor={(_, index) => index.toString()}
                extraData={GetPills.length}
                renderItem={({item: pill}) => {
                    if (pill.showInSearch) {
                        return (
                            <View style={styles.pillContainer}>

                                <View style={styles.pillChoices}>
                                    <Text style={styles.title}>{pill.name}</Text>

                                    <FlatList
                                        data={pill.variants}
                                        renderItem={({item: strength}) => {
                                            if (!strength.show) {
                                                return (
                                                    <View style={[styles.variantBoxPicked, styles.variantBox]}>
                                                        <Text
                                                            style={[styles.variantTextPicked, styles.variantText]}>{strength.mg} mg</Text>
                                                    </View>
                                                )
                                            } else {
                                                return Pick(setPills, GetPills, pill.name, strength.mg, false)
                                            }
                                        }}
                                        keyExtractor={(_, index) => index.toString()}
                                    />
                                </View>

                                <Separator/>
                            </View>
                        )
                    }
                }}
            />
        </View>
    );
}

function Pick(setPills, GetPills, name, strength, bool) {
    return (
        <View style={[styles.variantBoxChoice, styles.variantBox]}>
            <Pressable
                // disabled={!strength.show}
                onPress={() => {
                    setPills(SetShow(GetPills, name, strength, bool))
                }}
            >
                <Text style={[styles.variantTextChoice, styles.variantText]}>{strength} mg</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "black"
    },
    pillChoices: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pillContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
    },
    variantText: {
        fontSize: 22,
        lineHeight: 60,
        fontWeight: 'normal',
        letterSpacing: 0.25,
    },
    variantTextChoice: {
        color: 'black',
    },
    variantTextPicked: {
        color: 'white',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    variantBox: {
        borderRadius: 100,
        margin: 5,
        width: 100,
        alignItems: 'center',
    },
    variantBoxChoice: {
        backgroundColor: 'lightgreen',
    },
    variantBoxPicked: {
        backgroundColor: 'lightgrey',
    },
    inputField: {
        borderWidth: 3,
        borderColor: "lightgrey",
        backgroundColor: "white",
        margin: 5,
        padding: 20,
        fontSize: 22,
        borderRadius: 10,
    }
});
