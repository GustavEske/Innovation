import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {IsLoggedIn} from "../StateMachine";
import {VerifyLoginCredentials} from "./Utils";

//Simpel login funktion med premade users - Simon
export default function ViewLoginScreen() {
    const [GetIsLoggedIn, setIsLoggedIn] = IsLoggedIn.use();
    const [GetUsername, SetUsername] = useState('admin')
    const [GetPassword, SetPassword] = useState('123')

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder="Brugernavn"
                    value={GetUsername}
                    onChangeText={(username) => SetUsername(username)}
                    style={styles.inputField}
                />

                <TextInput
                    placeholder="Adgangskode"
                    value={GetPassword}
                    onChangeText={(password) => SetPassword(password)}
                    style={styles.inputField}
                />
            </View>

            <View style={[styles.variantBoxChoice, styles.variantBox]}>
                <Pressable
                    onPress={() => {
                        setIsLoggedIn(VerifyLoginCredentials(GetUsername, GetPassword))
                    }}
                >
                    <Text style={[styles.variantText, styles.variantTextChoice]}>Log ind</Text>
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
        backgroundColor: 'lightgreen',
    },
})
