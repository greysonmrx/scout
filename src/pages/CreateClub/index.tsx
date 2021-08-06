import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import File from '../../components/File';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

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

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      let fileId: number | undefined;

      if (data.shield) {
        const fileData = new FormData();

        fileData.set('file', data.shield);

        const fileResponse = await api.post('/files', fileData);

        fileId = fileResponse.data.id;
      }

      await api.post('/clubs', {
        name: data.name,
        shield_id: fileId,
      });

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Time cadastrado com sucesso.',
      });

      history.push('/clubs');
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          title: 'Ocorreu um erro!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    }
  }, [setLoading, addToast]);

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
                  required
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
