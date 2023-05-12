// eslint-disable-next-line camelcase
import theme from '@theme/index'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { REALM_APP_ID } from '@env'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider, UserProvider } from '@realm/react'

import { Home } from '@screens/Home'
import { SignIn } from '@screens/SignIn'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
