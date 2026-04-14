import { type ModelResponse } from "./apis/ModelResponse.ts";
import { MoveFormatEnum } from "./MoveFormats.ts";


class ModelResponseParser {
	private readonly type;
	private readonly prediction;
	
	constructor ({
		data: {
			type,
			prediction,
		},
	}: ModelResponse) {
		this.type = type;
		this.prediction = prediction;
	}

	getParsedResponse (sans: string[]) {
		return MoveFormatEnum[this.type as keyof typeof MoveFormatEnum]({ possibleMoves: sans, prediction: this.prediction });
	}
}

export {
	ModelResponseParser
};
