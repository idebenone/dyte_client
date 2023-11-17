import { Log } from "@/app/(table)/_components/columns";
import axios, { AxiosResponse } from "axios";

export const fetchLogs = async (
  queryParams: Record<string, any>
): Promise<Log[]> => {
  try {
    const response: AxiosResponse<Log[]> = await axios.get(
      "http://localhost:3001",
      {
        params: queryParams,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};
