import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import * as S from './styles'

const Register = () => {
  const session = useSession()
  const router = useRouter()

  console.log({ session })

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = () => {
    signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conect sua agenda!</Heading>

        <Text>
          Conecte seu calendário google para receber automaticamente as horas
          ocupadas e novos eventos
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleConnectCalendar()}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>

        {hasAuthError ? (
          <S.AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso do Google Calendar
          </S.AuthError>
        ) : null}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo <ArrowRight />
        </Button>
      </S.ConnectBox>
    </Container>
  )
}

export default Register
