import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Bao } from '../../bao'

export interface BaoContext {
	sushi?: typeof Bao
}

export const Context = createContext<BaoContext>({
	sushi: undefined,
})

declare global {
	interface Window {
		sushisauce: any
		sushi: any
	}
}

const BaoProvider: React.FC = ({ children }) => {
	const { ethereum }: { ethereum: any } = useWallet()
	const [sushi, setBao] = useState<any>()

	window.sushi = sushi

	useEffect(() => {
		if (ethereum) {
			const chainId = Number(ethereum.chainId)
			console.log(chainId)
			const sushiLib = new Bao(ethereum, chainId, false, {
				defaultAccount: ethereum.selectedAddress,
				defaultConfirmations: 1,
				autoGasMultiplier: 1.15,
				testing: false,
				defaultGas: '300000',
				defaultGasPrice: '20000000000',
				accounts: [],
				ethereumNodeTimeout: 10000,
			})
			console.log(sushiLib)
			setBao(sushiLib)
			window.sushisauce = sushiLib
		}
	}, [ethereum])

	return <Context.Provider value={{ sushi }}>{children}</Context.Provider>
}

export default BaoProvider
