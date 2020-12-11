import { Contract } from 'web3-eth-contract'

export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: string
  id: string
  tokenSymbol: string
  refUrl: string
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}