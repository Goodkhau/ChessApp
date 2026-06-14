import _ from "lodash";

import { useConnection, useConnectionKeys, useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys } from "../../../stores/NeuralNetworkStore";

useNeuralNetworkStore.getState().createNetwork();

const adjustment = 0.9;
const getHexFromWeight = ({ weight, transparency = 1 } : {weight: number, transparency?: number}) => {
	weight = weight * adjustment + (1 - adjustment);
	return Math.floor(255 * weight * transparency).toString(16);
};

function NeuronComponent({ layerName, neuronKey, transparency }: { layerName: string, neuronKey: string, transparency: number }) {
	const { x, y, weight } = useNeuron(layerName, neuronKey);
	return (
		<>
			<circle cx={x} cy={y} r={40} fill="#FFFFFF" />
			<circle cx={x} cy={y} r={38} fill="#020617" />
			<circle
				cx={x} cy={y} r={38}
				fill={`#808080${getHexFromWeight({
					weight: Math.pow(weight, 2.5),
					transparency,
				})}`}
			/>
		</>
	);
}

function ConnectionComponent({ layerName, connectionKey, transparency }: {layerName: string, connectionKey: string, transparency: number}) {
	const { x1, x2, y1, y2, weight } = useConnection(layerName, connectionKey);
	return (
		<line
			x1={x1} y1={y1}
			x2={x2} y2={y2}
			stroke={`#FFFFFF${getHexFromWeight({ weight, transparency })}`}
		/>
	);
}

function NeuronLayerComponent({ layerName, transparency }: {layerName:string, transparency: number}) {
	const neurons = useNeuronKeys(layerName);
	return (
		<>
			{_.map(neurons, neuronKey =>
				<NeuronComponent layerName={layerName} neuronKey={neuronKey} transparency={transparency} />,
			)}
		</>
	);
}

function ConnectionLayerComponent({ layerName, transparency }: {layerName: string, transparency: number}) {
	const connections = useConnectionKeys(layerName);
	return (
		<>
			{_.map(connections, connectionKey =>
				<ConnectionComponent layerName={layerName} connectionKey={connectionKey} transparency={transparency} />,
			)}
		</>
	);
}

export default function NeuralNetworkComponent({ className, progress = 1 }: { className?: string, progress?: number }) {
	const layers = useLayerKeys();
	
	return (
		<svg
			className={className ? className : ""}
			viewBox="0 0 1440 720"
			height={600}
		>
			{_.map(layers, (layer, index) => {
				const transparency =  (progress * layers.length > index)
					? Math.min(progress * layers.length - index, 1)
					: 0;
				return <ConnectionLayerComponent layerName={layer} transparency={transparency} />;
			})}
			{_.map(layers, (layer, index) => {
				const transparency =  (progress * layers.length > index)
					? Math.min(progress * layers.length - index, 1)
					: 0;
				return <NeuronLayerComponent layerName={layer} transparency={transparency} />;
			})}
		</svg>
	);
}