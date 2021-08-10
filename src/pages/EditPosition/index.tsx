import React, {
  useCallback, useRef, useState,
 useEffect } from 'react';
import * as Yup from 'yup';
import {
  useHistory, useRouteMatch,
} from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Wrapper, Top, FormContainer, InputRow,
} from './styles';


type FormData = {
  name: string;
}

const EditPosition: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [initialData, setInitialData] = useState<any>();
  const [loading, setLoading] = useState(false);

  async function fetchPositionDetails(): Promise<void> {
    try {
      const positionResponse = await api.get(`/positions/${params.id}`);

      setInitialData(positionResponse.data);
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

      await api.put(`/positions/${params.id}`, data);

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Posição editada com sucesso.',
      });

      history.push('/positions');
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }, [addToast]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    fetchPositionDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Top>
            <h1>Edição de posições</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar posição</Button>
            </div>
          </Top>
          {
            initialData ? (
              <FormContainer>
                <fieldset>
                  <legend>Dados</legend>
                  <InputRow>
                    <Input
                      name="name"
                      label="Nome da posição"
                      placeholder="Insira o nome da posição"
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

export default EditPosition;
