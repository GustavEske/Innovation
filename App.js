import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Button} from "react-native";

// Noter
// - Kunne slette et valg af en slags pille
// - Kunne logge ind og se sine piller (evt. bare med en hardcoded user og password)
// - Vælg hvor ofte man skal tage pillerne (evt. med en alert med options)
// - Lav pille mg varianter disabled / forsvinde når man har valgt den

const Separator = () => (
    <View style={styles.separator}/>
);

const ViewAPillChoice = (aPillChoice) => {
    return (
        <Text style={styles.title}>{aPillChoice.name} - {aPillChoice.strength} mg</Text>
    )
}

const ViewAllMyPillChoices = (props) => {
    const pills = props.pills;

    console.log(pills.length)
    console.log(pills)

    return (
        <FlatList
            data={props.pills}
            extraData={props.pills.length}
            renderItem={({item}) => ViewAPillChoice(item)}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

const ViewPillStrengthVariants = (pill, pills, setPills) => {
    return (
        <FlatList
            data={pill.variants}
            renderItem={({item}) => {

                return (
                    <Button
                        title={`${item} mg`}
                        onPress={() => {
                            setPills(pills.concat({
                                "name": pill.name,
                                "strength": item
                            }))
                        }}
                    />
                )
            }}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

const ViewPillsAndTheirVariants = (AvailPills, pills, setPills) => {
    return (
        <View style={{width: '90%', height: '80%'}}>
            <Text style={styles.title}>Piller du kan tilføje</Text>
            <Separator/>
            <FlatList
                data={AvailPills}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <View style={styles.PillChoice}>
                            <Text style={styles.title}>{item.name}</Text>
                            {ViewPillStrengthVariants(item, pills, setPills)}

                            <Separator/>
                        </View>
                    )
                }}
            />
            <Separator/>
        </View>
    )
}

export default function App() {
    const [toggleView, setToggleView] = React.useState(true);
    const [AvailPills, setAvailPills] = React.useState(require('./pills.json'))
    const [pills, setPills] = React.useState([]);

    return (
        <SafeAreaView style={styles.container}>
            {toggleView ? ViewPillsAndTheirVariants(AvailPills, pills, setPills) : <ViewAllMyPillChoices pills={pills}/>}

            <View
                style={{
                    flexDirection: "row", position: 'absolute',
                    bottom: 35
                }}
            >
                <Button
                    title="Mine piller"
                    onPress={() => {
                        setToggleView(false)
                    }}
                />
                <Button
                    title="Vælg nye piller"
                    onPress={() => {
                        setToggleView(true)
                    }}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    PillChoice: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    title: {
        fontSize: 24
    }
});
