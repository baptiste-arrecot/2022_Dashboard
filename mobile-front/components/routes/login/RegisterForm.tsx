import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';

import LoginImage from './login.png';
import { postRegister } from './../../../apiRequest/apiDash';

const RegisterForm = (props: any) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`-> ${user} ${password}`);
    postRegister(user, password)
    .then((res: any) => {
      console.log(res);
      console.log("username is " + user + " and password is " + password);
    })
    .catch((error: any) => {
      console.log("error");
    })
    console.log('submit register of ' + user + ' - ' + password);
    props.setIsLogin(true);
  };

  return (
    <View style={styles.center}>
      <Image
        style={{ width: 150, height: 150 }}
        source={LoginImage}/>
      <Text style={{ color: 'black', marginTop: 20, fontSize: 100, textDecorationLine: 'underline' }} >
        Register
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
        onChangeText={newPasswordInput => setPassword(newPasswordInput) }
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={{ color: 'blue', marginTop: 50 }}
        onPress={() => props.setIsLogin(true)}>
        Sign in now
      </Text>
    </View>
  );
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
  },
});

export default RegisterForm;