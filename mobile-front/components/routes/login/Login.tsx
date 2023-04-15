import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import { StoreContext } from '../../utils/Store';
import LoginForm from './LoginForm';
import Bg from './bg-01.jpg';
import RegisterForm from './RegisterForm';

const Login = () => {
  const { setUsername, setToken } = useContext(StoreContext);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Bg}
        resizeMode="cover"
        style={styles.image}>
        {
          (isLogin) ?
          <LoginForm setIsLogin={setIsLogin} setUsername={setUsername} setToken={setToken} /> :
          <RegisterForm setIsLogin={setIsLogin}/>
        }
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    height: '100%'
  },
  image: {
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
});

export default Login;