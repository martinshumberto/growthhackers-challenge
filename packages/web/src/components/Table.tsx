import { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import Button from '@/components/Button';

const Pagination = ({ gotoPage, currentPage, totalPages }) => {
  const canPreviousPage = currentPage - 1 > 0;
  const canNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center w-full mt-6 space-x-2 text-gray-800">
      <Button
        skin="icon"
        onClick={() => gotoPage(1)}
        disabled={!canPreviousPage}
      >
        <div className="border-2 rounded-full p-1">
          <ChevronsLeft size={18} />
        </div>
      </Button>

      <Button
        skin="icon"
        onClick={() => gotoPage(currentPage - 1)}
        disabled={!canPreviousPage}
      >
        <div className="border-2 rounded-full p-1">
          <ChevronLeft size={18} />
        </div>
      </Button>

      <div className="flex text-sm">
        {currentPage} de {totalPages || 1}
      </div>

      <Button
        skin="icon"
        onClick={() => gotoPage(currentPage + 1)}
        disabled={!canNextPage}
      >
        <div className="border-2 rounded-full p-1">
          <ChevronRight size={18} />
        </div>
      </Button>

      <Button
        skin="icon"
        onClick={() => gotoPage(totalPages)}
        disabled={!canNextPage}
      >
        <div className="border-2 rounded-full p-1">
          <ChevronsRight size={18} />
        </div>
      </Button>
    </div>
  );
};

export default function Table({
  columns,
  data,
  fetchData,
  loading,
  initialPage = 1,
  totalPages = 1,
  pagination = true,
  isDisabled = undefined,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        manualPagination: true,
      },
      usePagination
    );
  const gotoPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData({ page: currentPage });
  }, [currentPage]);

  return (
    <div className="flex flex-col overflow-x-auto pb-4 w-full text-gray-800">
      <table {...getTableProps()}>
        <thead className="text-xs uppercase">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="text-left" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {loading ? (
          <tbody className="text-sm" {...getTableBodyProps()}>
            <tr>
              <td colSpan={10000} className="mt-10">
                Carregando...
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="text-sm" {...getTableBodyProps()}>
            {data.length ? (
              page.map((row: any) => {
                prepareRow(row);
                const disabled = isDisabled ? isDisabled(row.original) : false;
                return (
                  <tr
                    className={`${disabled && 'opacity-60'} text-left`}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10000} className="text-center pt-5">
                  Ops... não encontramos registros aqui.
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {pagination && (
        <Pagination
          gotoPage={gotoPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
