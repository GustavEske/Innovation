import React from 'react';
import {StyleSheet, View} from "react-native";

export function SetShow(Pills, name, mg, bool) {
    let newPills = Pills.slice()

    newPills.forEach((newPill) => {
        if (newPill.name === name) {
            newPill.variants.forEach((variant) => {
                if (variant.mg === mg) {
                    variant.show = bool
                }
            })
        }
    })

    return newPills
}

export function HideIfNotInSearch(Pills, searchTerm) {
    let newPills = Pills.slice()

    newPills.forEach((pill) => {
        if (searchTerm === "") {
            pill.showInSearch = true;
        } else {
            pill.showInSearch = pill.name.includes(searchTerm);
        }
    })

    return newPills
}

export function VerifyLoginCredentials(username, password) {
    return "admin" === username && "123" === password
}

export const Separator = () => (
    <View style={styles.separator}/>
);

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
