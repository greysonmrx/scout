import React, { useState, useCallback, useEffect } from 'react';
import { MdMoreVert } from 'react-icons/md';

import { Container, ActionList } from './styles';

const Actions: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => {
    setVisible(!visible);
  }, [setVisible, visible]);

  const listener = useCallback(() => {
    if (visible) setVisible(false);
  }, [visible]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [listener]);

  return (
    <Container>
      <button type="button" onClick={handleToggle}>
        <MdMoreVert size={24} />
      </button>
      <ActionList visible={visible} onClick={handleToggle}>
        {children}
      </ActionList>
    </Container>
  );
};

export default Actions;
