import Button from '@/components/Button';
import Modal from '@/components/Modal';
import CategoryNew from '@/components/modal-contents/CategoryNew';
import CategoryUpdate from '@/components/modal-contents/CategoryUpdate';
import Table from '@/components/Table';
import { useMemo, useState } from 'react';
import { Edit2, Eye, Trash2 } from 'react-feather';

export default function Categories() {
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
      title: 'Tecnologia',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed laoreet ligula. Nullam vestibulum lacinia diam, et vehicula libero placerat vitae. Nunc posuere bibendum nibh vitae imperdiet. Nulla porta lectus a enim finibus tincidunt. Cras mollis sit amet arcu vel feugiat. Suspendisse malesuada turpis at tempus elementum.',
      created_at: '2022-03-24T15:56:03.169Z',
    },
    {
      id: 2,
      title: 'Camisas',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed laoreet ligula. Nullam vestibulum lacinia diam, et vehicula libero placerat vitae. Nunc posuere bibendum nibh vitae imperdiet. Nulla porta lectus a enim finibus tincidunt. Cras mollis sit amet arcu vel feugiat. Suspendisse malesuada turpis at tempus elementum.',
      created_at: '2022-03-24T15:56:03.169Z',
    },
    {
      id: 3,
      title: 'Jeans',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed laoreet ligula. Nullam vestibulum lacinia diam, et vehicula libero placerat vitae. Nunc posuere bibendum nibh vitae imperdiet. Nulla porta lectus a enim finibus tincidunt. Cras mollis sit amet arcu vel feugiat. Suspendisse malesuada turpis at tempus elementum.',
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
                onClick={() => handlerSelectItem('update', props.row.original)}
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
