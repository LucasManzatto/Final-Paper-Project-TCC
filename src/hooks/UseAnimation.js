import { updateBlockData } from "../components/MainPage/actions"
import { shiftArray } from "../components/MainPage/utils"
import React, { useRef, useState, useEffect } from "react"
import usePrevious from './UsePrevious'
import { useDispatch } from 'react-redux'


const useAnimation = (block, createDataArray, createDataArrayArgs, updateOnChanges) => {
  const requestRef = useRef()
  const wasPaused = usePrevious(block.paused)
  const [data, setData] = useState([])
  const [firstRender, setFirstRender] = useState(true)
  const dispatch = useDispatch()

  const animate = () => {
    if (!block.paused) {
      setData(prevData => shiftArray(prevData))
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (block.paused === wasPaused || firstRender) {
      const newData = createDataArray(...createDataArrayArgs)
      setData(newData)
      dispatch(updateBlockData({ id: block.id, data: newData }))
      setFirstRender(false)
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [...updateOnChanges, block.paused])

  return data
}
export default useAnimation