import { QueryOptions, useQuery, UseQueryResult } from 'react-query';

export type AccessData = {
  name: string;
  grade: number;
  date: string;
  id: number;
  game: {
    started: boolean;
    position: number;
  };
};

export interface IAccessData {
  AccessDataArray: AccessData;
  length?: 0;
}

type QOptions = Partial<QueryOptions>;

export const getAccessData = async (): Promise<IAccessData> => {
  const response = await fetch(`/api/access`);

  return response.json();
};

export const useAccessData = (
  options?: QOptions
): UseQueryResult<IAccessData, unknown> =>
  useQuery(`accessData`, getAccessData, {
    staleTime: 1000 * 60 * 30, // 30min
    ...options,
  });
