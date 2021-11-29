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
  const { name } = req.query;
  const timestamp = new Date().getTime() / 1000;

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          createRecruiter(values: { name: "${name}", data: "${timestamp}", grade: 0, comment: "" }) {
            _id
            name
            comment
            data
            grade
          }
        }
      `,
    });

    const id = await data.createRecruiter._id;
    await client.mutate({
      mutation: gql`
        mutation {
          createGame(
            data: { minigamePoints: 0, position: 50, started: false,  idRecruiter: "${id}"}
          ) {
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
