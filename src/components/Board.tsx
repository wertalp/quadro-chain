import React, {FunctionComponent, useEffect, useState} from'react';
import ReactDOM from 'react-dom';
import {Button, ListGroup, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlockChain } from '../data-models/chain-models';
import { ShapeNode ,Style} from '../data-models/index-models';
import { getEmitHelpers } from 'typescript';


interface BlockChainProps {
    blockChain : BlockChain  ,
    counter    : number   
 }

const Board : React.FC<BlockChainProps> = (props : BlockChainProps) =>  {
        const [chain  , setChain]     =  useState<BlockChain>(null) ;
        const [render , setRerender]  = useState(false);
        const [counter, setCounter]   = useState<number>(0);

        let isLoaded      : Boolean = false ;
        let htmlBlockInfo : string          ;

useEffect( () => {
        setChain(props.blockChain) ;
        setRerender(!render) ;
},[]) ;


const refreshControls = () => {
        alert("Here comes setinterval");
        setChain(props.blockChain) ;
        setRerender(!render) ;
    }

return (
    <div>
    <Row>
    <div id="DrawBoard" >      
    <h3> Graph Component</h3>
    <h5> {chain && chain.Chainname} {counter} </h5> 
        { chain && chain.getallValues()
        .map( (item, index) => ( 
        <Button className="mt-1" variant={item.style} onClick={()=> { alert(item.amount)} }> 
        {isLoaded ? htmlBlockInfo : item.label} </Button>))}
        </div>
    </Row>
    </div>)

}
                
export default Board 