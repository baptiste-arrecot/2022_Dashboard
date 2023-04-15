import React, { useContext }  from 'react';
import { Switch, Text, Button } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreContext } from '../../utils/Store';


const Setting = () => {
  const { isDarkMode, setIsDarkMode, username, setToken, setUsername } = useContext(StoreContext);

  return (
    <SafeAreaProvider>
      <Text
        style={{color: isDarkMode ? 'white' : 'black'}}
      >{`USERNAME: ${username}`}
      </Text>
      <Switch
        onValueChange={() => setIsDarkMode(!isDarkMode)}
        value={isDarkMode}/>
      <Button
        title={'Disconnect'}
        onPress={() => {
          setUsername('');
          setToken(null);
        }}/>
    </SafeAreaProvider>
  );
}

export default Setting;