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

export const generateLogs = async (count: number) => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `http://localhost:3001/client/${count}`
    );
    return response;
  } catch (error) {
    console.log("Error generating logs:", error);
    throw error;
  }
};

export const singleLog = async (data: any) => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `http://localhost:3001`,
      [data]
    );
    return response;
  } catch (error) {
    console.log("Error registering the log:", error);
    throw error;
  }
};

export const serverStatus = async () => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `http://localhost:3001/check`
    );
    return response;
  } catch (error) {
    console.log("Error registering the log:", error);
    throw error;
  }
};
