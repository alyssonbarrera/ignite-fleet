import { Alert } from 'react-native'
import { X } from 'phosphor-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useObject, useRealm } from '@libs/realm/index'
import { Historic } from '@libs/realm/schemas/Historic'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { stopLocationTask } from 'src/tasks/backgroundLocationTask'

import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, id)
  const { goBack } = useNavigation()
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => removeVehicleUsage(),
      },
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo',
        )
      }

      await stopLocationTask()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')

      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo')
    }
  }

  return (
    <Container>
      <Header title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>
      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}
    </Container>
  )
}
