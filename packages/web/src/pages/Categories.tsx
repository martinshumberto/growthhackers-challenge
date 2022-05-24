import Button from '@/components/Button';
import Modal from '@/components/Modal';
import CategoryNew from '@/components/modal-contents/CategoryNew';
import CategoryUpdate from '@/components/modal-contents/CategoryUpdate';
import CategoryView from '@/components/modal-contents/CategoryView';
import Table from '@/components/Table';
import api from '@/services/api';
import {
  ICategory,
  IDefaultResponse,
  IPagination,
  IPaginationMeta,
} from '@/types/api';
import { dateFormat } from '@/utils/helper';
import notify from '@/utils/notify';
import { useMemo, useState } from 'react';
import { Edit2, Eye, Trash2 } from 'react-feather';

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<IPaginationMeta>(null);
  const [data, setData] = useState<ICategory[]>([]);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState<ICategory>(null);

  const handlerSelectItem = (modalName: string, selectedItem: ICategory) => {
    setActiveModal(modalName);
    setSelectedItem(selectedItem);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'title',
        Cell: ({ value }) => <span className="truncate">{value}</span>,
      },
      {
        Header: 'Criado em',
        accessor: 'createdAt',
        Cell: ({ value }) => dateFormat(value),
      },
      {
        Header: 'Atualizado em',
        accessor: 'updatedAt',
        Cell: ({ value }) => dateFormat(value),
      },
      {
        Header: 'Ações',
        accessor: '',
        Cell: (props) => {
          return (
            <div className="flex space-x-3">
              <Button
                skin="icon"
                onClick={() => handlerSelectItem('view', props.row.original)}
              >
                <Eye size={18} />
              </Button>

              <Button
                skin="icon"
                onClick={() => handlerSelectItem('update', props.row.original)}
              >
                <Edit2 size={18} />
              </Button>

              <Button
                skin="icon"
                onClick={() => handlerSelectItem('delete', props.row.original)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const fetchData = async ({ limit, page }) => {
    setLoading(true);
    await api
      .get<IPagination>('/categories', {
        params: {
          limit,
          page,
        },
      })
      .then(({ data }) => {
        setData(data.items);
        setMeta(data.meta);
      })
      .finally(() => setLoading(false));
  };

  const deleteItem = async () => {
    setLoading(true);
    await api
      .delete<IDefaultResponse>(`categories/delete/${selectedItem.id}`)
      .then(({ data }) => {
        notify({
          title: 'Opa, tudo certo!',
          message: data.message,
          type: 'success',
        });
      })
      .finally(() => {
        fetchData({
          limit: meta?.itemsPerPage,
          page: meta?.currentPage,
        });
        setLoading(false);
        setActiveModal('');
      });
  };

  useMemo(
    () =>
      !activeModal &&
      fetchData({
        limit: meta?.itemsPerPage || 10,
        page: meta?.currentPage || 1,
      }),
    [activeModal]
  );

  return (
    <>
      {activeModal === 'delete' && (
        <Modal
          onClose={() => setActiveModal('')}
          title="Tem certeza que gostaria de deletar?"
          subTitle={
            <>
              Confirmação de exclusão necessária para continuar. <br />
              Ao deletar este produto você não poderá recuperá-lo.
            </>
          }
          onSubmit={deleteItem}
          skin="delete"
        />
      )}
      {activeModal === 'new' && (
        <Modal
          onClose={() => setActiveModal('')}
          title="Nova categoria"
          subTitle={
            <>
              Para adicionar uma nova categoria basta preencher os campos
              abaixo.
            </>
          }
          skin="default"
        >
          <CategoryNew onClose={() => setActiveModal('')} />
        </Modal>
      )}
      {activeModal === 'update' && (
        <Modal
          onClose={() => setActiveModal('')}
          title="Atualizar categoria"
          subTitle={
            <>
              Para atualizar a categoria basta alterar os campos desejados
              abaixo.
            </>
          }
          skin="default"
        >
          <CategoryUpdate
            category={selectedItem}
            onClose={() => setActiveModal('')}
          />
        </Modal>
      )}
      {activeModal === 'view' && (
        <Modal enableClose onClose={() => setActiveModal('')} skin="default">
          <CategoryView category={selectedItem} />
        </Modal>
      )}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex text-2xl font-bold text-primary">Categorias</h2>

          <div className="flex">
            <Button skin="secondary" onClick={() => setActiveModal('new')}>
              Novo
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pagination
        />
      </div>
    </>
  );
}
