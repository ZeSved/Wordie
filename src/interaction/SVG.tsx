export default function SVG({ color }: { color: string }) {
	return (
		<svg
			height='32'
			viewBox='0 0 20 20'
			width='32'
			xmlns='http://www.w3.org/2000/svg'>
			<g
				fill='none'
				fill-rule='evenodd'
				stroke={color}
				stroke-linecap='round'
				stroke-linejoin='round'
				transform='translate(2 1)'>
				<path d='m1.5 5.5c1.37786776-2.41169541 4.02354835-4 7-4 4.418278 0 8 3.581722 8 8m-1 4c-1.4081018 2.2866288-4.1175492 4-7 4-4.418278 0-8-3.581722-8-8' />
				<path d='m6.5 5.5h-5v-5' />
				<path d='m10.5 13.5h5v5' />
			</g>
		</svg>
	)
}
