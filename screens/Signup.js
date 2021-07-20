import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//  Formik
import { Formik } from 'formik';

//  Icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
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
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//  Colors
const { brand, darkLigth, primary } = Colors;

//  DateTimePicker
import  DateTimePicker  from '@react-native-community/datetimepicker';

//  Keyboard avoiding View
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper';

//  api cliente
import axios from 'axios';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const [message, setMesagge] = useState();
    const [messageType, setMessageType] = useState();

    //  Actual date of birth to be set
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);        
    }

    const showDatePiker = () => {
        setShow(true);
    }

    //  Form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://10.0.2.2:3001/api/auth/singup';
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, user, status} = result;  

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
                <PageTitle>Book-Store</PageTitle>
                <SubTitle>Account Signup</SubTitle>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}

                <Formik
                    initialValues={{ username: '',name: '',lastname:'',email: '',dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dob};
                        if (values.username == '' || values.password == '' || values.name == '' || values.lastname == '' || values.email == '' || values.dateOfBirth == '' || values.confirmPassword == '') {
                            handleMessage('Please fill all the fields.');
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword) {
                                    handleMessage('Password and Confirm Password does not match');
                                    setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    { ( { handleChange, handleBlur, handleSubmit, values, isSubmitting } ) => 
                    (<StyledFormArea>
                        <MyTextInput 
                            label="Username"
                            icon="person"
                            placeholder="pmejias"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />

                        <MyTextInput 
                            label="Name"
                            icon="person"
                            placeholder="Pedro"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />

                        <MyTextInput 
                            label="Last name"
                            icon="person"
                            placeholder="Mejias"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('lastname')}
                            onBlur={handleBlur('lastname')}
                            value={values.lastname}
                        />

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
                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY - MM - DD"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? dob.toDateString() : ''}
                            isDate={true}
                            editable={false}
                            showDatePiker={showDatePiker}
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

                        <MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        
                        <MsgBox type={messageType}>{message}</MsgBox>
                       
                        {!isSubmitting && <StyledButtom onPress={handleSubmit}>
                            <ButtomText>Signup</ButtomText>
                        </StyledButtom>}

                        {isSubmitting && <StyledButtom disabled={true}>
                            <ActivityIndicator size='large' color={primary} />
                        </StyledButtom>}

                        <Line />                        
                        <ExtraView>
                            <ExtraText>Already have an account ?</ExtraText>                        
                            <TextLink onPress={() => navigation.navigate("Login")}>
                                <TextLinkContent> Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}                    
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    ); 
}

const MyTextInput = ( {label, icon,isPassword, hidePassword, setHidePassword, isDate, showDatePiker, ...props } ) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {
                !isDate && <StyledTextInput {...props} />
            }
            {
                isDate && <TouchableOpacity onPress={showDatePiker}>
                    <StyledTextInput {...props}/>
                </TouchableOpacity>
            }
            {isPassword && (
                <RigthIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={30} color={darkLigth} />
                </RigthIcon>
            )}
        </View>
    )
}

export default Signup;