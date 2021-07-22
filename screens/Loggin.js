import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//  Formik
import { Formik } from 'formik';

//  Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//  API CLIENT axios
import axios from 'axios';

//  Google sign in
import * as Google from 'expo-google-app-auth';

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
import { View, ActivityIndicator } from 'react-native';

//  Colors
const { brand, darkLigth, primary } = Colors;

//  Keyboard avoiding Wrapper
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMesagge] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://10.0.2.2:3001/api/auth/singin';
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, user, token} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    navigation.navigate('Welcome', { ...user});
                }
                setSubmitting(false);
            })
            .catch((error) => {
                if (error.response) {
                    setSubmitting(false);
                    handleMessage(error.response.data.message);
                } else if (error.request) {
                    setSubmitting(false);
                    console.log(error.request);
                    handleMessage("An error ocurred, please check your network and try again");
                }
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMesagge(message);
        setMessageType(type);
    }

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = { 
            iosClientId: `709020585375-79cppvabvklenjlijevfeoda7h542kbv.apps.googleusercontent.com`,
            androidClientId: `709020585375-b1mr5i2nkcp31clrq44bjvu5ooukj7ai.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };

        Google
            .logInAsync(config)
            .then( (result) => {
                const {type, user} = result;

                if (type == 'success' ) {
                    const {email, name, phtoUrl} = user;
                    handleMessage('Google signin successfull', 'SUCCESS');
                    setTimeout(() => navigation.navigate('Welcome', {email, name, phtoUrl}), 1000);
                } else {
                    handleMessage('Google sign up was canceled.');
                }
                setGoogleSubmitting(false);
            } )
            .catch( error => {
                console.log(error);
                handleMessage('An error occurred. Check your network and try again.');
                setGoogleSubmitting(false);
            })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/img/bookstore.png')} />
                <PageTitle>Book-Store</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                       if (values.username == '' || values.password == '') {
                           handleMessage('Please fill all the fields.');
                           setSubmitting(false);
                       } else {
                           handleLogin(values, setSubmitting);
                       }
                    }}
                >
                    { ( { handleChange, handleBlur, handleSubmit, values, isSubmitting } ) => 
                    (<StyledFormArea>

                        <MyTextInput 
                            label="Username"
                            icon="person"
                            placeholder="pfernandez"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
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
                        <MsgBox type={messageType} >{message}</MsgBox>

                        {!isSubmitting && <StyledButtom onPress={handleSubmit}>
                            <ButtomText>Login</ButtomText>
                        </StyledButtom>}

                        {isSubmitting && <StyledButtom disabled={true}>
                            <ActivityIndicator size='large' color={primary} />
                        </StyledButtom>}

                        <Line />                        

                        {!googleSubmitting && (
                            <StyledButtom google={true} onPress={handleGoogleSignin}>
                            <Fontisto name={'google'} color={primary} size={25} />
                            <ButtomText google={true} >Sign In with Google</ButtomText>
                        </StyledButtom>
                        )}

                        {googleSubmitting && (
                            <StyledButtom google={true} disabled={true} >
                                <ActivityIndicator size='large' color={primary} />
                        </StyledButtom>
                        )}
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