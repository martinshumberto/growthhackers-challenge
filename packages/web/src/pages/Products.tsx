import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ProductNew from '@/components/modal-contents/ProductNew';
import ProductUpdate from '@/components/modal-contents/ProductUpdate';
import ProductView from '@/components/modal-contents/ProductView';
import Table from '@/components/Table';
import { useMemo, useState } from 'react';
import { Edit2, Eye, Trash2 } from 'react-feather';

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);

  const handlerSelectItem = (modalName: string, selectedItem: []) => {
    setActiveModal(modalName);
    setSelectedItem(selectedItem);
  };

  const data = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      category: 'Camisa',
      status: true,
      created_at: '2022-03-24T15:56:03.169Z',
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22.3,
      category: 'Camisa',
      status: true,
      created_at: '2022-03-24T15:56:03.169Z',
    },
    {
      id: 3,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      category: 'Camisa',
      status: true,
      created_at: '2022-03-24T15:56:03.169Z',
    },
    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
      category: 'Camisa',
      status: false,
      created_at: '2022-03-24T15:56:03.169Z',
    },
  ];

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
        Cell: ({ value }) => <span className="truncate">{value}</span>,
      },
      {
        Header: 'Criado em',
        accessor: 'created_at',
        Cell: ({ value }) => value,
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

  const fetchData = async () => {
    try {
      setLoading(false);
    } catch {}
  };

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
        <Modal
          enableClose
          onClose={() => setActiveModal('')}
          skin="default"
        >
          <ProductView
            product={selectedItem}
            onClose={() => setActiveModal('')}
          />
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
          isDisabled={({ status }) => !status}
        />
      </div>
    </>
  );
}
