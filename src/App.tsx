import React, { FunctionComponent, useEffect} from 'react' ;
import logo from './logo.svg';
import './App.css';
import {ShapeNode} from './data-models/index-models'  ;
import {BlockChain} from './data-models/chain-models' ;
import 'bootstrap/dist/css/bootstrap.css';
Import {Button} from 


 export  const App : FunctionComponent<{}> = () =>  {
   let myChain : BlockChain  = null; 
   let currNode : ShapeNode = null; 

    
  useEffect( 
    () => {  
       console.log("starting ... hooking; use Effect ") ;
       createChain() ;
       addtoChain()  ;
       printmyChain();

          },[] )


  const createChain = () => {
    myChain = new BlockChain("QuadroChain",createRootNode()) ;
    console.log("starting ... creating Chain ") ;
    
  }

  const createRootNode = () => {
    return new ShapeNode(true,null,null, 1) ;
  }

  const addtoChain = () => {
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,2)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,3)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,4)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,33)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,42)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,422)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,4222)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,142)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,41)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,234)) ;
    myChain.addnextNode( new ShapeNode(false,myChain.currentNode,null,54)) ;
    console.log("starting ... adding Node") ;
  }


  const printmyChain = () => {
      myChain.drawChain() ;
    }
   
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         <button onClick={()=> { alert("here we go")} }></button>
         <button onClick={()=> { alert("here we go")} }></button>
         <button onClick={()=> { alert("here we go")} }></button>
        </a>
      </header>
    </div>
  )

}

export default App;
