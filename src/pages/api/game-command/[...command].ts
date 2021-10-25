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
  const { command } = req.query;
  const data = recruitersRepo.getById(command[1]);

  recruitersRepo.updateGame(command[1], command[0], command[2]);
  res.status(200).json(data);
}
