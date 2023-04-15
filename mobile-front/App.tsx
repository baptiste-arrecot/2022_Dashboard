import NavBar from './components/routes/navBar/NavBar';
import Login from './components/routes/login/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import createStore, { StoreContext } from './components/utils/Store'

const App = () => {
  const store = createStore();

  return (
    <SafeAreaProvider>
      <StoreContext.Provider value={store}>
        {!store.token ? <Login/> : <NavBar/>}
      </StoreContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;