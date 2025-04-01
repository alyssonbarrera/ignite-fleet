import { Fragment } from 'react'
import { Container, Line } from './styles'
import { Car, Flag } from 'phosphor-react-native'
import { LocationInfo, LocationInfoProps } from '@components/LocationInfo'

type Props = {
  departure: LocationInfoProps
  arrival?: LocationInfoProps | null
}

export function Locations({ departure, arrival = null }: Props) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <Fragment>
          <Line />

          <LocationInfo
            icon={Flag}
            label={arrival.label}
            description={arrival.description}
          />
        </Fragment>
      )}
    </Container>
  )
}
