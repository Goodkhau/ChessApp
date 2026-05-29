
interface NeuralNetworkProps {
    className: string;
}

interface NeuralNetwork {
    layers: Layer[];
}

interface Layer {
    name: string;
    neurons: Neuron[];
}

interface Neuron {
    weight: number
}

interface LayerConfig {
    layerName: string
    neuronCount: number;
}

const LAYERS_CONF: LayerConfig[] = [
	{ layerName: "Input", neuronCount: 4 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Hidden", neuronCount: 6 },
	{ layerName: "Output", neuronCount: 4 },
];

const NeuralNetwork: NeuralNetwork = { layers: [] };
for (let currentLayer = 0; currentLayer < LAYERS_CONF.length; currentLayer++) {
	NeuralNetwork.layers.push({
		name: LAYERS_CONF[currentLayer].layerName,
		neurons: [],
	});

	for (let currentNeuron = 0; currentNeuron < LAYERS_CONF[currentLayer].neuronCount; currentNeuron++) {
		NeuralNetwork.layers[currentLayer].neurons.push({
			weight: Math.random(),
		});
	}
}

export default function NeuralNetworkComponent({ className }: NeuralNetworkProps) {
	return (
		<div className={className}>
            
		</div>
	);
}