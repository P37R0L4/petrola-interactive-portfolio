import React, { createContext, Dispatch, useState } from 'react';

export type RecruitersContextProps = {
  name: string;
  disableHeadersMenu: boolean;
  minigame: boolean;
  id: number;
  setId: Dispatch<React.SetStateAction<number>>;
  setName: Dispatch<React.SetStateAction<string>>;
  setDisableHeadersMenu: Dispatch<React.SetStateAction<boolean>>;
  setMinigame: Dispatch<React.SetStateAction<boolean>>;
};

const DEFAULT_VALUES = {
  name: '',
  id: 0,
  minigame: false,
  disableHeadersMenu: true,
  setName: () => {},
  setId: () => {},
  setMinigame: () => {},
  setDisableHeadersMenu: () => {},
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
  const [disableHeadersMenu, setDisableHeadersMenu] = useState(
    DEFAULT_VALUES.disableHeadersMenu
  );

  return (
    <RecruitersContext.Provider
      value={{
        name,
        setName,
        disableHeadersMenu,
        setDisableHeadersMenu,
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
