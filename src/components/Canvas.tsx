import { render } from '@testing-library/react';
import React, { useRef,useEffect, useState, Props , useContext, Fragment} from 'react'
import {Button} from 'react-bootstrap';
import { Context } from 'vm'
import { BlockChain } from '../data-models/chain-models';
import {ShapeNode, Style} from '../data-models/index-models' ;
import { CanvasContext } from './CanvasContext';


interface PropsCanvas {
    width   : number  ,
    height  : number  , 
    styles? : {}      ,
    node    : ShapeNode ,
    blockchain : BlockChain ,
    draw        : ( ctx : Context ) => void,
    drawNode    : ( ctx : Context ) => void
    };

const Canvas : React.FC<PropsCanvas> = (props : PropsCanvas) =>  {
  
    const   canvasRef             = useRef(null)
    const [ anz, setAnzahl]       = useState<number>(0) ;
    const [ render, setRerender]  = useState(false);
    const [ node  , setNode]      = useState<ShapeNode>(null);
    const [ chain  , setChain]    = useState<BlockChain>(null);
    const { value, changeContext } = useContext(CanvasContext);
    let     counter : number      = 0    ; 

   
    useEffect(() => {
      const canvas    = canvasRef.current         ;
      const ctx   = canvas.getContext('2d')       ;
      changeContext(ctx) ;
      let  chain = props.blockchain               ;
      let  node  : ShapeNode  = chain.RootNode    ;
     
      const updateBoard = (ctx : any) => {  
        if (chain) {
          while ( node ) {
            node.draw(ctx);
            node = node.nextNode ;

        }}
         else {
          console.log("We are not in uodate Board") ;
          setChain(chain)  ;
          return
        }
        }
        console.log("We are not in use effect Board") ;
        updateBoard(ctx) ;
      }, []);
    
    
    return ( 
    <Fragment>
          <h3> {anz} {props.node.label} {props.node.position.yPos} </h3>
        <CanvasContext.Consumer>
          {({value, changeContext}) => (
          <canvas id="BCanvas" ref={canvasRef} style={{color: "red" , backgroundColor :"white", border : "1px solid red"}} {...props}/>   ) }
          </CanvasContext.Consumer>
        <Button variant={Style.Dark} > SORT</Button>

    </Fragment>

       
        )

}

export default Canvas