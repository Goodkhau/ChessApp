import { useEffect, useRef } from 'react';

/**
 * UseInterval, a phenomonal way of learning React at a deep level.
 * For future me and anyone who cares.
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
 
export function useInterval(callback: CallableFunction, delay: number) {
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	});
 
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
 
		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}