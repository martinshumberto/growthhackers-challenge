import api from '@/services/api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import { useEffect } from 'react';
import Textarea from '@/components/Textarea';
import { ICategory, IDefaultResponse } from '@/types/api';

interface IProps {
  category: ICategory;
  onClose: () => void;
}

export default function CategoryUpdate({ category, onClose }: IProps) {
  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    reset(category);
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('O nome da categoria é obrigatória.')
      .max(255, 'A nome deve no máximo 255 caracteres.'),
    description: Yup.string().nullable(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, control, setValue, watch } =
    useForm(formOptions);

  const submit = async (data) => {
    await api
      .put<IDefaultResponse>(`/categories/update/${category.id}`, data)
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
            <Controller
              control={control}
              name="title"
              render={({ field: { value } }) => (
                <Input
                  fullWidth={true}
                  register={register}
                  errors={formState.errors}
                  type="text"
                  name="title"
                  id="title"
                  label="Nome"
                  value={value}
                  placeholder="Insira o nome"
                  disabled={formState.isSubmitting}
                />
              )}
            />
          </div>
        </div>
        <div className="md:flex mb-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="md:flex-1">
            <Controller
              control={control}
              name="description"
              render={({ field: { value } }) => (
                <Textarea
                  fullWidth={true}
                  register={register}
                  errors={formState.errors}
                  name="description"
                  id="description"
                  label="Descrição"
                  value={value}
                  placeholder="Insira a descrição da categoria"
                  disabled={formState.isSubmitting}
                />
              )}
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
          Atualizar
        </Button>
      </div>
    </form>
  );
}
