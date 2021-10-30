import React, { createContext, Dispatch, useState } from 'react';

export type RecruitersContextProps = {
  name: string;
  minigame: boolean;
  id: number;
  setId: Dispatch<React.SetStateAction<number>>;
  setName: Dispatch<React.SetStateAction<string>>;
  setMinigame: Dispatch<React.SetStateAction<boolean>>;
};

const DEFAULT_VALUES = {
  name: '',
  id: 0,
  minigame: false,
  setName: () => {},
  setId: () => {},
  setMinigame: () => {},
};

interface IRecruitersContextProvider {
  children: React.ReactNode;
}

export const RecruitersContext =
  createContext<RecruitersContextProps>(DEFAULT_VALUES);

export function RecruitersContextProvider({
  children,
}: IRecruitersContextProvider) {
  const [name, setName] = useState(DEFAULT_VALUES.name);
  const [minigame, setMinigame] = useState(DEFAULT_VALUES.minigame);
  const [id, setId] = useState(DEFAULT_VALUES.id);

  return (
    <RecruitersContext.Provider
      value={{
        name,
        setName,
        minigame,
        setMinigame,
        id,
        setId,
      }}
    >
      {children}
    </RecruitersContext.Provider>
  );
}
