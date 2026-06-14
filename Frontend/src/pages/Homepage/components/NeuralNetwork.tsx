import _ from "lodash";

import { useConnection, useConnectionKeys, useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys } from "../../../stores/NeuralNetworkStore";

useNeuralNetworkStore.getState().createNetwork();

const adjustment = 0.8;
const getHexFromWeight = (weight: number) => {
	weight = weight * adjustment + (1 - adjustment);
	return Math.floor(255 * weight).toString(16);
};

function NeuronComponent({ layerName, neuronKey }: { layerName: string, neuronKey: string }) {
	const { x, y, weight } = useNeuron(layerName, neuronKey);
	return (
		<>
			<circle cx={x} cy={y} r={40} fill="#FFFFFF" />
			<circle cx={x} cy={y} r={38} fill="#020617" />
			<circle cx={x} cy={y} r={38} fill={`#808080${getHexFromWeight(Math.pow(weight, 2.5))}`} />
		</>
	);
}

function ConnectionComponent({ layerName, connectionKey }: {layerName: string, connectionKey: string}) {
	const { x1, x2, y1, y2, weight } = useConnection(layerName, connectionKey);
	return (
		<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`#FFFFFF${getHexFromWeight(weight)}`} />
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
	console.log(connections);
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