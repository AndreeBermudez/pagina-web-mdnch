interface TriangleDividerProps {
	color: string;
	bgColor?: string;
	height?: string;
}

export const TriangleDivider = ({ color, bgColor, height = 'h-20' }: TriangleDividerProps) => {
	// const clipPath = 'polygon(50% 100%, 0 0, 100% 0)';
	return (
		// <div className={`relative w-full ${height} overflow-hidden`} style={{ backgroundColor: bgColor }}>
		// 	<div className='absolute w-full h-full z-3' style={{ backgroundColor: color, clipPath: clipPath }}></div>
		// </div>
		<div className={`relative ${height} overflow-hidden`} style={{ backgroundColor: color }}>
			<div
				className='absolute bottom-0 left-0 w-0 h-0 border-solid'
				style={{
					borderWidth: '0 100vw 100px 0',
					borderColor: `transparent transparent ${bgColor} transparent`,
				}}
			/>
		</div>
	);
};
