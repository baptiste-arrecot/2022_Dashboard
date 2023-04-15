import React, {useContext} from 'react';
import { ServicesContext } from '../Context/ServicesContext';
import ActiveServicesList from '../Layouts/ActiveServicesList';
import Header from '../Layouts/Header';
import Drawer from '../Buttons/Drawer';

export default function Home() {
    const { displayedService } = useContext(ServicesContext);
    if (displayedService) {
        return (
            <>
                <Drawer />
                <displayedService.ServiceComponent />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <ActiveServicesList />
            </>
        );
    }
}