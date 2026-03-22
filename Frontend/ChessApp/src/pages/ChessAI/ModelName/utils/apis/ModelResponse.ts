import axios from "axios";
import _ from "lodash";

interface ErrorResponse {
        type: "RANDOM",
        prediction: never,
}

interface ModelResponse {
    data: {
        type: string;
        prediction: PredictionSet
    } | ErrorResponse
}

interface PredictionSet {
    psuedoSans?: Array<{
        psuedoSan: string;
        rating: number;
    }>
}

async function getModelResponse ({ modelName, sans }:{
    modelName: string,
    sans?: string[]
}): Promise<ModelResponse> {
	const param = (sans && sans.length !== 0)
		? _.reduce(sans, (first, san) => first + "san=" + san, "?")
		: "";

	try {
		return await axios.get(`http://127.0.0.1:8080/api/model/${modelName}${param}`);
	} catch {
		return {
			data: {
				type: "RANDOM",
				prediction: {} as never,
			},
		};
	}
}

export {
	getModelResponse,
	ModelResponse,
	PredictionSet
};

