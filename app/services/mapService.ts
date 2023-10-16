import axios, { AxiosInstance } from "axios";
import { Map } from '../types/Map';

class MapService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/maps`,
    });
  }

  async getMapsFromSelectors(whaleId: string, startMonth: string, endMonth: string): Promise<Array<Map>> {
    return this.api.get(`/whale/${whaleId}?startMonth=${startMonth}?endMonth=${endMonth}`).then(({ data }) => data).catch(err => console.error(err));
  }
}

const mapService = new MapService();

export default mapService;
