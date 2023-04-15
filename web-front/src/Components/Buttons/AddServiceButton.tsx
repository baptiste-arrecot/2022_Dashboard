import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './AddServiceButton.css';

export default function AddService(props: any) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleMenuSelection = (event: any) => {
        handleMenuClose();
        props.onAddService(event.currentTarget.id);
    }
    return (
        <div>
            <div className="add-widget" onClick={handleMenuOpen} id="add-button">
                <FontAwesomeIcon icon={faPlus} size="3x" />
            </div>
            <Menu
                id="widgets-list"
                MenuListProps={{
                    'aria-labelledby': 'add-button',
                }}
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleMenuClose }
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: 300,
                    },
                }}
            >
                {
                    Object.entries(props.services).map(([key, service]: any) => {
                        return (
                        <MenuItem key={key} id={key} onClick={handleMenuSelection}>
                            {service.name}
                        </MenuItem>
                    )})
                }
            </Menu>
        </div>
    );
}
