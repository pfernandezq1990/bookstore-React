import React from 'react';

//  Keyboard avoiding view
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { color } from 'react-native-reanimated';

import { Colors } from './styles';
const {primary} = Colors;

const KeyboardAvoidingWrapper = ({ children}) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: primary }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;