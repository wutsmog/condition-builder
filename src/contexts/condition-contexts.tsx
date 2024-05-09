import { createContext, useContext, Dispatch, SetStateAction, useState, useMemo } from 'react';
import { ICondition } from '../types/condition';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  conditions: ICondition[][];
  columns: string[];

  setConditions: Dispatch<SetStateAction<ICondition[][]>>;
  setColumns: Dispatch<SetStateAction<string[]>>;
}

const ConditionContext = createContext<ContextProps | null>(null);

export const ConditionContextProvider = ({ children }: ProviderProps) => {
  const [conditions, setConditions] = useState<ICondition[][]>([[]]);
  const [columns, setColumns] = useState<string[]>([]);

  const values = useMemo(
    () => ({
      conditions,
      columns,

      setConditions,
      setColumns,
    }),
    [conditions, columns, setConditions, setColumns]
  );

  return <ConditionContext.Provider value={values}>{children}</ConditionContext.Provider>;
};

export const useCondition = () => {
  const context = useContext(ConditionContext);

  if (!context) {
    throw new Error('useCondition has to be used within context provider');
  }

  return context;
};
