import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchPills, {SearchPillsContainer} from "./components/SearchPills";
import ViewChosenPills from "./components/ChosenPills";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {IsLoggedIn, Pills} from "./StateMachine";
import ViewLoginScreen from "./components/Login";
import ViewLogOutScreen from "./components/Logout";

//De forskellige tabs brugeren kan navigere rund på i appen - Simon
const Tab = createBottomTabNavigator();

function MyTabs() {
    const [GetPills, setPills] = Pills.use();

    const NoOfChosenPills = () => {
        let number = 0

        GetPills.forEach((pill) => {
            pill.variants.forEach((variant) => {
                if (variant.daysChosen.length > 0) {
                    number++
                }
            })
        })

        return number
    }

    return (
        <Tab.Navigator
            initialRouteName="Søg piller"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen name="Søg Piller"
                        component={SearchPillsContainer}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="magnify" color={color} size={size}/>
                            ),
                        }}
            />
            <Tab.Screen name="Mine Piller"
                        component={ViewChosenPills}
                        options={{
                            tabBarLabel: 'Mine Piller',
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="pill" color={color} size={size}/>
                            ),
                            tabBarBadge: NoOfChosenPills()
                        }}
            />
            <Tab.Screen name="Log ud"
                        component={ViewLogOutScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="exit-run" color={color} size={size}/>
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}

//Hvis brugeren er logget ind vises appens funktioner, ellers vises login siden - Simon
export default function App() {
    const [GetIsLoggedIn, setIsLoggedIn] = IsLoggedIn.use();

    if (GetIsLoggedIn) {
        return (
            <NavigationContainer>
                <MyTabs/>
            </NavigationContainer>
        );
    } else {
        return (
            <ViewLoginScreen/>
        )
    }

}
