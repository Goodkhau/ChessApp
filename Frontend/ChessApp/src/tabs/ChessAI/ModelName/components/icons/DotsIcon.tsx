export const DotsIcon = ({ size = 24, fill = 'white' }: {size?: number, fill?: string}) => {
	const radius = size * 3 / 32;
	return (
		<svg 
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx={size * 3 / 16} cy={size / 2} r={radius} fill={fill} />
			<circle cx={size / 2} cy={size / 2} r={radius} fill={fill} />
			<circle cx={size * 13 / 16} cy={size / 2} r={radius} fill={fill} />
		</svg>
	);
};