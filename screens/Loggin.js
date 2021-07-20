import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//  Formik
import { Formik } from 'formik';

//  Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//  API CLIENT axios
import axios from 'axios';

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