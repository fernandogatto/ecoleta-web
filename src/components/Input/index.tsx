import React, {
  InputHTMLAttributes,
  useState, useCallback,
  useRef,
  useEffect
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import {
  Container,
} from './styles';

interface IInputPorps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<IInputPorps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [isFocused]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [isFocused, isFilled, inputRef]);

  useEffect(() => {
    registerField(({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    }))
  }, [registerField, fieldName]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

export default Input;
