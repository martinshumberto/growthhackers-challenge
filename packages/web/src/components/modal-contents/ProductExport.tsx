import api from '@/services/api';
import Button from '@/components/Button';
import notify from '@/utils/notify';
import Select from '@/components/Select';
import { useEffect, useState } from 'react';
import { ICategory, IPagination } from '@/types/api';

export default function ProductExport({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const handleCloseClick = () => {
    onClose();
  };

  const submit = async (event) => {
    event.preventDefault();
    await api
      .post('/products/export', {
        categoryId: categoryId,
      })
      .then(({ data }) => {
        handleCloseClick();
        if (data.length) {
          const el = document.createElement('a');
          document.body.appendChild(el);
          const jsonData =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(data));
          el.setAttribute('href', jsonData);
          el.setAttribute('download', 'export.json');
          el.click();

          notify({
            title: 'Opa, tudo certo!',
            message:
              'A exportação foi realizada com sucesso, em instantes o download iniciará!',
            type: 'success',
          });
        } else {
          notify({
            title: 'Opps..., algo não deu certo!',
            message:
              'Não encontramos registros nesta categoria ou não tem produtos cadastrados!',
            type: 'warning',
          });
        }
      });
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
      <form onSubmit={submit} className="w-full">
        <div className="flex flex-col md:flex-1 w-full">
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full">
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
            <Button skin="secondary" onClick={submit} disabled={loading}>
              Exportar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
