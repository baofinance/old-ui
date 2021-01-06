import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBao from '../../hooks/useBao'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../bao/utils'
import { getFarms } from '../../bao/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
	const [unharvested, setUnharvested] = useState(0)

	const bao = useBao()
	const { account } = useWallet()

	const farms = getFarms(bao)

	return (
		<Context.Provider
			value={{
				farms,
				unharvested,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Farms
