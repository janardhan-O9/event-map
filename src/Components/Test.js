import React, { useEffect } from 'react'
import { CanvasFlowmapLayer } from './CanvasFlowmapLayer'

function Test() {
    useEffect(()=>{
        const canvasFlowmapLayer = CanvasFlowmapLayer();
        console.log(canvasFlowmapLayer)
    },[]);
  return (
    <div>Test</div>
  )
}

export default Test