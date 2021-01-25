import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract, getRefUrl } from '../bao/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const bao = useBao()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(bao),
        pid,
        amount,
        account,
        getRefUrl(),
      )
      console.log(txHash)
    },
    [account, pid, bao],
  )

  return { onStake: handleStake }
}

export default useStake
