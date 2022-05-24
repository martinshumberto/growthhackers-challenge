import api from '@/services/api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import Textarea from '@/components/Textarea';
import { IDefaultResponse } from '@/types/api';

export default function CategoryNew({ onClose }) {
  const handleCloseClick = () => {
    onClose();
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('O nome da categoria é obrigatório.')
      .max(255, 'A nome deve no máximo 255 caracteres.'),
    description: Yup.string().nullable(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, control, setValue } =
    useForm(formOptions);

  const submit = async (data) => {
    await api
      .post<IDefaultResponse>('/categories/create', data)
      .then(({ data }) => {
        handleCloseClick();
        notify({
          title: 'Opa, tudo certo!',
          message: data.message,
          type: 'success',
        });
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col md:flex-1 w-full">
        <div className="md:flex mb-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="md:flex-1">
            <Input
              fullWidth={true}
              register={register}
              errors={formState.errors}
              type="text"
              name="title"
              id="title"
              label="Nome"
              placeholder="Insira o nome"
              disabled={formState.isSubmitting}
            />
          </div>
        </div>
        <div className="md:flex mb-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="md:flex-1">
            <Textarea
              fullWidth={true}
              register={register}
              errors={formState.errors}
              name="description"
              id="description"
              label="Descrição"
              placeholder="Insira a descrição do produto"
              disabled={formState.isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:justify-end md:flex-row space-y-2 md:space-x-4 md:space-y-0 mt-6">
        <Button
          skin="tertiary"
          onClick={handleCloseClick}
          type="button"
          disabled={formState.isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          skin="secondary"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Criar
        </Button>
      </div>
    </form>
  );
}
