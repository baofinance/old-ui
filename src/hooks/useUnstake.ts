import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract, getRefUrl } from '../sushi/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
	  console.log(getRefUrl());
      const txHash = await unstake(masterChefContract, pid, amount, account, getRefUrl())
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
