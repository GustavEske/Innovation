import React from 'react';
import { StyleSheet, View} from 'react-native';

{/*HUSK AT SKIFTE NAVN*/}
const FirstComponent = (props) => {

    return (
        <View style={styles.container}>
            <text>1</text>
        </View>
    );
}

{/*HUSK AT SKIFTE NAVN*/}
export default FirstComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
