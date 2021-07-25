import React from 'react';
import { useTheme } from 'styled-components';
import { FiCheckCircle, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';

export enum SideNoteType {
  EXCELLENT,
  GOOD,
  BAD,
};

interface SideNoteProps {
  note: string;
  type: SideNoteType;
}

const SideNote: React.FC<SideNoteProps> = ({ note, type, children }) => {
  const theme = useTheme();

  function handleSideNoteIcon(sideNoteType: SideNoteType): React.ReactNode {
    if (sideNoteType === SideNoteType.EXCELLENT) {
      return (
        <FiCheckCircle
          size={30}
          color={theme.colors.green}
        />
      );
    }

    if (sideNoteType === SideNoteType.GOOD) {
      return (
        <FiAlertCircle
          size={30}
          color={theme.colors.orange}
        />
      );
    }

    return (
      <FiAlertTriangle
        size={30}
        color={theme.colors.red.error}
      />
    );
  }

  return (
    <Container type={type}>
      <div className="content">
        <div className="icon-container">
          {handleSideNoteIcon(type)}
        </div>
        <strong>Recomendação</strong>
        <p>{note}</p>
      </div>
      <div className="children">
        {children}
      </div>
    </Container>
  );
};

export default SideNote;
