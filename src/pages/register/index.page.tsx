import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as S from './styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+$)/i, {
      message: 'O usuário precisa ter apenas letras hifens e letras',
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        alert(err.response.data.message)
        return
      }

      console.log(err)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Bem=vindo ao Calendar</Heading>
        <Text>Precisamos de algumas informações para criar seu perfil</Text>

        <MultiStep size={4} currentStep={1} />
      </S.Header>

      <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="calendar.com/"
            placeholder="Seu usuário"
            {...register('username')}
          />
        </label>

        {errors.username && (
          <S.FormError size="sm"> {errors.username.message}</S.FormError>
        )}

        <label>
          <Text size="sm">Nome de completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
        </label>

        {errors.name && (
          <S.FormError size="sm"> {errors.name.message}</S.FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </S.Form>
    </S.Container>
  )
}

export default Register
