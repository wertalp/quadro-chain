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
    const [chain, setChain]    =  useState<BlockChain>(null) ;
    const [amount, setAmount]  =  useState<number[]>(null)   ;

    let isLoaded : Boolean = false ;
    let htmlBlockInfo : string     ;

      useEffect( () => {
          setChain(props.blockChain) ;
          setAmount(props.amounts)   ;
       },[]) ;

       if( chain){
           chain.getallValues().map( )
         console.log("Traverse BlockChain Node: Value" + chain.RootNode.amount);
         htmlBlockInfo = "Fertig geladen" ;
       }

         
    return (
        <div>
        <h3> Graph Component</h3>
        <h5> {chain && chain.Chainname} </h5>
        <div id="DrawBoard" >
        <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }>  {isLoaded ? htmlBlockInfo : props.amounts[3]} </Button>
        { chain && <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }>  {isLoaded ? htmlBlockInfo : chain.Chainname} </Button>}
        { chain && <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }>  {isLoaded ? htmlBlockInfo : chain.Chainname} </Button>}
        { chain && <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }>  {isLoaded ? htmlBlockInfo : chain.Chainname} </Button>}
        { chain && <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }>  {isLoaded ? htmlBlockInfo : chain.Chainname} </Button>}

        { chain && <Button className="mt-1" variant="info" onClick={()=> { alert("here we go")} }> DOT </Button>}
        </div>
        </div>
    )

}
                
export default Board 