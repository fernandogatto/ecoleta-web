import React, {
  SelectHTMLAttributes,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container } from './styles'

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
}

const Select: React.FC<ISelectProps> = ({ name, options, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, [isFocused]);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, [isFocused, isFilled, selectRef]);

  useEffect(() => {
    registerField(({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    }))
  }, [registerField, fieldName]);

  return  (
    <Container isFocused={isFocused} isFilled={isFilled} >
      <select
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="0">Selecione</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown size={20} />
    </Container>
  );
}

export default Select;
