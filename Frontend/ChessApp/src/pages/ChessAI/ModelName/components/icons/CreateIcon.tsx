import React from 'react';

interface CreateIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const CreateIcon: React.FC<CreateIconProps> = ({ 
	size = 24, 
	className = '',
	color = 'white',
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			role="img"
			aria-label="Create"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke={color}
				strokeWidth="1.5"
				fill="none"
			/>
			<path
				d="M12 7v10M7 12h10"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};