import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { StoreContext } from '../utils/Store';

const url = 'https://www.google.com';

export default function AuthModal(props: any) {
    const { servicesAuth, setServicesAuth } = useContext(StoreContext);

    return (
        <Modal transparent={true}
            visible={props.visible}
            onRequestClose={props.hideModal}
            >
            <TouchableOpacity 
              activeOpacity={1} 
              onPressOut={props.hideModal}
            >
                <ScrollView directionalLockEnabled={true}>
                    <TouchableWithoutFeedback>
                        <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                            <View style={{
                                    width: 300,
                                    height: 500}}>
                                <WebView
                                    source={{ uri: props.url }}
                                    originWhitelist={['*']}
                                    scrollEnabled={false}
                                    startInLoadingState={true}
                                    renderLoading={() => <Text>Loading Auth</Text>}
                                    onLoad={({nativeEvent}) => {
                                        console.log('onLoad', nativeEvent);
                                        if (nativeEvent.url.startsWith('http://localhost:3000/auth_callback')) {

                                            var regex = /[?&]([^=#]+)=([^&#]*)/g,
                                            params: any = {},
                                            match;
                                            while (match = regex.exec(nativeEvent.url)) {
                                                params[match[1]] = match[2];
                                            }
                                            const accessToken = params['accessToken'];
                                            const refreshToken = params['refreshToken'];
                                            const username = params['username'];
                                            console.log('accessToken', accessToken);
                                            console.log('refreshToken', refreshToken);
                                            console.log('username', username);
                                            servicesAuth[props.name] = {
                                                accessToken,
                                                refreshToken,
                                                username
                                            };
                                            props.onSuccess(true);
                                            setServicesAuth({...servicesAuth});
                                            console.log({...servicesAuth});
                                            props.hideModal();
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableOpacity>  
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});