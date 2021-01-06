import { useContext } from 'react'
import { Context } from '../contexts/BaoProvider'

const useBao = () => {
  const { sushi } = useContext(Context)
  return sushi
}

export default useBao
