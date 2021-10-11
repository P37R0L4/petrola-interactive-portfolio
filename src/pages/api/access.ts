// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { recruitersRepo } from '../../lib/WriteInfile';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const access = await recruitersRepo.getAll();
  res.status(200).json(await access);
}
