import _ from "lodash";
import { create } from "zustand";

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
				const displacement = (1440 / maxCount * (maxCount - LAYERS_CONF[currentLayer].neuronCount)) / 2;
				const placement = (1440 / maxCount) * currentNeuron;
				NeuralNetwork.layers[id].neurons[_n] = {
					weight: Math.random(),
					x: 1440 / currentLayer,
					y: placement + displacement,
				};
			}
		}

		//Create connections

		set(() => NeuralNetwork);
	},
}));

export {
	useNeuralNetworkStore
};

