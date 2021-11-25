import React, { useRef,useEffect } from 'react'
import { Context } from 'vm'


interface PropsCanvas {
    width  : number ;
    height : number ; 
    styles? : {}     ;
    draw   : ( ctx : Context , frameCount: number) => void
}
const Canvas : React.FC<PropsCanvas> = (props : PropsCanvas) =>  {
  
    const canvasRef = useRef(null)
    const styles = {
         border: "1px solid black" 
      }
  
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      let frameCount = 0
      let animationFrameId : any ;


      const draw = (ctx : Context, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#666666'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }
      
      //Our draw came here
      const render = () => {
        frameCount++
        props.draw(context, frameCount) ;
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, [])
    
    return <canvas id="PaintBoard" ref={canvasRef} styles={{color: "red" ,border : "1px solid red"}} {...props}/>
  }

export default Canvas