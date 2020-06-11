import React, {
  LiHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface IItem {
  id: string;
  title: string;
  image_url: string;
}

interface IItemProps extends LiHTMLAttributes<HTMLLIElement> {
  name: string;
  item: IItem;
}

const Item: React.FC<IItemProps> = ({ name, item, ...rest }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const [isClicked, setIsClicked] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  const handleItemClick = useCallback(() => {
    if(isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }, [isClicked]);

  useEffect(() => {
    if(isClicked) {
      registerField(({
        name: fieldName,
        ref: itemRef.current,
        path: 'id',
      }));
    } else {
      registerField(({
        name: fieldName,
        ref: itemRef.current,
        path: '',
      }));
    }
  }, [registerField, fieldName, isClicked]);

  return (
    <Container isClicked={isClicked}>
      <li
        id={item.id}
        onClick={handleItemClick}
        ref={itemRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <img src={item.image_url} alt={item.title}/>
        <span>{item.title}</span>
      </li>
    </Container>
  );
}

export default Item;
