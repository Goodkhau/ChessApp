import axios, { type AxiosResponse } from "axios";

interface ErrorResponse {
    data: {
        type: "RANDOM",
        prediction: never,
    }
}

interface ModelResponse {
    type: string;
    prediction: PredictionSet
}

export interface PredictionSet {
    psuedoSans?: Array<{
        psuedoSan: string;
        rating: number;
    }>
}

export async function getModelResponse (modelName: string): Promise<AxiosResponse<ModelResponse> | ErrorResponse> {
	try {
		return await axios.get(`http://127.0.0.1:8080/api/model/${modelName}`);
	} catch {
		return {
			data: {
				type: "RANDOM",
				prediction: {} as never,
			},
		};
	}
}