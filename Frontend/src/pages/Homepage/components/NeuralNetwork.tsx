import _ from "lodash";

import { useConnection, useConnectionKeys, useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys } from "../../../stores/NeuralNetworkStore";

useNeuralNetworkStore.getState().createNetwork();

function NeuronComponent({ layerName, neuronKey }: { layerName: string, neuronKey: string }) {
	const neuron = useNeuron(layerName, neuronKey);

	return (
		<>
			<circle cx={neuron.x} cy={neuron.y} r={40} fill="white" />
			<circle cx={neuron.x} cy={neuron.y} r={38} fill="gray" />
		</>
	);
}

function ConnectionComponent({ layerName, connectionKey }: {layerName: string, connectionKey: string}) {
	const { x1, x2, y1, y2 } = useConnection(layerName, connectionKey);
	return (
		<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" />
	);
}

function NeuronLayerComponent({ layerName }: {layerName:string}) {
	const neurons = useNeuronKeys(layerName);
	return (
		<>
			{_.map(neurons, neuronKey =>
				<NeuronComponent layerName={layerName} neuronKey={neuronKey}/>,
			)}
		</>
	);
}

function ConnectionLayerComponent({ layerName }: {layerName: string}) {
	const connections = useConnectionKeys(layerName);
	return (
		<>
			{_.map(connections, connectionKey =>
				<ConnectionComponent layerName={layerName} connectionKey={connectionKey} />,
			)}
		</>
	);
}

export default function NeuralNetworkComponent({ className }: { className?: string }) {
	const layers = useLayerKeys();
	
	return (
		<svg
			className={className ? className : ""}
			viewBox="0 0 1440 720"
			height={720}
		>
			{_.map(layers, layer => {
				return <ConnectionLayerComponent layerName={layer}/>;
			})}
			{_.map(layers, layer => {
				return <NeuronLayerComponent layerName={layer} />;
			})}
		</svg>
	);
}