import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Button, TextInput} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPills from "./components/SearchPills";
import ViewChosenPills from "./components/ChosenPills";
// Noter
// - Kunne slette et valg af en slags pille
// - Kunne logge ind og se sine piller (evt. bare med en hardcoded user og password)
// - Vælg hvor ofte man skal tage pillerne (evt. med en alert med options)
// - Lav pille mg varianter disabled / forsvinde når man har valgt den
// - Søgefunktion - Done

const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Søg piller"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen name="Søg Piller" component={SearchPills} />
            <Tab.Screen name="Mine Piller" component={ViewChosenPills} />
            <Tab.Screen name="C" component={SearchPills} />
        </Tab.Navigator>
    );
}

function AHomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to B"
                onPress={() => navigation.navigate('B')}
            />
        </View>
    );
}

function BHomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to A"
                onPress={() => navigation.navigate('A')}
            />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}


// const Separator = () => (
//     <View style={styles.separator}/>
// );
//
// const ViewAPillChoice = (aPillChoice) => {
//     return (
//         <Text style={styles.title}>{aPillChoice.name} - {aPillChoice.strength} mg</Text>
//     )
// }
//
// const ViewAllMyPillChoices = (props) => {
//     return (
//         <Text>Abe</Text>
//         // <FlatList
//         //     data={props.pills}
//         //     extraData={props.pills.length}
//         //     renderItem={({item}) => ViewAPillChoice(item)}
//         //     keyExtractor={(_, index) => index.toString()}
//         // />
//     )
// }

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

const ViewPillsAndTheirVariants = (AvailPills, pills, setPills, FilteredPills, setFilteredPills) => {
    const [searchTerm, setSearchTerm] = React.useState('')


    return (
        <View style={{width: '90%', height: '80%'}}>
            <Text style={styles.title}>Piller du kan tilføje</Text>
            <TextInput
                placeholder="Søg på piller du vil finde"
                value={searchTerm}
                onChangeText={(term) => {
                    setSearchTerm(term)
                    setFilteredPills(AvailPills.filter(item => item.name.includes(term)))
                }}
                style={styles.inputField}
            />
            <Separator/>
            <FlatList
                data={FilteredPills}
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

// export default function App() {
//     const [toggleView, setToggleView] = React.useState(true);
//     const [AvailPills, setAvailPills] = React.useState(require('./pills.json'))
//     const [pills, setPills] = React.useState([]);
//     const [FilteredPills, setFilteredPills] = React.useState(AvailPills)
//
//     return (
//         <SafeAreaView style={styles.container}>
//             {toggleView ? ViewPillsAndTheirVariants(AvailPills, pills, setPills, FilteredPills, setFilteredPills) : <ViewAllMyPillChoices pills={pills}/>}
//
//             <View
//                 style={{
//                     flexDirection: "row", position: 'absolute',
//                     bottom: 35
//                 }}
//             >
//                 <Button
//                     title="Mine piller"
//                     onPress={() => {
//                         setToggleView(false)
//                     }}
//                 />
//                 <Button
//                     title="Vælg nye piller"
//                     onPress={() => {
//                         setToggleView(true)
//                     }}
//                 />
//             </View>
//
//         </SafeAreaView>
//     );
// }

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
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
});
