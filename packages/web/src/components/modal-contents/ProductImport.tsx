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

export default function ProductImport({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const handleCloseClick = () => {
    onClose();
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categoryId', categoryId);

    await api({
      method: 'post',
      url: `/products/import/${categoryId}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(({ data }) => {
      notify({
        title: 'Opa, tudo certo!',
        message: data.message,
        type: 'success',
      });
      handleCloseClick();
    });
  };

  const forceDownload = (path) => {
    var el = document.createElement('a');
    document.body.appendChild(el);

    el.setAttribute('href', path);
    el.setAttribute('download', 'modelo.json');
    el.click();
  };

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

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={uploadFile} className="w-full">
        <div className="flex flex-col md:flex-1 w-full">
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full">
              <Button fullWidth skin="tertiary">
                {file ? file.name : 'Selecionar arquivo JSON'}
                <input
                  className="absolute left-0 top-0 opacity-0 h-full z-50 cursor-pointer"
                  type="file"
                  accept=".json"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                  disabled={loading}
                />
              </Button>
            </div>
            <div className="flex w-full mt-4">
              <Select
                async
                label="Categoria"
                name="categoryId"
                id="categoryId"
                value={categoriesOptions.find((c) => {
                  return c.value === categoryId;
                })}
                handleSelect={(e: any) => {
                  setCategoryId(e?.value ?? null);
                }}
                onChange={(v) => {
                  setCategoryId(v);
                }}
                defaultOptions={categoriesOptions}
                loadOptions={fetchCategories}
                placeholder={'Selecione uma categoria ou digite para buscar'}
                isDisabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col md:justify-end md:flex-row space-y-2 md:space-x-4 md:space-y-0 mt-6">
            <Button
              skin="tertiary"
              onClick={handleCloseClick}
              type="button"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button skin="secondary" type="submit" disabled={loading}>
              Importar
            </Button>
          </div>
        </div>
      </form>

      <small className="font-md text-gray-500 text-sm mt-6 text-center">
        Use nosso{' '}
        <a
          onClick={() => forceDownload('/modelo.json')}
          className="underline text-primary cursor-pointer"
        >
          modelo
        </a>{' '}
        de arquivo se você tem alguma dúvida.
      </small>
    </div>
  );
}
