import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//  Formik
import { Formik } from 'formik';

//  Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea, 
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RigthIcon,
    Colors,
    StyledButtom,
    ButtomText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles';
import { View } from 'react-native';

//  Colors
const { brand, darkLigth, primary } = Colors;

//  Keyboard avoiding Wrapper
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/img/bookstore.png')} />
                <PageTitle>Book-Store</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Welcome");
                    }}
                >
                    { ( { handleChange, handleBlur, handleSubmit, values } ) => 
                    (<StyledFormArea>

                        <MyTextInput 
                            label="Email Addres"
                            icon="mail"
                            placeholder="example@mail.com"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyBoardType="email-addres"
                        />

                        <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButtom onPress={handleSubmit}>
                            <ButtomText>Login</ButtomText>
                        </StyledButtom>
                        <Line />
                        <StyledButtom google={true} onPress={handleSubmit}>
                            <Fontisto name={'google'} color={primary} size={25} />
                            <ButtomText google={true} >Sign In with Google</ButtomText>
                        </StyledButtom>
                        <ExtraView>
                            <ExtraText>Don´t have an account already ? </ExtraText>                        
                            <TextLink onPress={() => navigation.navigate("Signup")} >
                                <TextLinkContent> Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}                    
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    ); 
}

const MyTextInput = ( {label, icon,isPassword, hidePassword, setHidePassword, ...props } ) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RigthIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={30} color={darkLigth} />
                </RigthIcon>
            )}
        </View>
    )
}

export default Login;