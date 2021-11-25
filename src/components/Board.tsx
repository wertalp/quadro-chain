import React, {FunctionComponent, useEffect, useState} from'react';
import ReactDOM from 'react-dom';
import {Button, ListGroup, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlockChain } from '../data-models/chain-models';
import { ShapeNode } from '../data-models/index-models';
import { getEmitHelpers } from 'typescript';
import Canvas from './Canvas' ;


interface BlockChainProps {
    blockChain : BlockChain    ;
    amounts    : Array<number> ;
 }

const Board : React.FC<BlockChainProps> = (props : BlockChainProps) =>  {
    const [chain   , setChain]    =  useState<BlockChain>(null) ;
    const [amount  , setAmount]   =  useState<number[]>(null)   ;
    const [render, setRerender]   = useState(false);

    let isLoaded : Boolean = false ;
    let htmlBlockInfo : string     ;

      useEffect( () => {
        setChain(props.blockChain) ;
        setAmount(props.amounts)   ;
        setRerender(!render) ;
        //const interval_id = setInterval(() => reurn), 5000);
        //return () => clearInterval(interval_id)
       },[]) ;


    const refreshControls = () => {
        alert("Here comes setinterval");
        setChain(props.blockChain) ;
        setAmount(props.amounts)   ;
        setRerender(!render) ;
    }

    const draw = (ctx : any, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#666666'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }

    return (
        <div>
        <Row>
            <div id="DrawBoard" >      
            <h3> Graph Component</h3>
            <h5> {chain && chain.Chainname} </h5> 
            { chain && chain.getallValues()
                .map( (item, index) => ( 
                <Button className="mt-1" variant={item.style} onClick={()=> { alert(item.amount)} }> 
                {isLoaded ? htmlBlockInfo : item.label} </Button>))}
            </div>
            <ListGroup>
            { chain && chain.getallValues().map( (item,i)  => ( <ListGroup.Item> {item.label}</ListGroup.Item>))}
        </ListGroup>
        </Row>



        <Canvas draw={draw} width={400}  height={280} > </Canvas>
     </div>)

}
                
export default Board 