// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../lib/apollo-client';

type Data = {
  id?: string;
  error?: any;
};

export default async function updateGrade(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { id, comment, grade } = req.body;
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation {
            updateRecruiter(
              id: "${id}"
              values: { comment: "${comment}", grade: ${grade} }
            ) {
              _id
            }

          }
        `,
      });

      res.status(200).json({ id: data.updateRecruiter._id });
    } catch (error) {
      res.status(200).json({ error });
    }
  }
}
