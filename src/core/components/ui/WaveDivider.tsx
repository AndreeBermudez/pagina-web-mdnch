interface WaveDividerProps {
	baseColor?: string;
	midColor?: string;
	topColor?: string;
	bgColor?: string;
	height?: string;
}

export const WaveDivider = ({
	baseColor = '#0a2158',
	midColor = '#204394',
	topColor = '#466dc7',
	bgColor = 'bg-gray-100',
	height = 'h-24',
}: WaveDividerProps) => {
	return (
		<div className={`relative flex justify-center ${height} overflow-hidden ${bgColor}`}>
			<div
				className='absolute top-0 w-[130%] h-[400%] transform translate-y-[-80%] rounded-[100%]'
				style={{ backgroundColor: baseColor, zIndex: 3 }}
			/>
			<div
				className='absolute top-0 w-[120%] h-[400%] transform translate-y-[-78%] rounded-[100%]'
				style={{ backgroundColor: midColor, zIndex: 2 }}
			/>
			<div
				className='absolute top-0 w-[120%] h-[400%] transform translate-y-[-75%] rounded-[100%]'
				style={{ backgroundColor: topColor, zIndex: 1 }}
			/>
		</div>
	);
};
