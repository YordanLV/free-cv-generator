// pages/api/githubJobs.js

import axios from 'axios';

export default async function handler(req: { method: string; query: { description?: "" | undefined; location?: "" | undefined; full_time?: "" | undefined; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      const { description = '', location = '', full_time = '' } = req.query;
      const githubJobsApiUrl = `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${full_time}`;

      // Fetch jobs from the GitHub Jobs API
      const response = await axios.get(githubJobsApiUrl);

      // Send fetched job data as JSON
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
      res.status(500).json({ error: 'Failed to fetch jobs.' });
    }
  } else {
    // If the request method is not GET, return an error
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
