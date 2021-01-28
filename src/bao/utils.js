import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { supportedPools } from './lib/constants'

BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
	STAKING: {
		DEFAULT: 200000,
		SNX: 850000,
	},
}

export const getMasterChefAddress = (bao) => {
	return bao && bao.masterChefAddress
}

export const getWethPriceAddress = (bao) => {
	return bao && bao.wethPriceAddress
}

export const getBaoPriceAddress = (bao) => {
	return bao && bao.baoPriceAddress
}

export const getBaoAddress = (bao) => {
	return bao && bao.baoAddress
}
export const getWethContract = (bao) => {
	return bao && bao.contracts && bao.contracts.weth
}

export const getWethPriceContract = (bao) => {
	return bao && bao.contracts && bao.contracts.wethPrice
}

export const getBaoPriceContract = (bao) => {
	return bao && bao.contracts && bao.contracts.baoPrice
}

export const getMasterChefContract = (bao) => {
	return bao && bao.contracts && bao.contracts.masterChef
}
export const getBaoContract = (bao) => {
	return bao && bao.contracts && bao.contracts.bao
}

export const getFarms = (bao) => {
	return bao
		? bao.contracts.pools.map(
				({
					pid,
					name,
					symbol,
					icon,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					lpAddress,
					lpContract,
					refUrl,
					poolType,
				}) => ({
					pid,
					id: symbol,
					name,
					lpToken: symbol,
					lpTokenAddress: lpAddress,
					lpContract,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					earnToken: 'BAO',
					earnTokenAddress: bao.contracts.bao.options.address,
					icon,
					refUrl,
					poolType,
				}),
		  )
		: []
}

export const getPoolWeight = async (masterChefContract, pid) => {
	const [{ allocPoint }, totalAllocPoint] = await Promise.all([
		masterChefContract.methods.poolInfo(pid).call(),
		masterChefContract.methods.totalAllocPoint().call(),
	])

	return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
	return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getLockedEarned = async (baoContract, account) => {
	return baoContract.methods.lockOf(account).call()
}

export const getTotalLPWethValue = async (
	masterChefContract,
	wethContract,
	lpContract,
	tokenContract,
	tokenDecimals,
	pid,
) => {
	const [
		tokenAmountWholeLP,
		balance,
		totalSupply,
		lpContractWeth,
		poolWeight,
	] = await Promise.all([
		tokenContract.methods.balanceOf(lpContract.options.address).call(),
		lpContract.methods.balanceOf(masterChefContract.options.address).call(),
		lpContract.methods.totalSupply().call(),
		wethContract.methods.balanceOf(lpContract.options.address).call(),
		getPoolWeight(masterChefContract, pid),
	])

	// Return p1 * w1 * 2
	const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
	const lpWethWorth = new BigNumber(lpContractWeth)
	const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
	// Calculate
	const tokenAmount = new BigNumber(tokenAmountWholeLP)
		.times(portionLp)
		.div(new BigNumber(10).pow(tokenDecimals))

	const wethAmount = new BigNumber(lpContractWeth)
		.times(portionLp)
		.div(new BigNumber(10).pow(18))
	return {
		tokenAmount,
		wethAmount,
		totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
		tokenPriceInWeth: wethAmount.div(tokenAmount),
		poolWeight: poolWeight,
	}
}

export const approve = async (lpContract, masterChefContract, account) => {
	return lpContract.methods
		.approve(masterChefContract.options.address, ethers.constants.MaxUint256)
		.send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account, ref) => {
	return masterChefContract.methods
		.deposit(pid, ethers.utils.parseUnits(amount, 18), ref)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const unstake = async (
	masterChefContract,
	pid,
	amount,
	account,
	ref,
) => {
	return masterChefContract.methods
		.withdraw(pid, ethers.utils.parseUnits(amount, 18), ref)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}
export const harvest = async (masterChefContract, pid, account) => {
	return masterChefContract.methods
		.claimReward(pid)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const getStaked = async (masterChefContract, pid, account) => {
	try {
		const { amount } = await masterChefContract.methods
			.userInfo(pid, account)
			.call()
		return new BigNumber(amount)
	} catch {
		return new BigNumber(0)
	}
}

export const getWethPrice = async (bao) => {
	console.log(bao)
	const amount = await bao.contracts.wethPrice.methods.latestAnswer().call()
	return new BigNumber(amount)
}

export const getBaoPrice = async (bao) => {
	const addr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
	const amount = await bao.contracts.baoPrice.methods
		.consult(addr.toString(), 1)
		.call()
	return new BigNumber(amount)
}

export const getBaoSupply = async (bao) => {
	return new BigNumber(await bao.contracts.bao.methods.totalSupply().call())
}

export const getReferrals = async (masterChefContract, account) => {
	return await masterChefContract.methods.getGlobalRefAmount(account).call()
}

export function getRefUrl() {
	var refer = '0x0000000000000000000000000000000000000000'
	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('ref')) {
		refer = urlParams.get('ref')
	}
	console.log(refer)

	return refer
}

export const redeem = async (masterChefContract, account) => {
	let now = new Date().getTime() / 1000
	if (now >= 1597172400) {
		return masterChefContract.methods
			.exit()
			.send({ from: account })
			.on('transactionHash', (tx) => {
				console.log(tx)
				return tx.transactionHash
			})
	} else {
		alert('pool not active')
	}
}
