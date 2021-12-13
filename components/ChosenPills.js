import React from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Pills} from "../StateMachine"
import {Separator, SetDays} from "./Utils";

const showAlert = (name, strength, onDelete) =>
    Alert.alert(
        `Slet ${name} ${strength}mg?`,
        "Er du sikker på at du vil slette denne pille?",
        [
            {
                text: "Slet ikke",
                style: "cancel",
            },
            {
                text: "Slet",
                onPress: () => onDelete(),
                style: "destructive",
            },
        ]
    );

//Her vises de valgte piller. Når man trykker på fjern knappen bliver bool:true og pillen vises ikke længere her. - Rasmus
export default function ViewChosenPills({navigation}) {
    const [GetPills, setPills] = Pills.use();

    return (
        <View style={{margin: 15}}>
            <FlatList
                data={GetPills}
                extraData={() => GetPills.map((pill) => pill.daysChosen.length)}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item: pill}) => {
                    return (
                        <FlatList
                            data={pill.variants.filter((variant) => variant.daysChosen.length > 0)}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({item: variant}) => {
                                return (
                                    <View style={[styles.button]}>
                                        <View style={[styles.buttonContainer]}>
                                            <View>
                                                <Text style={styles.text}>{pill.name}</Text>
                                                <Text style={styles.text}>{variant.mg} mg</Text>
                                            </View>
                                            <Pressable
                                                onPress={() => {
                                                    showAlert(pill.name, variant.mg, () => setPills(SetDays(GetPills, pill.name, variant.mg, [])))
                                                }}>
                                                <Text style={styles.delete}>Slet</Text>
                                            </Pressable>
                                        </View>
                                        <Separator/>
                                        <View style={[styles.daysContainer]}>
                                            {variant.daysChosen.map((day, index) => {
                                                return <Text style={{marginRight: 6, fontSize: 16}} key={index}>
                                                    {day}dag
                                                    {index !== variant.daysChosen.length - 1 ? ', ' : ''}
                                                </Text>
                                            })}
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    )
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
        color: "black"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
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
    daysContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        flexWrap: "wrap",
    }
});