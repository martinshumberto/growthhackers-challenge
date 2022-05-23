import ReactDOM from 'react-dom';
import { useEffect, useState, ReactElement } from 'react';
import Button from '@/components/Button';
import { Trash2 } from 'react-feather';

interface Props {
  children?: ReactElement;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
  closeOnSubmit?: boolean;
  title: JSX.Element | string;
  subTitle?: JSX.Element | string;
  fullWidth?: boolean;
  skin?: 'default' | 'compact' | 'delete' | 'enable';
}

export default function Modal({
  onClose,
  onSubmit,
  closeOnSubmit = true,
  children,
  title,
  subTitle,
  skin,
  fullWidth,
}: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleCloseClick = async (e) => {
    e.preventDefault();
    onClose();
  };

  const skins = {
    default: {
      size: 'max-w-screen-lg w-11/12 lg:w-8/12 p-6 md:pt-10 md:px-10',
      title: 'font-bold text-2xl text-primary',
      subTitle: 'text-gray-400',
    },
    compact: {
      size: 'max-w-lg p-6 md:py-6 md:px-8',
      title: 'font-bold text-xl text-center text-primary px-2',
      subTitle: 'text-center text-gray-400 py-2 px-2',
    },
    delete: {
      size: 'max-w-lg p-6 md:py-6 md:px-8',
      title: 'font-bold text-xl text-center text-red-500 px-2',
      subTitle: 'text-center text-gray-400 py-2 px-2',
    },
  };
  const modalSkin = skins[skin || 'default'];

  const modalContent = (
    <div className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-50">
      <div className="absolute bg-gray-800/20 min-h-screen w-full h-full top-0 flex items-center justify-center transition-all" />
      <div className="absolute content-container min-h-screen w-full top-0 flex items-center justify-center">
        <div
          className={`relative bg-white filter drop-shadow-2xl rounded-xl
          ${
            fullWidth
              ? 'w-11/12 max-w-screen-xl p-6 md:pt-10 md:px-10'
              : modalSkin.size
          }
          `}
        >
          {skin === 'delete' && (
            <div className="w-12 h-12 p-3 bg-red-200 rounded-full mb-3 mx-auto">
              <Trash2 color="red" />
            </div>
          )}

          <header className="px-2">
            <h2 className={modalSkin.title}>{title}</h2>
            {subTitle && <div className={modalSkin.subTitle}>{subTitle}</div>}
          </header>

          {children && (
            <div
              className="overflow-auto p-2 mt-3"
              style={{ maxHeight: '70vh' }}
            >
              {children}
            </div>
          )}

          {skin === 'delete' && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                fullWidth={true}
                skin="tertiary"
                onClick={handleCloseClick}
              >
                Cancelar
              </Button>
              <Button
                fullWidth={true}
                skin="delete"
                onClick={(e) => {
                  if (onSubmit) onSubmit();
                  if (closeOnSubmit) handleCloseClick(e);
                }}
              >
                Deletar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  }
}
