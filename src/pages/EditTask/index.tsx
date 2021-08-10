import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import statusOptions from '../../utils/statusOptions';

import {
  Container, Wrapper, Top, FormContainer, InputRow,
} from './styles';
import TextArea from '../../components/TextArea';

type FormData = {
  title: string;
  description: string;
};

const EditTask: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/tasks/${params.id}`, {
        title: data.title,
        description: data.description,
        status,
      });

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Tarefa editada com sucesso.',
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

  async function fetchTaskDetails(): Promise<void> {
    try {
      const taskResponse = await api.get(`/tasks/${params.id}`);

      const { title, description } = taskResponse.data;

      setStatus(taskResponse.data.status);
      setInitialData({ title, description });
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Top>
            <h1>Edição de tarefas</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar tarefa</Button>
            </div>
          </Top>
          {
            initialData ? (
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
                      defaultValue={{
                        value: status,
                        label: statusOptions.find(
                          (statusOption) => statusOption.value === status,
                        )?.label || status,
                      }}
                      options={statusOptions}
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
            ) : (
              <p>Carregando...</p>
            )
          }
        </Form>
      </Wrapper>
    </Container>
  );
};

export default EditTask;
