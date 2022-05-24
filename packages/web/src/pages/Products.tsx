import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ProductNew from '@/components/modal-contents/ProductNew';
import ProductUpdate from '@/components/modal-contents/ProductUpdate';
import ProductView from '@/components/modal-contents/ProductView';
import Table from '@/components/Table';
import api from '@/services/api';
import {
  IDefaultResponse,
  IPagination,
  IPaginationMeta,
  IProduct,
} from '@/types/api.d';
import { amountFormat, dateFormat } from '@/utils/helper';
import notify from '@/utils/notify';
import { useMemo, useState } from 'react';
import { Edit2, Eye, Trash2 } from 'react-feather';

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<IPaginationMeta>(null);
  const [data, setData] = useState<IProduct[]>([]);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState<IProduct>(null);

  const handlerSelectItem = (modalName: string, selectedItem: IProduct) => {
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
        Header: 'Preço',
        accessor: 'price',
        Cell: ({ value }) => (
          <span className="truncate">{amountFormat(value)}</span>
        ),
      },
      {
        Header: 'Categoria',
        accessor: 'category.title',
        Cell: ({ value }) => <span className="truncate">{value ?? '-'}</span>,
      },
      {
        Header: 'Criado em',
        accessor: 'createdAt',
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
      .get<IPagination>('/products', {
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
      .delete<IDefaultResponse>(`products/delete/${selectedItem.id}`)
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
          skin="delete"
          onSubmit={deleteItem}
        />
      )}
      {activeModal === 'new' && (
        <Modal
          onClose={() => setActiveModal('')}
          title="Novo produto"
          subTitle={
            <>
              Para adicionar um novo produto basta preencher os campos abaixo.
            </>
          }
          skin="default"
        >
          <ProductNew onClose={() => setActiveModal('')} />
        </Modal>
      )}
      {activeModal === 'update' && (
        <Modal
          onClose={() => setActiveModal('')}
          title="Atualizar produto"
          subTitle={
            <>
              Para atualizar o produto basta alterar os campos desejados abaixo.
            </>
          }
          skin="default"
        >
          <ProductUpdate
            product={selectedItem}
            onClose={() => setActiveModal('')}
          />
        </Modal>
      )}
      {activeModal === 'view' && (
        <Modal enableClose onClose={() => setActiveModal('')} skin="default">
          <ProductView product={selectedItem} />
        </Modal>
      )}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex text-2xl font-bold text-primary">Produtos</h2>

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
          totalPages={meta?.totalPages}
          isDisabled={({ status }) => !status}
        />
      </div>
    </>
  );
}
