import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, bao])

  return balances
}

export default useAllEarnings
