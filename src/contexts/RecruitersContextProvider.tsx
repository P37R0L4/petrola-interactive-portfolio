import React, { createContext, useState } from 'react';

type RecruiterType = {
  name: string;
};

type RecruitersContextProps = {
  state: RecruiterType;
  setState: React.Dispatch<React.SetStateAction<RecruiterType>>;
};

const DEFAULT_VALUES = {
  state: {
    name: '',
  },
  setState: () => {},
};

interface IRecruitersContextProvider {
  children: React.ReactNode;
}

export const RecruitersContext =
  createContext<RecruitersContextProps>(DEFAULT_VALUES);

export function RecruitersContextProvider({
  children,
}: IRecruitersContextProvider) {
  const [state, setState] = useState(DEFAULT_VALUES.state);

  return (
    <RecruitersContext.Provider value={{ state, setState }}>
      {children}
    </RecruitersContext.Provider>
  );
}
