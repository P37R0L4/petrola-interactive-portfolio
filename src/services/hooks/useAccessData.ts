import { QueryOptions, useQuery, UseQueryResult } from 'react-query';

export type AccessData = {
  name: string;
  grade: number;
  date: string;
};

export interface IAccessData {
  AccessDataArray: Array<AccessData>;
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
