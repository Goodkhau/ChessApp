import _ from "lodash";

import { useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys } from "../../../stores/NeuralNetworkStore";

useNeuralNetworkStore.getState().createNetwork();

function NeuronComponent({ layerName, neuronName }: { layerName: string, neuronName: string }) {
	const neuron = useNeuron(layerName, neuronName);
	return (
		<>
			<circle cx={neuron.x} cy={neuron.y} r={40} fill="white" />
			<circle cx={neuron.x} cy={neuron.y} r={38} fill="gray" />
		</>
	);
}

function LayerComponent({ layerName }: {layerName:string}) {
	const neurons = useNeuronKeys(layerName);
	return (
		<>
			{_.map(neurons, neuronName =>
				<NeuronComponent layerName={layerName} neuronName={neuronName}/>,
			)}
		</>
	);
}

export default function NeuralNetworkComponent({ className }: { className?: string }) {
	const layers = useLayerKeys();
	
	return (
		<svg className={className ? className : ""}
			viewBox="0 0 1440 720"
			height={720}>
			{_.map(layers, layer => {
				return <LayerComponent layerName={layer} />;
			})}
		</svg>
	);
}