// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { recruitersRepo } from '../../lib/WriteInfile';

type Data = {
  status: number;
};

export default async function updateGrade(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { id, comment, grade } = req.body;
    await recruitersRepo.update(id, 'grade', grade);
    await recruitersRepo.update(id, 'comment', comment);

    res.status(200).json({ status: 0 });
  }
}
