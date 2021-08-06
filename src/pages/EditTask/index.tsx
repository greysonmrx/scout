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

type FormData = {
  title: string;
};

const EditTask: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch() as any;
  const { addToast } = useToast();

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [assignee, setAssignee] = useState<number | undefined>();
  const [users, setUsers] = useState<{ value: number; label: string; }[]>([]);

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

      if (typeof assignee === 'number') {
        await api.put(`/tasks/${params.id}`, {
          title: data.title,
          assignee_id: assignee,
          status,
        });

        addToast({
          title: 'Sucesso!',
          type: 'success',
          description: 'Tarefa editada com sucesso.',
        });

        history.push('/tasks');
      } else {
        setLoading(false);

        addToast({
          title: 'Ocorreu um erro!',
          type: 'error',
          description: 'Preencha todo o formulário.',
        });
      }
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
  }, [addToast, history, assignee, status]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  async function fetchUsers(): Promise<void> {
    try {
      const usersResponse = await api.get('/users');

      setUsers(usersResponse.data.map((user: any) => ({
        value: user.id, label: user.name,
      })));
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro!',
        type: 'error',
        description: err.response?.data.message,
      });
    }
  }

  async function fetchTaskDetails(): Promise<void> {
    try {
      const taskResponse = await api.get(`/tasks/${params.id}`);

      const { title, assignee_id } = taskResponse.data;

      setInitialData({ title });
      setStatus(taskResponse.data.status);
      setAssignee(assignee_id);
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
    fetchUsers();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Top>
            <h1>Cadastro de tarefas</h1>
            <div>
              <Button type="button" onClick={handleGoBack}>Voltar</Button>
              <Button type="submit" loading={loading}>Salvar tarefa</Button>
            </div>
          </Top>
          {
            users.length && initialData ? (
              <FormContainer>
                <fieldset>
                  <legend>Dados</legend>
                  <InputRow>
                    <Input
                      name="title"
                      label="Título"
                      placeholder="Insira o título da tarefa"
                      required
                      autoFocus
                    />
                  </InputRow>
                  <InputRow style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <Select
                      name="assignee"
                      label="Responsável"
                      onChange={({ value }) => setAssignee(value)}
                      placeholder="Selecione um reponsável"
                      options={users}
                      defaultValue={{
                        value: assignee,
                        label: users.find((user) => user.value === assignee)?.label || assignee,
                      }}
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
