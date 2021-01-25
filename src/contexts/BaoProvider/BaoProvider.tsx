import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Bao } from '../../bao'

export interface BaoContext {
	bao?: typeof Bao
}

export const Context = createContext<BaoContext>({
	bao: undefined,
})

declare global {
	interface Window {
		baosauce: any
		bao: any
	}
}

const BaoProvider: React.FC = ({ children }) => {
	const { ethereum }: { ethereum: any } = useWallet()
	const [bao, setBao] = useState<any>()

	window.bao = bao

	useEffect(() => {
		if (ethereum) {
			const chainId = Number(ethereum.chainId)
			console.log(chainId)
			const baoLib = new Bao(ethereum, chainId, false, {
				defaultAccount: ethereum.selectedAddress,
				defaultConfirmations: 1,
				autoGasMultiplier: 1.05,
				testing: false,
				defaultGas: '300000',
				defaultGasPrice: '20000000000',
				accounts: [],
				ethereumNodeTimeout: 10000,
			})
			console.log(baoLib)
			setBao(baoLib)
			window.baosauce = baoLib
		}
	}, [ethereum])

	return <Context.Provider value={{ bao }}>{children}</Context.Provider>
}

export default BaoProvider
