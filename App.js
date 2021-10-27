import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Button} from "react-native";

const Separator = () => (
    <View style={styles.separator}/>
);

const APill = (aPillChoice) => {
    return (
        <Text style={styles.title}>{aPillChoice.name} - {aPillChoice.strength} mg</Text>
    )
}

const MyPills = (props) => {
    const pills = props.pills;

    console.log(pills.length)
    console.log(pills)

    return (
        <FlatList
            data={props.pills}
            extraData={props.pills.length}
            renderItem={({item}) => APill(item)}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

const PillVariantChoice = (pill, pills, setPills) => {
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

const ViewPick = (AvailPills, pills, setPills) => {
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
                            {PillVariantChoice(item, pills, setPills)}

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


            {toggleView ? ViewPick(AvailPills, pills, setPills) : <MyPills pills={pills}/>}


            <View
                style={{
                    flexDirection: "row", position: 'absolute',
                    bottom: 35
                }}
            >
                <Button
                    title="Mine piller"
                    onPress={() => {
                        console.log("Mine piller")
                        setToggleView(false)
                    }}
                />
                <Button
                    title="Vælg nye piller"
                    onPress={() => {
                        console.log("Vælg nye piller")
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
