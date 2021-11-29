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
  console.log(command);

  const started = command[0] === 'started' && command[2] === '1';
  const position = command[0] === 'position' && command[2];

  const { data } = await client.mutate(
    command[0] === 'started'
      ? {
          mutation: gql`
      mutation {
        updateGame(
          idRecruiter: "${command[1]}",
          data: { started: ${started}, idRecruiter: "${command[1]}" }
        ) {
          _id
          minigamePoints
          position
          started
          idRecruiter
        }
      }
    `,
        }
      : {
          mutation: gql`
      mutation {
        updateGame(
          idRecruiter: "${command[1]}",
          data: { position: ${position}, idRecruiter: "${command[1]}" }
        ) {
          _id
          minigamePoints
          position
          started
          idRecruiter
        }
      }
    `,
        }
  );

  console.log(data);

  res.status(200).json(data);
}
