import { QueryOptions, UseQueryResult, useQuery } from 'react-query';

export type tecnologiesObject = {
  since: string;
  knowledge: Number;
};

export type TecnologiesDataType = {
  [key: string]: tecnologiesObject;
};

export type QOptions = Partial<QueryOptions>;

export async function getTecnologies(): Promise<TecnologiesDataType> {
  const response = await fetch('/samples/tecnologies.json');
  return response.json();
}

export const useTecnologies = (
  options?: QOptions
): UseQueryResult<TecnologiesDataType, unknown> =>
  useQuery('useTecnologies', getTecnologies, {
    staleTime: 1000 * 60 * 30,
    ...options,
  });
