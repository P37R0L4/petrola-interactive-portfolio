// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/apollo-client';

type Data = {
  name?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | unknown>
) {
  const { id } = req.query;

  try {
    const { data } = await client.query({
      query: gql`
        query {
          game(idRecruiter: "${id}") {
            _id
            minigamePoints
            position
            started
          }
        }
      `,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error });
  }
}
