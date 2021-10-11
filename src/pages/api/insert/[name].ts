// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { recruitersRepo } from '../../../lib/WriteInfile';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  recruitersRepo.create(name);
  const data = recruitersRepo.getAll();

  res.status(200).json(data);
}
