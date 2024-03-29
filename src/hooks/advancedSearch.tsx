import React, { useContext, createContext, useState } from 'react';

type Attribute = {
  name: string;
  type: string;
  value: number;
  operator: string;
}

interface IAdvancedSearchContext {
  attributes: Attribute[];
  position: { value: number; label: string; };
  startDate?: number;
  endDate?: number;
  recommendation?: number;
  setAttributes: (value: Attribute[]) => void;
  setPosition: (value: { value: number; label: string; }) => void;
  setStartDate: (value: number) => void;
  setEndDate: (value: number) => void;
  setRecommendation: (value: number) => void;
}

const AdvancedSearchContext = createContext<IAdvancedSearchContext>({} as IAdvancedSearchContext);

const AdvancedSearchProvider: React.FC = ({ children }) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [position, setPosition] = useState<{ value: number; label: string; }>({
    label: 'Selecione uma posição',
    value: 0,
  });
  const [startDate, setStartDate] = useState<number | undefined>();
  const [endDate, setEndDate] = useState<number | undefined>();
  const [recommendation, setRecommendation] = useState<number | undefined>();

  return (
    <AdvancedSearchContext.Provider
      value={{
        attributes,
        position,
        startDate,
        endDate,
        recommendation,
        setAttributes,
        setPosition,
        setStartDate,
        setEndDate,
        setRecommendation,
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  );
};

function useAdvancedSearch(): IAdvancedSearchContext {
  const context = useContext(AdvancedSearchContext);

  if (!context) {
    throw new Error('useAdvancedSearch must be used within an AdvancedSearchProvider.');
  }

  return context;
}

export { AdvancedSearchProvider, useAdvancedSearch };
