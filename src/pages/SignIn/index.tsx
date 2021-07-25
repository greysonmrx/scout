import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container, Content, Background, Wrapper, Top,
} from './styles';

// import logoImg from '../../assets/images/auth-background.jpg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(({ email, password }: SignInFormData) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail inválido.')
        .required('O e-mail é obrigatório.'),
      password: Yup.string()
        .min(6, 'No mínimo 6 dígitos.')
        .required('A senha é obrigatória.'),
    });

    schema.validate({ email, password }, { abortEarly: false })
      .then(() => {
        setLoading(true);

        signIn({ email, password })
          .then(() => {
            addToast({
              title: 'Logado com sucesso!',
              description: 'Seus dados foram guardados com êxito.',
            });
          })
          .catch((err) => {
            setLoading(false);

            addToast({
              title: 'Erro na autenticação!',
              type: 'error',
              description: err.response?.data.message,
            });
          });
      })
      .catch((err) => {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      });
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <Wrapper>
          {/* <img src={logoImg} alt="Ligeirinho" /> */}
          <Top>
            <h1>Faça seu login.</h1>
            <p>
              Entre com seus dados que você inseriu durante seu registro para
              entrar no sistema.
            </p>
          </Top>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              label="Endereço de e-mail"
              placeholder="Insira seu e-mail"
            />
            <Input
              name="password"
              type="password"
              label="Senha secreta"
              placeholder="Insira sua senha"
            />
            <Button loading={loading} type="submit">
              Vamos lá!
            </Button>
            <p>
              Ainda não possui uma conta?
              <a href="signup"> Crie agora!</a>
            </p>
          </Form>
        </Wrapper>
        <span>© 2021 Scout. Todos os direitos reservados.</span>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
