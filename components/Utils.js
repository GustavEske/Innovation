import React from 'react';
import {StyleSheet, View} from "react-native";

export function FilterChosenPillsOutOfAvailablePills(AvailablePills, ChosenPills) {
    let copyAvail = AvailablePills.slice()

    copyAvail.forEach((aPill) => {
        ChosenPills.forEach((cPill) => {
            if (aPill.name === cPill.name) {
                aPill.variants.forEach((strength) => {
                    if (cPill.strength === strength.mg) {
                        strength.show = false
                    }
                })
            }
        })
    })

    return copyAvail
}


export function deleteChosenPill(ChosenPills, name, strength) {
    return ChosenPills.filter((cPill) => {
        if (cPill.name === name && cPill.strength === strength) {
            return false
        }

        return true
    })
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
