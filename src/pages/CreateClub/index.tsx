import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import File from '../../components/File';

import { useToast } from '../../hooks/toast';

import {
  Container, Wrapper, Top, FormContainer, InputRow,
} from './styles';

type FormData = {
  name: string;
  shield: File;
}

const CreateClub: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    schema.validate(data, {
      abortEarly: false,
    })
      .then(() => {
        if (data.shield) {
          console.log(data);
        } else {
          addToast({
            title: 'Ocorreu um erro!',
            type: 'error',
            description: 'Preencha todo o formulário.',
          });
        }
      }).catch((err) => {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            if (error.path) {
              Object.assign(validationErrors, {
                [error.path]: error.message,
              });
            }
          });

        formRef.current?.setErrors(validationErrors);
        }
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Top>
            <h1>Cadastro de times</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar time</Button>
            </div>
          </Top>
          <FormContainer>
            <fieldset>
              <legend>Dados</legend>
              <InputRow>
                <File name="shield" width={200} height={200} placeholder="Selecione a imagem do time" />
                <Input
                  name="name"
                  label="Nome do time"
                  placeholder="Insira o nome do time"
                  autoFocus
                />
              </InputRow>
            </fieldset>
          </FormContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreateClub;