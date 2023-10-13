import axios, { AxiosInstance } from "axios";

class WhaleService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/whales`,
    });
  }

  getAllWhales() {
    return this.api.get('/getAll').then(({ data }) => data).catch(err => console.error(err));
  }
}

const whaleService = new WhaleService();

export default whaleService;
