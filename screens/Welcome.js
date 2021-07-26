import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea, 
    StyledButtom,
    ButtomText,
    Line,
    WelconmeContainer,
    WelcomeImage,
    Avatar
} from '../components/styles';

//  async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Credentials Context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => {

    //  Context
    const {storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { username, email, photoUrl } = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('../assets/img/bookstorefondo.png');

    const clearLogin = () => {
        AsyncStorage
            .removeItem('bookStoreCredentials')
            .then(()  => {
                setStoredCredentials('');
            })
            .catch( (error) => console.log(error))
    }

    return (
        <>
            <StatusBar style='light' />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('../assets/img/bookstorefondo.png')} />
                <WelconmeContainer>
                    <PageTitle welcome={true} >Welcome!</PageTitle>
                    <SubTitle welcome={true} >{username || 'Pablo Fernandez'}</SubTitle>
                    <SubTitle welcome={true} >{email || 'test@test.com'}</SubTitle>

                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                        <Line />
                            <StyledButtom onPress={clearLogin}>
                                <ButtomText>Logout</ButtomText>
                            </StyledButtom>                                              
                    </StyledFormArea>                  
                </WelconmeContainer>
            </InnerContainer>
        </>
    ); 
};
export default Welcome;