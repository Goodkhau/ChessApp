import _ from "lodash";
import { create } from "zustand";

import { useShallow } from "zustand/shallow";

interface LayerConfig {
    layerName: string
    neuronCount: number;
}

interface Layer {
    name: string;
    length: number;
    neurons: {
        [_n: string]: Neuron
    }
}

interface Neuron {
    weight: number;
	x: number;
	y: number;
}

interface FromLayer {
	[_c: string]: Connection
}

interface Connection {
	x1: number;
	y1: number;
	x2: number;
    y2: number;
}

interface State {
    layers: {
        [id: string]: Layer;
    },
	fromLayer: {
		[_c: string]: FromLayer;
	}
}

interface Actions {
    createNetwork: () => void;
}

interface ConnectionIDParam {
	currentNeuron: number,
	nextNeuron: number
}

const LAYERS_CONF: LayerConfig[] = [
	{ layerName: "Input", neuronCount: 4 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Output", neuronCount: 4 },
];

const HEIGHT = 720;
const WIDTH = 1440;

export const getLayerID = (currentLayer: number) => {
	return !currentLayer
		? "Input"
		: currentLayer !== LAYERS_CONF.length - 1
			? `Hidden-${currentLayer}`
			: "Output";
};

export const getNeuronID = (currentNeuron: number) => {
	return `n-${currentNeuron}`;
};

export const getConnectionID = (
	{ currentNeuron, nextNeuron }:
	ConnectionIDParam,
) => {
	return `${currentNeuron}_${nextNeuron}`;
};

const useNeuralNetworkStore = create<State & Actions>()((set) => ({
	layers: {},
	fromLayer: {},

	createNetwork: () => {
		const NeuralNetwork: State = { layers: {}, fromLayer: {} };
		for (let currentLayer = 0; currentLayer < LAYERS_CONF.length; currentLayer++) {
			const id = getLayerID(currentLayer);

			NeuralNetwork.layers[id] = {
				name: LAYERS_CONF[currentLayer].layerName,
				length: LAYERS_CONF[currentLayer].neuronCount,
				neurons: {},
			};

			const maxCount = _.maxBy(LAYERS_CONF, "neuronCount")?.neuronCount;
			if (maxCount === undefined)
				throw new Error();

			for (let currentNeuron = 0; currentNeuron < LAYERS_CONF[currentLayer].neuronCount; currentNeuron++) {
				const _n = getNeuronID(currentNeuron);
				const displacement = (HEIGHT / (maxCount + 1) * (maxCount - LAYERS_CONF[currentLayer].neuronCount + 1)) / 2;
				const placement = HEIGHT / (maxCount + 1) * (currentNeuron + 1 / 2);
				NeuralNetwork.layers[id].neurons[_n] = {
					weight: Math.random(),
					x: WIDTH / (LAYERS_CONF.length + 1) * (currentLayer + 1),
					y: placement + displacement,
				};
			}
		}

		for (let currentLayer = 0; currentLayer < LAYERS_CONF.length - 1; currentLayer++) {
			const nextLayerConf = LAYERS_CONF[currentLayer + 1];

			const currentLayerID = getLayerID(currentLayer);
			const nextLayerID = getLayerID(currentLayer + 1);

			NeuralNetwork.fromLayer[currentLayerID] = {};

			for (let currentNeuron = 0; currentNeuron < LAYERS_CONF[currentLayer].neuronCount; currentNeuron++) {
				const currentNeuronID = getNeuronID(currentNeuron);

				for (let nextNeuron = 0; nextNeuron < nextLayerConf.neuronCount; nextNeuron++) {
					const nextNeuronID = getNeuronID(nextNeuron);
					const _c = getConnectionID({ currentNeuron, nextNeuron });
					NeuralNetwork.fromLayer[currentLayerID][_c] = {
						x1: NeuralNetwork.layers[currentLayerID].neurons[currentNeuronID].x,
						y1: NeuralNetwork.layers[currentLayerID].neurons[currentNeuronID].y,
						x2: NeuralNetwork.layers[nextLayerID].neurons[nextNeuronID].x,
						y2: NeuralNetwork.layers[nextLayerID].neurons[nextNeuronID].y,
					};
				}
			}
		}

		set(() => NeuralNetwork);
	},
}));

const useLayerKeys = () => useNeuralNetworkStore(useShallow(state => Object.keys(state.layers)));

const useNeuronKeys = (id: string) => useNeuralNetworkStore(useShallow(state => Object.keys(state.layers[id].neurons)));
const useConnectionKeys = (id: string) => useNeuralNetworkStore(useShallow(state => Object.keys(state.fromLayer[id] ?? {})));

const useNeuron = (id: string, _n: string) => useNeuralNetworkStore(state => state.layers[id].neurons[_n]);
const useConnection = (id: string, _c: string) => useNeuralNetworkStore(state => state.fromLayer[id][_c]);

export { useConnection, useConnectionKeys, useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys };

