import React, {FunctionComponent, useEffect, useState} from'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlockChain } from '../data-models/chain-models';
import { ShapeNode } from '../data-models/index-models';
import { getEmitHelpers } from 'typescript';


interface BlockChainProps {
    blockChain : BlockChain    ;
    amounts    : Array<number> ;
 }
const Board : React.FC<BlockChainProps> = (props : BlockChainProps) =>  {
    const [chain   , setChain]    =  useState<BlockChain>(null) ;
    const [amount  , setAmount]   =  useState<number[]>(null)   ;
    const [render, setRerender] = useState(false);

    let isLoaded : Boolean = false ;
    let htmlBlockInfo : string     ;

      useEffect( () => {
          setChain(props.blockChain) ;
          setAmount(props.amounts)   ;
          setRerender(!render) ;
       },[]) ;

    return (
        <div>
        <h3> Graph Component</h3>
        <h5> {chain && chain.Chainname} </h5>
        <div id="DrawBoard" >       
        { chain && chain.getallValues().map( (item, index) => ( <Button className="mt-1" variant="outline-success" onClick={()=> { alert(item.amount)} }>  {isLoaded ? htmlBlockInfo : item.amount} </Button>))}
        </div>
        </div>
    )

}
                
export default Board 