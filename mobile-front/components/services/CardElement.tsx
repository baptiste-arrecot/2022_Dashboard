import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CardElement = (props: any) => {

  const deleteCard = () => {
    var temp = props.cardList;
    var toto = temp.findIndex((e: any) => e.name === props.name)
    temp.splice(toto, 1)
    props.setCardList(temp);
    props.setIsRefresh(!props.isRefresh)
  }

  return (
    <Card
      containerStyle={{ backgroundColor: props.color }}>
      <TouchableOpacity
        onPress={() => deleteCard()}>
        <FontAwesomeIcon icon={faXmark} />
      </TouchableOpacity>
      <Card.Image
        style={{ padding: 0, resizeMode: 'contain', aspectRatio: 1 }}
        source={ props.image }/>
      <Card.Divider />
      <Card.Title style={{ fontSize: 20 }}>{props.name}</Card.Title>
      {props.isAuth ?
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            props.onOpen();
          }}
          title={'Ouvrir'}
        />
          :
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            props.onPress();
          }}
          title={'Se Connecter'}
        />}
    </Card>
  )
};

export default CardElement;