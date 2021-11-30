// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from 'graphql-tag';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/apollo-client';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { command } = req.query;

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        updateGame(
          id: "${command[0]}",
          data: { position: ${command[1]}}
        ) {
          _id
          minigamePoints
          position
          started
          idRecruiter
        }
      }
    `,
  });

  console.log(data);

  res.status(200).json(data);
}
