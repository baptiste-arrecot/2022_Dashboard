import React, { useContext, useState, useCallback, Suspense } from 'react';
import {
  Text,
  ScrollView,
  Alert,
  Button
} from 'react-native';

import FullTwitch from '../../services/Twitch/FullTwitch/FullTwitch';
import FullDiscord from '../../services/Discord/DiscordFull/DiscordComponent';
import FullReddit from '../../services/Reddit/RedditWidgets/RedditApp';
import FullBnet from '../../services/Bnet/BnetWidgets/BnetWidgets';

import {Picker} from '@react-native-picker/picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreContext } from './../../utils/Store';

import CardElement from '../../services/CardElement';
import AuthModal from '../../layout/AuthModal';

import DiscordLogo from './assets/Discord.png';
import RedditLogo from './assets/Reddit.png';
import TwitchLogo from './assets/Twitch.png';
import BnetLogo from './assets/Bnet.png';

// import ActiveServicesList from './ActiveServicesList';

const BASE_URL = 'http://api.drainboard.tk';

const Home = () => {
  const [selectedValue, setSelectedValue] = useState("Popular");
  const [authModal, setAuthModal] = useState<any>(null);
  const { isDarkMode, display, setDisplay } = useContext(StoreContext);
  const [cardList, setCardList] = useState<any>([]);
  const [isRefresh, setIsRefresh] = useState(false)

  const changeValue = (itemValue: any) => {
    const temp = cardList;
    setSelectedValue(itemValue)
    if (itemValue === 'Twitch') {
      temp.push({name: 'Twitch', color: '#6441A5', logo: TwitchLogo, onAuth: () => {
        setAuthModal({
          name: 'Twitch',
          url: BASE_URL + '/auth/twitch',
          onSuccess: (res: any) => {
            console.log(res);
            setAuthModal(null);
          }
        });}})
      setCardList(temp);
    } if (itemValue === 'Discord') {
      temp.push({name: 'Discord', color: '#7289DA', logo: DiscordLogo, onAuth: () => {
        setAuthModal({
          name: 'Discord',
          url: BASE_URL + '/auth/discord',
          onSuccess: (res: any) => {
            console.log(res);
            setAuthModal(null);
          }
        });}})
      setCardList(temp);
    } if (itemValue === 'Bnet') {
      temp.push({name: 'Bnet', color: '#009AE4', logo: BnetLogo, onAuth: () => {
        setAuthModal({
          name: 'Bnet',
          url: BASE_URL + '/auth/bnet',
          onSuccess: (res: any) => {
            console.log(res);
            setAuthModal(null);
          }
        });}})
      setCardList(temp);
    } if (itemValue === 'Reddit') {
      temp.push({name: 'Reddit', color: '#FF5700', logo: RedditLogo, onAuth: () => {
        setAuthModal({
          name: 'Reddit',
          url: BASE_URL + '/auth/reddit',
          onSuccess: (res: any) => {
            console.log(res);
            setAuthModal(null);
          }
        });
      }})
      setCardList(temp);
    }
  }

  const ListCard = useCallback(() => {
    return cardList.map((item: any, key: any) => (
      <CardElement name={item.name} isAuth={item.isAuth} color={item.color}
              image={item.logo} setCardList={setCardList} cardList={cardList} 
              setIsRefresh={setIsRefresh} isRefresh={isRefresh} onPress={() => item.onAuth()} onOpen={() => setDisplay(item.name)} />
    ));
  }, [isRefresh]);

  return (
    <SafeAreaProvider>
      <ScrollView>
        {display === "" && <ListCard/>}
        {display === "Twitch" && <FullTwitch/>}
        {display === "Discord" && <FullDiscord/>}
        {display === "Reddit" && <FullReddit/>}
        {display === "Bnet" && <FullBnet/>}

      </ScrollView>
          {authModal !== null ? <AuthModal url={authModal.url} name={authModal.name} onSuccess={() => {
            cardList.filter((item: any) => item.name === authModal.name).forEach((item: any) => {
                item.isAuth = true;
            });
            setCardList(cardList);
          }} visible={authModal ? true : false} hideModal={() => setAuthModal(null)} 
          /> : null }
      <Picker
        dropdownIconRippleColor={'#34495E'}
        dropdownIconColor={'#41B883'}
        prompt={'Add services'}
        style={{ marginBottom: 80 }}
        selectedValue={selectedValue}
        onValueChange={changeValue}>
        <Picker.Item label="Twitch" value={"Twitch"} color={isDarkMode ? '#41B883': 'black'}/>
        <Picker.Item label="Discord" value={"Discord"} color={isDarkMode ? '#41B883': 'black'}/>
        <Picker.Item label="Bnet" value={"Bnet"} color={isDarkMode ? '#41B883': 'black'}/>
        <Picker.Item label="Reddit" value={"Reddit"} color={isDarkMode ? '#41B883': 'black'}/>
      </Picker>
    </SafeAreaProvider>
  );
};

export default Home;