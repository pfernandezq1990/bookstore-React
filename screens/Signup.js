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
import { View, TouchableOpacity } from 'react-native';

//  Colors
const { brand, darkLigth, primary } = Colors;

//  DateTimePicker
import  DateTimePicker  from '@react-native-community/datetimepicker';

//  Keyboard avoiding View
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper'

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

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
                    initialValues={{fullname: '',email: '',dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Welcome");
                    }}
                >
                    { ( { handleChange, handleBlur, handleSubmit, values } ) => 
                    (<StyledFormArea>
                        <MyTextInput 
                            label="Full Name"
                            icon="person"
                            placeholder="Pedro Mejias"
                            placeholderTextColor={darkLigth}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
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
                        
                        <MsgBox>...</MsgBox>
                        <StyledButtom onPress={handleSubmit}>
                            <ButtomText>Signup</ButtomText>
                        </StyledButtom>
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