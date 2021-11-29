// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/apollo-client';

type Data = {
  name: string;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | unknown>
) {
  try {
    const { points } = req.query;

    const { data } = await client.mutate({
      mutation: gql`
      mutation {
        updateGame(
          id: "${points[0]}",
          data: { minigamePoints: ${points[1]}, idRecruiter: "${points[0]}" }
        ) {
          _id
          minigamePoints
        }
      }
    `,
    });

    console.log('test', data);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error });
  }
}
