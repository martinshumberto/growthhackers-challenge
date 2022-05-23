import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<any> {
  fullWidth?: boolean;
  height?: 'sm' | 'md' | 'lg';
  skin?: 'default' | 'primary' | 'secondary' | 'icon' | 'delete';
  options?: { label: string; value: string }[];
  optionClick?: (value: string) => void;
  showArrowIcon?: boolean;
}

export default function Button({
  fullWidth,
  height = 'lg',
  skin = 'default',
  ...props
}: Props) {
  const h = skin === 'icon' ? '' : height;

  const skins = {
    default: {
      bg: 'bg-transparent hover:bg-primary',
      text: 'text-primary hover:text-white',
      font: 'font-semibold',
      border: 'border-2 border-gray-300 hover:border-transparent',
    },
    primary: {
      bg: 'bg-primary hover:bg-transparent',
      text: 'text-white hover:text-primary',
      font: 'font-bold',
      border: 'border-2 border-transparent hover:border-primary',
    },
    secondary: {
      bg: 'bg-secondary hover:bg-white',
      text: 'text-white hover:text-secondary',
      font: 'font-semibold',
      border: 'border-2 border-transparent hover:border-secondary',
    },
    icon: {
      text: 'text-gray-700 hover:text-gray-900',
      border: '',
      font: '',
      bg: '',
    },
    delete: {
      bg: 'bg-red-200 hover:bg-red-500',
      text: 'text-red-500 hover:text-white',
      font: 'font-bold',
      border: '',
    },
  };
  const buttonSkin = skins[skin];

  return (
    <>
      <button
        {...props}
        onClick={(event) => {
          if (props.onClick) props.onClick(event);
        }}
        className={`relative outline-none transition-all rounded-md
        ${props.disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
        ${fullWidth && 'w-full'}
        ${h === 'sm' && 'h-6 px-4'}
        ${h === 'md' && 'h-8 px-5'}
        ${h === 'lg' && 'h-10 px-6'}
        ${buttonSkin.text}
        ${buttonSkin.border}
        ${buttonSkin.font}
        ${buttonSkin.bg}
      `}
      >
        {props.children}
      </button>
    </>
  );
}
