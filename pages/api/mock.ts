import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ data: string[] }>
) {
  
  res.status(200).json({ data: ["a", "b", "c"] });
}
