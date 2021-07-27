import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import  { RootStack , ProfileStack, WelcomeStack } from './RootStack';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return(
        <Drawer.Navigator 
            initialRouteName="Login">
                <Drawer.Screen name="Login" component={RootStack} />
                <Drawer.Screen name="Profile" component={ProfileStack} />   
        </Drawer.Navigator>
    )
}

export default MyDrawer;