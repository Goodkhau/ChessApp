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
        [id: string]: Neuron
    }
}

interface Neuron {
    weight: number;
	x: number;
	y: number;
}

interface Connection {
    from: string;
    to: string;
}

interface State {
    layers: {
        [id: string]: Layer;
    },
    connection: {
        [_n: string]: Connection;
    }
}

interface Actions {
    createNetwork: () => void;
}

const LAYERS_CONF: LayerConfig[] = [
	{ layerName: "Input", neuronCount: 4 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Output", neuronCount: 4 },
];

const HEIGHT = 720;
const WIDTH = 1440;

const useNeuralNetworkStore = create<State & Actions>()((set) => ({
	layers: {},
	connection: {},

	createNetwork: () => {
		const NeuralNetwork: State = { layers: {}, connection: {} };
		for (let currentLayer = 0; currentLayer < LAYERS_CONF.length; currentLayer++) {
			const id = !currentLayer
				? "Input"
				: currentLayer !== LAYERS_CONF.length - 1
					? `Hidden-${currentLayer}`
					: "Output";

			NeuralNetwork.layers[id] = {
				name: LAYERS_CONF[currentLayer].layerName,
				length: LAYERS_CONF[currentLayer].neuronCount,
				neurons: {},
			};

			const maxCount = _.maxBy(LAYERS_CONF, "neuronCount")?.neuronCount;
			if (maxCount === undefined)
				throw new Error();

			for (let currentNeuron = 0; currentNeuron < LAYERS_CONF[currentLayer].neuronCount; currentNeuron++) {
				const _n = `n-${currentNeuron}`;
				const displacement = (HEIGHT / (maxCount + 1) * (maxCount - LAYERS_CONF[currentLayer].neuronCount + 1)) / 2;
				const placement = HEIGHT / (maxCount + 1) * (currentNeuron + 1 / 2);
				NeuralNetwork.layers[id].neurons[_n] = {
					weight: Math.random(),
					x: WIDTH / (LAYERS_CONF.length + 1) * (currentLayer + 1),
					y: placement + displacement,
				};
			}
		}

		//Create connections

		console.log(NeuralNetwork);

		set(() => NeuralNetwork);
	},
}));

const useLayerKeys = () => useNeuralNetworkStore(useShallow(state => Object.keys(state.layers)));
const useNeuronKeys = (id: string) => useNeuralNetworkStore(useShallow(state => Object.keys(state.layers[id].neurons)));
const useNeuron = (id: string, _n: string) => useNeuralNetworkStore(state => state.layers[id].neurons[_n]);

export { useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys };

