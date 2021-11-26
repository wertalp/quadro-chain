import { render } from '@testing-library/react';
import React, { useRef,useEffect } from 'react'
import {Button} from 'react-bootstrap';
import { Context } from 'vm'
import {Style} from '../data-models/index-models' ;


interface PropsCanvas {
    width   : number  ,
    height  : number  , 
    styles? : {}      ,
    draw        : ( ctx : Context , frameCount: number) => void,
    drawNode    : ( ctx : Context ) => void
    };

const Canvas : React.FC<PropsCanvas> = (props : PropsCanvas) =>  {
  
    const canvasRef = useRef(null)
    const styles = {
                    border: "1px solid black" 
                    }
    let ctx : any  = null ;
   
    useEffect(() => {
      const canvas    = canvasRef.current        ;
      const context   = canvas.getContext('2d')  ;
      let frameCount  = 0                        ;
      let animationFrameId : any                 ;
      

      //Our draw came here
      const render = () => {
          frameCount++
          props.draw(context, frameCount) ;
          animationFrameId = window.requestAnimationFrame(render)
           paint(context)
     
      }
      render() ;
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, []);
    const paint = (ctx : any) => {
        props.drawNode(ctx) ;
    }

    return ( 
      <div>
        <canvas id="PaintBoard" ref={canvasRef} style={{color: "red" , border : "1px solid red"}} {...props}/>   
        <Button variant={Style.Dark} onClick={(e)=> paint(e)} > SORT</Button>
      </div> 
        )

}

export default Canvas