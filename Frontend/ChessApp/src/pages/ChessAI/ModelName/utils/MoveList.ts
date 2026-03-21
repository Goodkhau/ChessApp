import _ from "lodash";
import { PredictionSet } from "../GetMove.ts";

interface MoveParameters {
    possibleMoves: string[];
    prediction: PredictionSet
}

export interface WeightedMove {
    weight: number;
    move: string
};

const pieceLetters = ['N', 'B', 'R', 'Q', 'K'];

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
			if (move[move.length - 1] === '+')
				move = move.substring(0, move.length - 1);

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

export const MoveEnum = {
	RANDOM: randomMove,
	PSUEDO_SAN: pseudoSanMove,
} as const;