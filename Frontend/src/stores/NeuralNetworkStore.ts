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

	createNetwork() {
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

			for (let currentNeuron = 0; currentNeuron < LAYERS_CONF[currentLayer].neuronCount; currentNeuron++) {
				const _n = `n-${currentNeuron}`;
				NeuralNetwork.layers[id].neurons[_n] = {
					weight: Math.random(),
				};
			}
		}

		set(() => NeuralNetwork);
	},
}));

export {
    useNeuralNetworkStore
};

