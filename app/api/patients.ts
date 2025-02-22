import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const patient = await prisma.patient.create({
        data: req.body,
      });
      res.status(201).json(patient);
    } catch (error) {
      console.error('Request error:', error);
      res.status(500).json({ error: 'Error creating patient record' });
    }
  } else if (req.method === 'GET') {
    try {
      const patients = await prisma.patient.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(patients);
    } catch (error) {
      console.error('Request error:', error);
      res.status(500).json({ error: 'Error fetching patients' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}