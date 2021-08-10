import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Wrapper, Top, FormContainer, InputRow,
} from './styles';

type FormData = {
  title: string;
  description: string;
};

const CreateTask: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/tasks', {
        title: data.title,
        description: data.description,
        status,
      });

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Tarefa cadastrada com sucesso.',
      });

      history.push('/tasks');
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
  }, [addToast, history, status]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Top>
            <h1>Cadastro de tarefas</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar tarefa</Button>
            </div>
          </Top>
          <FormContainer>
            <fieldset>
              <legend>Dados</legend>
              <InputRow style={{ gridTemplateColumns: '1fr 1fr' }}>
                <Input
                  name="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  required
                  autoFocus
                />
                <Select
                  name="status"
                  label="Status"
                  onChange={({ value }) => setStatus(value)}
                  placeholder="Selecione um status"
                  options={[{
                    value: 0,
                    label: 'Aberta',
                  }, {
                    value: 1,
                    label: 'Em progresso',
                  },
                  {
                    value: 2,
                    label: 'Fechada',
                  }]}
                />
              </InputRow>
              <InputRow columns={1}>
                <TextArea
                  name="description"
                  label="Descrição"
                  placeholder="Insira uma descrição da tarefa"
                  required
                />
              </InputRow>
            </fieldset>
          </FormContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreateTask;
