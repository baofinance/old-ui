import React from 'react'
import baoBanner from '../../assets/img/bao-banner.png'

interface SushiIconProps {
	size?: number
	v1?: boolean
	v2?: boolean
	v3?: boolean
}

const SushiIcon: React.FC<SushiIconProps> = ({ size = 36, v1, v2, v3 }) => (
	<span
		role="img"
		style={{
			fontSize: size,
			filter: v1 ? 'saturate(0.5)' : undefined,
		}}
	>
		<img src={baoBanner} width={50} height={50} />
	</span>
)

export default SushiIcon
