import React, { FunctionComponent, useEffect, useState} from 'react' ;
import logo from './logo.svg';
import './App.css';
import {ShapeNode, Point, BlockChainProps} from './data-models/index-models'  ;
import {BlockChain} from './data-models/chain-models' ;
import Board from './components/Board' ;
import { setConstantValue } from 'typescript';



 export  const App : FunctionComponent<{}> = () =>  {
   let myChain    : BlockChain  = null ; 
   let isLoading  : boolean     = true ;
   let testMapper : Array<number>    = [2,3,4,5,6,7]; 
   let promiseBC : Promise<BlockChain> ;


   const [chain, setChain] = useState<BlockChain>(null)
  
   useEffect( 
     () => {  
           console.log("starting ... hooking; use Effect ") ;
           promiseBC.then(  chain =>   setChain(chain) )
           //printmyChain();
        },[] )


    const createRootNode = () => {
        return new ShapeNode(10) ;
    }

    const createChain =  () : BlockChain => {
       console.log("starting ... creating Chain ") ;
       myChain = new BlockChain("QuadroChain",createRootNode()) ;
       myChain.addnextNode(new ShapeNode(20))
              .addnextNode(new ShapeNode(30))
              .addnextNode(new ShapeNode(40));
              console.log("starting ... creating Chain ") ;
      return myChain ;      
    }


    promiseBC = new Promise<BlockChain>( ( resolve , rejected ) =>  {
      resolve( createChain())
      rejected(null)
      }
  ) 

  const addtoChain = async () => {
    console.log("starting ... adding Node") ;
    myChain.addnextNode(new ShapeNode(10))
           .addnextNode(new ShapeNode(20))
           .addnextNode(new ShapeNode(30));
    isLoading = false ;
  
  } ;

  const printmyChain = () => {
      myChain.drawChain() ;
    }
   
  return (
    <div className="App">
      { chain && <Board blockChain={chain} amounts={testMapper}> </Board> }
    </div>
  )}

export default App;
