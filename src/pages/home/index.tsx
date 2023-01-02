import { Heading, Text } from '@ignite-ui/react'
import * as S from './styles'
import Image from 'next/image'
import previewImage from '../../assets/app-preview.png'
import ClaimUsernameForm from './ClaimUsernameForm'

export default function Home() {
  return (
    <S.Container as="h1">
      <S.Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que pessoas marquem agendamentos no
          seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </S.Hero>

      <S.Preview>
        <Image
          src={previewImage}
          height={400}
          alt="Calendário simbolizndo a aplicação em funcionamento"
          quality={100}
          priority
        />
      </S.Preview>
    </S.Container>
  )
}
