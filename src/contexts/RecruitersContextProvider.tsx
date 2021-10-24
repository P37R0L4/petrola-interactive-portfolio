import React, { createContext, Dispatch, useState } from 'react';

type RecruitersContextProps = {
  name: string;
  disableHeadersMenu: boolean;
  scrollToShow: Array<boolean>;
  setName: Dispatch<React.SetStateAction<string>>;
  setScrollToShow: Dispatch<React.SetStateAction<Array<boolean>>>;
  setDisableHeadersMenu: Dispatch<React.SetStateAction<boolean>>;
};

const DEFAULT_VALUES = {
  name: '',
  scrollToShow: [true, false, false, false],
  disableHeadersMenu: true,
  setName: () => {},
  setScrollToShow: () => {},
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
  const [scrollToShow, setScrollToShow] = useState(DEFAULT_VALUES.scrollToShow);
  const [disableHeadersMenu, setDisableHeadersMenu] = useState(
    DEFAULT_VALUES.disableHeadersMenu
  );

  return (
    <RecruitersContext.Provider
      value={{
        name,
        setName,
        scrollToShow,
        setScrollToShow,
        disableHeadersMenu,
        setDisableHeadersMenu,
      }}
    >
      {children}
    </RecruitersContext.Provider>
  );
}
