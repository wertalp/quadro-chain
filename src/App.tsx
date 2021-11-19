import React, { ChangeEventHandler, FunctionComponent, useEffect, useState} from 'react' ;
import logo from './logo.svg';
import './App.css';
import {ShapeNode, Point, BlockChainProps} from './data-models/index-models'  ;
import {BlockChain} from './data-models/chain-models' ;
import Board from './components/Board' ;
import Button from 'react-bootstrap/esm/Button';
import { render } from '@testing-library/react';



 export  const App : FunctionComponent<{}> = () =>  {
   let myChain    : BlockChain  = null ; 
   let isLoading  : boolean     = true ;
   let testMapper : Array<number>    = [2,3,4,5,6,7]; 


   const [chain,     setChain] = useState<BlockChain>(null) ;
   const [name ,      setName] = useState<string>("")       ;
   const [counter, setCounter] = useState<number>(0)        ;  
   const [rerender, setRerender] = useState(false);
  

   useEffect( 
     () => {  
           console.log("starting ... hooking; use Effect ") ;
           setCounter(counter+1) ;
           handleStart() ;
        },[] )


    const createRootNode = () => {
        return new ShapeNode(1) ;
    }

    const createChain =  () : BlockChain => {
        console.log("starting ... creating Chain ") ;
        myChain = new BlockChain("QuadroChain",createRootNode()) ;
        console.log("starting ... creating Chain ") ;
        return myChain ;      
    }

  const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve , rejected ) =>  {
        resolve( createChain())
        rejected(null)   }
        )
    
  const addtoChain = async () => {
        console.log("starting ... adding Node") ;
        myChain.addnextNode(new ShapeNode(10))
        isLoading = false ;
      } ;

  const printmyChain = () => {
        myChain.drawChain() ;
    };
    

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setChain(chain.addnextNode(new ShapeNode(counter)) ) ;
        setRerender(!rerender); 
  }

  const handleStart = () => {
        promiseBC.then( item =>  setChain(item));  
        //myChain.addnextNode(new ShapeNode(100)) ;
        setChain(myChain)    ;
        setRerender(!render) ;
    }

  const updateInputValue = (event: any) => {
        setCounter(event.target.value)
    }
    
return (
  <div className="App">
      <form onSubmit={ (e) => handleSubmit(e)}>
      <label>
        Knoten:
        <input type="number" value={counter} onChange={evt => updateInputValue(evt)} />
      </label>
      <input type="submit" value="ADD" />
    </form>
    <p> {counter}</p>
    { chain && <Board blockChain={chain} amounts={testMapper}> </Board> }
  </div>
)}

export default App;
