import axios from "axios";
import { Chess } from "chess.js";
import _ from "lodash";
import { MoveFormatEnum } from "../formats/MoveFormats.ts";


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

class ModelResponseHandler {
	async getModelResponse ({ modelName, sans }:{
		modelName: string,
		sans?: string[]
	}): Promise<ModelResponse> {
		const param = (sans && sans.length !== 0)
			? "?" + _.map(sans, (san) => "san=" + san).join("&")
			: "";

		try {
			return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/model/${modelName}${param}`);
		} catch {
			return {
				data: {
					type: "RANDOM",
					prediction: {} as never,
				},
			};
		}
	}

	async getParsedResponse ({ chessGame, modelName = "Little_Blue" }: {chessGame: Chess, modelName?: string}) {
		const {
			data: {
				type,
				prediction,
			},
		} = await this.getModelResponse({ modelName, sans: chessGame.history() });
		
		const newPredictionList = MoveFormatEnum[type as keyof typeof MoveFormatEnum]({ possibleMoves: chessGame.moves(), prediction });
		const max = _.maxBy(newPredictionList, "weight");
		const randomZeroToMax = Math.random() * (max?.weight ?? 1);
		
		const filteredList = _.filter(newPredictionList, ({ weight }) => { return weight >= randomZeroToMax; } );
		const mv = filteredList[Math.floor(Math.random() * filteredList.length)];

		return {
			newPredictionList,
			selectedMove: mv,
		};
	}
}

export {
	ModelResponseHandler, type PredictionSet
};

