import _ from "lodash";
import { useEffect } from "react";

import { useConnection, useConnectionKeys, useLayerKeys, useNeuralNetworkStore, useNeuron, useNeuronKeys } from "../../../stores/NeuralNetworkStore";

import { motion } from "framer-motion";
import { calculateProgress } from "../utilities/progressHelperFunctions.ts";

const weightshift = 0.1;
const getHexFromWeight = ({ weight, transparency = 1 } : {weight: number, transparency?: number}) => {
	weight = weight * (1 - weightshift) + weightshift;
	const hexStr = Math.floor(255 * weight * transparency).toString(16).toUpperCase();
	return (hexStr.length === 1) ? `0${hexStr}` : hexStr;
};

const animationTemperature = 2;
const calculateTransparency = ({ progress, index }: {progress: number, index: number}) => {
	const transparency = (progress > index)
		? Math.min(progress - index, 1)
		: 0;
	return Math.pow(transparency, animationTemperature); 
}; 

const white = "#FFFFFF";
const slate_950 = "#020617";
const gray = "#808080";
const neuronShadeTemperature = 2.5;
function NeuronComponent({ layerName, neuronKey, transparency }: { layerName: string, neuronKey: string, transparency: number }) {
	const { x, y, weight } = useNeuron(layerName, neuronKey);
	return (
		<>
			<motion.circle cx={x} cy={y} r={40} fill={white} />
			<motion.circle cx={x} cy={y} r={38} fill={slate_950} />
			<motion.circle cx={x} cy={y} r={38}
				fill={`${gray}${getHexFromWeight({
					weight: Math.pow(weight, neuronShadeTemperature),
					transparency,
				})}`}
			/>
		</>
	);
}

function ConnectionComponent({ layerName, connectionKey, transparency }: {layerName: string, connectionKey: string, transparency: number}) {
	const { x1, x2, y1, y2, weight } = useConnection(layerName, connectionKey);
	return (
		<motion.line
			x1={x1} y1={y1}
			x2={x2} y2={y2}
			stroke={`${white}${getHexFromWeight({ weight, transparency })}`}
		/>
	);
}

function NeuronLayerComponent({ layerName, transparency }: {layerName:string, transparency: number}) {
	const neurons = useNeuronKeys(layerName);
	return (
		<>
			{_.map(neurons, neuronKey =>
				<NeuronComponent
					layerName={layerName}
					neuronKey={neuronKey}
					transparency={transparency}
				/>,
			)}
		</>
	);
}

function ConnectionLayerComponent({ layerName, transparency }: {layerName: string, transparency: number}) {
	const connections = useConnectionKeys(layerName);
	return (
		<>
			{_.map(connections, connectionKey =>
				<ConnectionComponent
					layerName={layerName}
					connectionKey={connectionKey}
					transparency={transparency}
				/>,
			)}
		</>
	);
}

export default function NeuralNetworkComponent({ className, progress = 1 }: { className?: string, progress?: number }) {
	const layers = useLayerKeys();

	useEffect(() => {
		useNeuralNetworkStore.getState().createNetwork();
	}, []);

	progress = calculateProgress({ progress });
	
	return (
		<motion.svg
			className={className ? className : ""}
			viewBox="0 0 1440 720"
			height={540}
		>
			{_.map(layers, (layer, index) =>
				<ConnectionLayerComponent
					layerName={layer}
					transparency={
						calculateTransparency({
							progress: progress * (layers.length), // Fence post issue, we have one less connection layer than neuron
							index: index + 1,
						})
					}
				/>,
			)}
			{_.map(layers, (layer, index) =>
				<NeuronLayerComponent
					layerName={layer}
					transparency={
						calculateTransparency({
							progress: progress * (layers.length),
							index,
						})
					}
				/>,
			)}
		</motion.svg>
	);
}