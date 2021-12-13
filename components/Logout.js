import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {IsLoggedIn} from "../StateMachine";

//Log ud funktion der sender brugeren tilbage til login siden - Simon
export default function ViewLogOutScreen() {
    const [GetIsLoggedIn, setIsLoggedIn] = IsLoggedIn.use();

    return (
        <View style={styles.container}>
            <View style={[styles.variantBoxChoice, styles.variantBox]}>
                <Pressable
                    onPress={() => {
                        setIsLoggedIn(false)
                    }}
                >
                    <Text style={[styles.variantText, styles.variantTextChoice]}>Log ud</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: 'transparent',
        padding: 20,
        margin: 0
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
    variantText: {
        fontSize: 22,
        lineHeight: 60,
        fontWeight: 'normal',
        letterSpacing: 0.25,
    },
    variantTextChoice: {
        color: 'black',
    },
    variantBox: {
        borderRadius: 100,
        margin: 50,
        width: 100,
        alignItems: 'center',
    },
    variantBoxChoice: {
        backgroundColor: 'red',
    },
})