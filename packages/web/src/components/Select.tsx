import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import {
  default as ReactSelect,
  StylesConfig,
  components,
  Props as SelectProps,
} from 'react-select';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

interface Props extends SelectProps<any> {
  label?: string;
  placeholder?: string;
  register?: (name: string) => UseFormRegisterReturn;
  errors?: FieldErrors;
  options?: any;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  defaultValue?: any;
  defaultOptions?: any;
  async?: boolean;
  loadOptions?: (inputValue: string) => Promise<any>;
  handleSelect?: (selectedValue: string) => void;
  markRequired?: boolean;
}

export default function Select({
  name,
  async = false,
  loadOptions,
  handleSelect,
  register = () => null,
  errors = {},
  markRequired = false,
  defaultOptions = true,
  ...props
}: Props) {
  const [_document, set_document] = useState(null);
  useEffect(() => {
    set_document(document);
  }, []);

  const errorMessage: string = errors ? errors[name]?.message : '';

  const regist = register ? register(name) : null;

  const customStyles: StylesConfig = {
    option: (provided) => ({
      ...provided,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#71809699',
        fontWeight: 400,
      };
    },
    control: (styles, state) => ({
      ...styles,
      cursor: state.isDisabled ? 'not-allowed' : '',
      outline: 'none',
      marginTop: '0.25rem',
      marginBottom: '0.25rem',
      borderRadius: '0.5rem',
      border: '1px solid rgb(229, 231, 235)',
      paddingTop: '0.05rem',
      paddingBottom: '0.05rem',
      paddingLeft: '0.12rem',
      paddingRight: '0.12rem',
      width: '100%',
      maxWidth: '100%',
      fontWeight: 'normal',
      color: '#003459',
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
      display: 'flex',
      ':hover': {
        border: '1px solid rgb(209 213 219)',
      },
      ':focus': {
        border: '1px solid rgb(209 213 219)',
      },
      ':active': {
        border: 'unset',
      },
    }),
    valueContainer: (styles, state) => ({
      ...styles,
      cursor: state.isDisabled ? 'not-allowed' : '',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '90%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    }),
    singleValue: (styles, state) => ({
      ...styles,
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
      color: '#10253F',
    }),
    multiValue: (styles, state) => ({
      ...styles,
      border: 'unset',
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const ValueContainer = ({ children, getValue, ...props }: any) => {
    const maxToShow = 3;
    const length = getValue().length;
    const displayChips = React.Children.toArray(children).slice(0, maxToShow);
    const shouldBadgeShow = length > maxToShow;
    const displayLength = length - maxToShow;
    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && displayChips}
        <div className="pl-2">{shouldBadgeShow && ` +${displayLength}`}</div>
      </components.ValueContainer>
    );
  };

  return (
    <label className="flex text-primary font-medium flex-col w-full transition-all">
      <div className="flex items-center space-x-1">
        <span className="uppercase text-xs font-bold">{props.label}</span>
        {markRequired && <span className="text-red-500 leading-3 mb-1">•</span>}
      </div>
      {async ? (
        <AsyncSelect
          {...regist}
          {...props}
          components={!props.isMulti ? {} : { ValueContainer }}
          cacheOptions
          name={name}
          defaultOptions={defaultOptions}
          noOptionsMessage={({ inputValue }) =>
            inputValue.length
              ? 'Nenhum registro encontrado'
              : 'Digite para fazer a buscar'
          }
          loadingMessage={() => 'Carregando...'}
          loadOptions={loadOptions}
          styles={customStyles}
          onChange={(options: any) => {
            if (props.onChange)
              if (props.isMulti)
                props.onChange(
                  options.map(({ value }) => value),
                  options
                );
              else props.onChange(options?.value, options);
          }}
        />
      ) : (
        <ReactSelect
          {...regist}
          {...props}
          components={!props.isMulti ? {} : { ValueContainer }}
          hideSelectedOptions={false}
          name={name}
          onChange={(event: any) => {
            if (handleSelect) handleSelect(event);
          }}
          styles={customStyles}
          isOptionDisabled={(option: any) => option.disabled}
          menuPortalTarget={_document?.body}
          menuPosition={'fixed'}
        />
      )}

      {!!errorMessage && (
        <div className="text-red-500 text-sm px-3">{errorMessage}</div>
      )}
    </label>
  );
}
