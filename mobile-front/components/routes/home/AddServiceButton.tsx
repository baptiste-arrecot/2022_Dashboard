import React, { useState } from 'react';
import  { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Menu } from 'react-native-paper';

const AddServiceButton = (props: any) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleMenuSelection = (key: number) => {
    handleMenuClose();
    props.onAddService(key);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => handleMenuOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </TouchableOpacity>
      <Menu
      onDismiss={handleMenuClose}
      visible={open}
      anchor={anchorEl}
      // PaperProps={{
      //   style: {
      //     maxHeight: 48 * 4.5,
      //     width: 300,
      //   }
      // }}
      >
      {
        props.services.map((service: any, key: number) => {
        return (
          <Menu.Item title={service?.name} key={key} onPress={() => {handleMenuSelection(key);}}>
          {service?.name}
          </Menu.Item>
        )
        })
      }
    </Menu>
    </>
  );
}

export default AddServiceButton;