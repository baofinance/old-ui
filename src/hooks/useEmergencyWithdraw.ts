import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { getMasterChefContract, emergencyWithdraw } from '../bao/utils'

const useEmergencyWithdraw = (pid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await emergencyWithdraw(masterChefContract, pid, account)
      console.log(txHash)
    },
    [account, pid, bao],
  )

  return { onUnstake: handleUnstake }
}

export default useEmergencyWithdraw
