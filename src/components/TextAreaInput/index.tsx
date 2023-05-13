/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import { Container, Input, Label } from './styles'
import { useTheme } from 'styled-components/native'
import { TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label: string
}

export const TextAreaInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </Container>
    )
  },
)
