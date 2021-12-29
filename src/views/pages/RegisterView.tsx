import { PescaButton } from '@components/input/PescaButton';
import { PescaInputField } from '@components/input/PescaInputField';
import variables from '@config/variables';
import { AuthContext } from '@context/AuthContext';
import { StyleContext } from '@context/StyleContext';
import { ThemeContext } from '@context/ThemeContext';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Diplay message for the registration dialog.
 */
type Messages = {
  error: string | undefined;
  success: string | undefined;
};

type RegisterViewProps = {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
};

export const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);

  const [valid, setValid] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const [email, setMail] = useState<string>('');

  const [message, setMessages] = useState<Messages>({ error: undefined, success: undefined });

  useEffect(() => {
    function validate() {
      return (
        !!email.length &&
        !!username.length &&
        !!displayName.length &&
        !!password.length &&
        !!confirmPw.length &&
        password === confirmPw
      );
    }
    setValid(validate());
  }, [username, displayName, password, confirmPw, email]);

  function onSubmit() {
    if (valid) {
      register({ username, password, displayName, email }).then(([success, error]) => {
        if (success) {
          setMessages({
            error: undefined,
            success: 'Please check your mailbox for a confirmation email! Also check your spam box.',
          });
        } else {
          setMessages({
            success: undefined,
            error,
          });
        }
      });
    }
  }

  const theme = React.useContext(ThemeContext);
  const { Texts } = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.content.background,
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 60,
    },
    formHeadingContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    formHeading: {
      fontSize: variables.font.size.large,
    },
    infoMessage: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },
    errorView: {
      backgroundColor: theme.signals.error,
    },
    errorText: {
      color: Texts.colors.secondary,
    },
    successView: {
      backgroundColor: theme.signals.success,
    },
    successText: {
      color: Texts.colors.secondary,
    },
    formContainer: {
      width: '80%',
      marginTop: 120,
    },
    buttonContainer: {
      marginTop: 15,
    },
    button: {},
    buttonContent: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: theme.buttons.form.invalid.background,
    },
    validFormbutton: {
      backgroundColor: theme.buttons.form.valid.background,
    },
    buttonText: {
      fontSize: variables.font.size.extraSmall,
      color: theme.buttons.form.color,
    },
    error: {
      borderColor: theme.signals.error,
    },
    link: {
      marginTop: 25,
    },
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.wrapper]}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={[styles.formContainer]}>
            <View style={[styles.formHeadingContainer]}>
              <Text style={[styles.formHeading]}>Register</Text>
            </View>
            {/* Display possible error */}
            {message.error && (
              <View style={[styles.infoMessage, styles.errorView]}>
                <Text style={[styles.errorText]}>{message.error}</Text>
              </View>
            )}
            {/* Display possible succes message */}
            {message.success && (
              <View style={[styles.infoMessage, styles.successView]}>
                <Text style={[styles.successText]}>{message.success}</Text>
              </View>
            )}
            <PescaInputField
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setMail}
              onSubmitEditing={onSubmit}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <PescaInputField
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onSubmit}
              textContentType="username"
            />
            <PescaInputField
              label="Displayname"
              placeholder="Displayname"
              value={displayName}
              onChangeText={setDisplayName}
              onSubmitEditing={onSubmit}
            />
            <PescaInputField
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onSubmit}
              secureTextEntry
              textContentType="newPassword"
            />
            <PescaInputField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPw}
              onChangeText={setConfirmPw}
              onSubmitEditing={onSubmit}
              style={password !== confirmPw && styles.error}
              secureTextEntry
              textContentType="newPassword"
            />
            <View style={[styles.buttonContainer]}>
              <PescaButton onPress={onSubmit} style={[styles.button]}>
                <View style={[styles.buttonContent, valid && styles.validFormbutton]}>
                  <Text style={[styles.buttonText]}>Register</Text>
                </View>
              </PescaButton>
            </View>
          </View>

          <View style={[styles.link]}>
            <PescaButton onPress={() => navigation.navigate('login')}>
              <Text>Already got an accout? Login!</Text>
            </PescaButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
