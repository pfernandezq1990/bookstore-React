import React from 'react';

//  React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//  Colors
import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;

//#region Screens

import Login from '../screens/Loggin';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import UserProfile from '../screens/pages/UserProfile'

//#endregion

const Stack = createStackNavigator();

//  Credentials Context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            { ({storedCredentials}) => (
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'transparent'
                        },
                        headerTintColor: tertiary,
                        headerTransparent: true,
                        headerTitle: '',
                        headerLeftContainerStyle: {
                            paddingLeft: 20
                        }
                    }}
                    initialRouteName="Login"
                >
                    {storedCredentials ? 
                    <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome} />
                    : <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                    </>
                }
                    
                </Stack.Navigator>
            )}
        </CredentialsContext.Consumer>
        
    )
}

const ProfileStack = () => {
    return (
        <CredentialsContext.Consumer>
            { ({ storedCredentials }) => (
                <Stack.Navigator>
                    {storedCredentials ?
                        <Stack.Screen name="Profile" component={UserProfile} />
                        : <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Signup" component={Signup} />
                        </>
                    }
                </Stack.Navigator>
            )}
        </CredentialsContext.Consumer>                
    )
}

export {RootStack, ProfileStack};