import React from 'react';
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

const Welcome = ({navigation, route}) => {
    const { username, email } = route.params;
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
                        <Avatar resizeMode="cover" source={require('../assets/img/bookstore.png')} />
                        <Line />
                            <StyledButtom onPress={() => {navigation.navigate('Login')}}>
                                <ButtomText>Logout</ButtomText>
                            </StyledButtom>                                              
                    </StyledFormArea>                  
                </WelconmeContainer>
            </InnerContainer>
        </>
    ); 
};
export default Welcome;