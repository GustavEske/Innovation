import React, {useState} from 'react';
// import FirstComponent from "./components/FirstComponent.js";
import {StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList} from "react-native";

const pills = require('./pills.json')


// const LogIn = () => {
//   const [email, setEmail] = useState('')
//
//   const logger = (email) => {
//     console.log(email)
//   }
//
//   return (
//       <TextInput
//           placeholder="email"
//           value={email}
//           onChangeText={(email) => logger(email)}
//           style={styles.inputField}
//       />
//   );
// }

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pills}
                renderItem={({ item }) => (
                    <Text>{ item.name }</Text>
                )}
            />
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
});
