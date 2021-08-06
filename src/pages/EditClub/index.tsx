import React, { useCallback, useRef, useState , useEffect } from 'react';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
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

const EditClub: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [initialData, setInitialData] = useState<any>();
  const [loading, setLoading] = useState(false);

  async function fetchClubDetails(): Promise<void> {
    try {
      const clubResponse = await api.get(`/clubs/${params.id}`);

      setInitialData(clubResponse.data);
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

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

      const editedClubData = {
        name: data.name,
      };

      if (data.shield) {
        const fileData = new FormData();

        fileData.set('file', data.shield);

        const fileResponse = await api.post('/files', fileData);

        Object.assign(editedClubData, {
          shield_id: fileResponse.data.id,
        });
      }

      await api.put(`/clubs/${params.id}`, editedClubData);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Time editado com sucesso.',
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
  }, [setLoading, history, params]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    fetchClubDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Top>
            <h1>Edição de times</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar time</Button>
            </div>
          </Top>
          {
            initialData ? (
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
            ) : (
              <p>Carregando...</p>
            )
          }
        </Form>
      </Wrapper>
    </Container>
  );
};

export default EditClub;
