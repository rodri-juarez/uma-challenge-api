import 'dotenv/config';

export class NasaRepository {
  constructor(
    public baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  async getMonth(startDate: string, endDate: string) {
    const response = await fetch(`${this.baseUrl}?api_key=${process.env.API_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`);
    const data = response.json();
    return data;
  }
}
