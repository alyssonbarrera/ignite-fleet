// eslint-disable-next-line camelcase
import '@libs/dayjs'
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
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Routes } from '@routes/index'
import { SignIn } from '@screens/SignIn'
import { RealmProvider, syncConfig } from '@libs/realm'
import { Loading } from '@components/Loading'
import { useNetInfo } from '@react-native-community/netinfo'
import { TopMessage } from '@components/TopMessage'
import { WifiSlash } from 'phosphor-react-native'

export default function App() {
  const netInfo = useNetInfo()
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  setBackgroundColorAsync(theme.COLORS.GRAY_800)

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          {!netInfo.isConnected && (
            <TopMessage title="Você está off-line" icon={WifiSlash} />
          )}

          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
