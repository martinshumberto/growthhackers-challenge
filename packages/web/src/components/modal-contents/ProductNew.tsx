import api from '@/services/api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import Select from '@/components/Select';
import { useEffect, useState } from 'react';
import Textarea from '@/components/Textarea';
import { ICategory, IDefaultResponse, IPagination } from '@/types/api';

export default function ProductNew({ onClose }) {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const statusOptions = [
    {
      label: 'Ativo',
      value: true,
    },
    {
      label: 'Inativo',
      value: false,
    },
  ];
  const handleCloseClick = () => {
    onClose();
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('O nome do produto é obrigatório.')
      .max(255, 'A nome deve no máximo 255 caracteres.'),
    description: Yup.string().nullable(),
    price: Yup.number().positive('O preço deve ser um número positivo.'),
    categoryId: Yup.string().nullable(),
    status: Yup.boolean().default(true),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, control, setValue } =
    useForm(formOptions);

  const fetchCategories = async (search = null) => {
    return await api
      .get<IPagination<ICategory>>(`/categories`, {
        params: {
          search: search,
        },
      })
      .then(({ data }) => {
        const items = data.items.map((e) => {
          return {
            label: e.title,
            value: e.id,
          };
        });
        setCategoriesOptions(items);
        return items;
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const submit = async (data) => {
    await api
      .post<IDefaultResponse>('/products/create', data)
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
          <div className="md:flex-1">
            <Input
              fullWidth={true}
              register={register}
              errors={formState.errors}
              type="text"
              name="price"
              id="price"
              label="Preço"
              placeholder="Insira o preço"
              disabled={formState.isSubmitting}
            />
          </div>
        </div>
        <div className="md:flex mb-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="md:flex-1">
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { value } }) => (
                <Select
                  async
                  register={register}
                  errors={formState.errors}
                  label="Categoria"
                  name="categoryId"
                  id="categoryId"
                  value={categoriesOptions.find((c) => {
                    return c.value === value;
                  })}
                  handleSelect={(e: any) => {
                    setValue('categoryId', e?.value ?? null);
                  }}
                  onChange={(v) => {
                    setValue('categoryId', v);
                  }}
                  defaultOptions={categoriesOptions}
                  loadOptions={fetchCategories}
                  placeholder={'Selecione uma categoria ou digite para buscar'}
                  isDisabled={formState.isSubmitting}
                />
              )}
            />
          </div>
          <div className="md:flex-1">
            <Select
              register={register}
              errors={formState.errors}
              label="Status"
              name="status"
              id="status"
              handleSelect={(e: any) => {
                setValue('status', e?.value ?? null);
              }}
              onChange={(v) => {
                setValue('status', v);
              }}
              options={statusOptions}
              placeholder="Selecione o status"
              isDisabled={formState.isSubmitting}
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
