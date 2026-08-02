export const calculateProgress = ({
	progress,
	startPadding = 0.1,
	endPadding = 0.1,
}:{
    progress: number,
    startPadding?: number, 
    endPadding?: number
}) => {
	return Math.min(Math.max((progress - startPadding), 0) / (1 - startPadding - endPadding), 1);
};