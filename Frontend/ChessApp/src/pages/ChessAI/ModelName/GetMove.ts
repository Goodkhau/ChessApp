import axios, { type AxiosResponse } from "axios";

interface ModelResponse {
    type: string;
    prediction: PsuedoSan[]
}

interface PsuedoSan {
    psuedoSan: string;
    rating: number;
}

export async function getModelResponse (modelName: string): Promise<AxiosResponse<ModelResponse> | { data: {type: string, prediction: []} }> {
    try {
        return await axios.get(`http://127.0.0.1:8000/model/${modelName}`);
    } catch {
        return {
            data: {
                type: "RANDOM",
                prediction: []
            }
        };
    }
}