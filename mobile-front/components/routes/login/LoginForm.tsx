import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';

import LoginImage from './login.png';
import { postLogin } from './../../../apiRequest/apiDash';

const LoginForm = (props: any) => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit ' + user + ' ' + password);
    postLogin(user, password)
    .then((res: any) => {
			console.log("username is " + user + " and password is " + password);
      setPassword("");
      setUser("");
			props.setToken(res);
      props.setUsername(user)
		})
		.catch((error: any) => {
			console.log("error");
		})
  }

  return (
    <View style={styles.center}>
      <Image
        style={{ width: 150, height: 150 }}
        source={LoginImage}/>
      <Text style={{ color: 'black', margin: 20, fontSize: 50, textDecorationLine: 'underline' }} >
        Sign in
      </Text>
      <TextInput
        style={styles.textInput}
        autoCompleteType="username"
        textContentType="username"
        placeholder="username"
        onChangeText={ newUserInput => setUser(newUserInput) }
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        onChangeText={newPasswordInput => setPassword(newPasswordInput)}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={{ color: 'blue', marginTop: 50 }}
        onPress={() => props.setIsLogin(false)}>
        Sign up now
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
    width: '50%',
    borderWidth: 0.3,
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoginForm;