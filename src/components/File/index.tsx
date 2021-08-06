import React, {
  ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from 'react';
import { useField } from '@unform/core';
import { FiPlus } from 'react-icons/fi';

import { Container, Content } from './styles';

type FileProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width: number;
  height: number;
  placeholder: string;
}

const File: React.FC<FileProps> = ({
  name, width, height, placeholder, ...rest
}) => {
  const inputRef = useRef(null);

  const {
    fieldName, defaultValue, registerField,
  } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);

      return;
    }

    const previewURL = URL.createObjectURL(file);

    setPreview(previewURL);
  }, []);

  return (
    <Container
      width={width}
      height={height}
      htmlFor={name}
    >
      <Content placeholder={placeholder}>
        {
          preview ? (
            <img src={preview} alt="Preview" />
          ) : (
            <>
              <FiPlus size={35} />
              <span>{placeholder}</span>
            </>
          )
        }
      </Content>
      <input ref={inputRef} type="file" name={name} onChange={handlePreview} id={name} {...rest} />
    </Container>
  );
};

export default File;
