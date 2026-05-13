export const XIcon = ({ size = 24, fill = 'white' }: {size?: number, fill?: string}) => {
	const fourth = size / 4;
	const three4th = size - fourth;

	return (
		<svg 
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d={`M${three4th} ${fourth}L${fourth} ${three4th}M${fourth} ${fourth}L${three4th} ${three4th}`} 
				stroke={fill}
				strokeWidth={size / 12}
				strokeLinecap="round" 
				strokeLinejoin="round"
			/>
		</svg>
	);};