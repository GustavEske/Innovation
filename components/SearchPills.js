import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, TextInput, Alert, Button} from "react-native";
import {Pills} from "../StateMachine"
import {HideIfNotInSearch, Separator, SetDays, SetShow} from "./Utils";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function SearchPillsContainer({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchPills"
                options={{title: "Søg piller"}}
                component={SearchPills}
            />
            <Stack.Screen name="PillProfile"
                          component={PillProfile}
                          options={({route}) => ({title: route.params.name})}/>
        </Stack.Navigator>
    )
}

const PillProfile = ({navigation, route}) => {
    const [GetPills, setPills] = Pills.use();
    const [hasSaved, setHasSaved] = useState(false)
    const [daysChosen, setDaysChosen] = useState([])

    const days = [
        'Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør', 'Søn'
    ]

    const dayDisplay = (day) => {
        const myIndex = daysChosen.indexOf(day)
        const isSelected = myIndex !== -1

        return (
            <Pressable
                onPress={() => {
                    if (isSelected) {
                        const prevDaysChosen = [...daysChosen]
                        prevDaysChosen.splice(myIndex, 1)

                        setDaysChosen(prevDaysChosen)
                    } else {
                        setDaysChosen([...daysChosen, day])
                    }
                }}
            >
                {isSelected &&
                <View style={[styles.variantBoxPicked, styles.variantBoxNoWidth]}>
                    <Text style={[styles.variantTextPicked, styles.variantText]}>{day}dag</Text>
                </View>
                }
                {!isSelected &&
                <View style={[styles.variantBoxChoice, styles.variantBoxNoWidth]}>
                    <Text style={[styles.variantBoxChoice, styles.variantText]}>{day}dag</Text>
                </View>
                }
            </Pressable>
        )
    }

    return (
        <View style={styles.pillDescriptionContainer}>
            <Text style={{
                fontSize: 24,
                textAlign: "center",
                marginBottom: 15
            }}>{route.params.strength}mg</Text>
            <FlatList
                data={days}
                keyExtractor={(_, index) => index.toString()}
                extraData={days.length}
                renderItem={({item: day}) => dayDisplay(day)}
                column
            />
            <Pressable
                disabled={hasSaved}
                onPress={() => {
                    setHasSaved(true)
                    setPills(SetDays(GetPills, route.params.name, route.params.strength, daysChosen))
                    navigation.navigate('SearchPills')
                }}>
                <View style={[styles.variantBoxSave, styles.variantBoxNoWidth]}>
                    {hasSaved && <Text style={[styles.variantBoxSave, styles.variantText]}>Gemt</Text>}
                    {!hasSaved && <Text style={[styles.variantBoxSave, styles.variantText]}>Gem</Text>}
                </View>
            </Pressable>

        </View>
    )
};


//Her vises de piller samt styrken der er hardcoded i pills.json (af Simon). Søgefunktionen filtrerer de piller fra der ikke skal vises. Hvis pillen er valgt bliver bool:false, og den vises ikke. - Gustav
export default function SearchPills({navigation, route}) {
    const [GetPills, setPills] = Pills.use();
    const [GetSearchTerm, setSearchTerm] = useState('')

    return (
        <View style={{margin: 15, height: "97%"}}>
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
                                            if (strength.daysChosen.length > 0) {
                                                return (
                                                    <View style={[styles.variantBoxPicked, styles.variantBox]}>
                                                        <Text
                                                            style={[styles.variantTextPicked, styles.variantText]}>{strength.mg} mg</Text>
                                                    </View>
                                                )
                                            } else {
                                                return Pick(navigation, route, setPills, GetPills, pill.name, strength.mg, false)
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

//Knap hvor man vælger pillen. - Gustav
function Pick(navigation, route, setPills, GetPills, name, strength, bool) {
    return (
        <View style={[styles.variantBoxChoice, styles.variantBox]}>
            <Pressable
                // disabled={!strength.show}
                onPress={() => {
                    navigation.navigate('PillProfile', {name: name, strength: strength})
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
    variantBoxNoWidth: {
        borderRadius: 100,
        margin: 5,
        alignItems: 'center',
    },
    variantBoxChoice: {
        backgroundColor: 'lightgreen',
    },
    variantBoxPicked: {
        backgroundColor: 'lightgrey',
    },
    variantBoxSave: {
        backgroundColor: 'darkgreen',
        color: 'white',
    },
    inputField: {
        borderWidth: 3,
        borderColor: "lightgrey",
        backgroundColor: "white",
        margin: 5,
        padding: 20,
        fontSize: 22,
        borderRadius: 10,
    },
    pillDescriptionContainer: {
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
    }
});
