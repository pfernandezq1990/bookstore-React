import React, {useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    StyledFormArea, 
    Line,
    ProfileContainer
} from '../../components/styles';

//  Asycn Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Credentials Context
import { CredentialsContext } from '../../components/CredentialsContext';

//  Keyboard avoiding Wrapper
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper';

const UserProfile = ({ navigation }) => {

    //  Context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { username, emael, photoUrl } = storedCredentials;    

    return (
        <>
            <StatusBar style='light' /> 
            <InnerContainer>
                <ProfileContainer>
                    <PageTitle profile={true} >User Profile</PageTitle>

                    <StyledFormArea>
                        <Line />
                    </StyledFormArea>
                </ProfileContainer>
            </InnerContainer>
        </>
    );
};

export default UserProfile;

