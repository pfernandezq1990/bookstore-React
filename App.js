import React, {useState} from 'react';

//  RootStack
import RootStack from './navigators/RootStack';

//  apploading
import AppLoading from 'expo-app-loading';

//  async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Credentials Context
import { CredentialsContext } from './components/CredentialsContext';


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('bookStoreCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(Error))
  }

  if (!appReady) {
    return(
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />)
  }
  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
