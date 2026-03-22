import _ from "lodash";
import type { ModelResponse, PredictionSet } from "./apis/ModelResponse.ts";


const pieceLetters = ['N', 'B', 'R', 'Q', 'K'];

interface MoveParameters {
    possibleMoves: string[];
    prediction: PredictionSet
}

interface WeightedMove {
    weight: number;
    move: string;
	psuedoSan?: string;
};


const randomMove = ({
	possibleMoves,
}: MoveParameters): WeightedMove[] => {
	return _.map(possibleMoves, (move) => {
		return {
			weight: 1 / possibleMoves.length,
			move,
		};
	});
};

const pseudoSanMove = ({
	possibleMoves,
	prediction: {
		psuedoSans,
	} = {},
}: MoveParameters) => {
	const weightedMoves: WeightedMove[] = [];

	_.map(psuedoSans, ({
		psuedoSan,
		rating,
	}) => {
		_.map(possibleMoves, (move) => {
			move = (move[move.length - 1] === '+') ? move.substring(0, move.length - 1) : move;

			if (move.substring(move.length - 2, move.length) !== psuedoSan.substring(psuedoSan.length - 2, psuedoSan.length))
				return;

			rating = Math.pow(rating, 30);

			if (psuedoSan === move)
				weightedMoves.push({ weight: rating, move });
			else if (psuedoSan.length === 2 && !pieceLetters.includes(move.substring(0, 1)))
				weightedMoves.push({ weight: rating, move });
			else if (pieceLetters.includes(move.substring(0, 1)))
				weightedMoves.push({ weight: rating, move });
		});
	});

	return weightedMoves.sort((a, b) => b.weight - a.weight);
};

const MoveFormatEnum = {
	RANDOM: randomMove,
	PSUEDO_SAN: pseudoSanMove,
} as const;


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
	ModelResponseParser,
	MoveFormatEnum,
	WeightedMove
};

