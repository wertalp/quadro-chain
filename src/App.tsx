import React, { ChangeEventHandler, FunctionComponent, useEffect, useState} from 'react' ;
import logo from './logo.svg';
import './App.css';
import {ShapeNode, Point, BlockChainProps, IFormData, IShapeNode} from './data-models/index-models'  ;
import {BlockChain} from './data-models/chain-models' ;
import Board        from './components/Board' ;
import Button       from 'react-bootstrap/esm/Button';
import {render}     from '@testing-library/react';
import {Container, Form, Row, Col}       from 'react-bootstrap' ;
import {Style}      from './data-models/index-models' ;
import {FormCreate} from './components/FormCreate' ;



 export  const App : FunctionComponent<{}> = () =>  {
   let myChain    : BlockChain  = null ; 
   let isLoading  : boolean     = true ;
   let testMapper : Array<number>    = [2,3,4,5,6,7]; 


   const [chain,    setChain]    = useState<BlockChain>(null) ;
   const [name ,    setName]     = useState<string>("")       ;
   const [counter,  setCounter]  = useState<number>(0)        ;  
   const [rerender, setRerender] = useState(false)      ;
   const [style,    setStyle]    = useState(Style.Info) ;
  

   useEffect( 
     () => {  
           console.log("starting ... hooking; use Effect ") ;
           setCounter(counter+1) ;
           handleStart() ;
        },[] )


    const createRootNode = () => {
        return new ShapeNode(1,Style.Info,"") ;
    }

    const createChain =  () : BlockChain => {
        console.log("starting ... creating Chain ") ;
        setTimeout(() => { console.log("Waiting TiemOut ....")},1000) ;
        myChain = new BlockChain("QuadroChain",createRootNode()) ;
        console.log("starting ... creating Chain ") ;
        return myChain ;      
    }

  const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve ) => 
          resolve( createChain())  
        );
    
  const addtoChain = async () => {
        console.log("starting ... adding Node") ;
        myChain.addnextNode(new ShapeNode(10,Style.Success,"First"))
        isLoading = false ;
      } ;
    

  const handleSubmit = ( formInfo : IFormData) => {
    
        setChain(chain.addnextNode(new ShapeNode(formInfo.val,formInfo.art,formInfo.name)) ) ;
        setRerender(!rerender); 
  }

  const handleStart = () => {
        promiseBC.then( item =>  setChain(item));  
        //myChain.addnextNode(new ShapeNode(100)) ;
        setChain(myChain)    ;
        setRerender(!render) ;
    }

  const onSort = (event: any) => {
        let sortedChain      : BlockChain   = null ;
        let sortedChainArray : IShapeNode[] = null ;
       
        console.log("Sorting the Array now" )     ;
            sortedChain      = createChain()      ;
            sortedChain.Chainname = "SortedChain" ;
            sortedChainArray = chain.sortValues() ;
       
        sortedChainArray
              .forEach( item => { console.log("Sortierter Array: wert: "+ item.amount) ;  sortedChain
                                  .addnextNode(new ShapeNode(item.amount,Style.Dark, item.label))})

        alert("sortedchainName"+ sortedChain.Chainname ) ;
        setChain(sortedChain) ;
        setRerender(!render) ;

    }

    
return (
  <div className="App">
   <Container>
     <Row>
       <Col>
       <FormCreate blockChain={chain} submitForm={handleSubmit}></FormCreate>
       </Col>
       <Col>
    {chain && <Board   blockChain={chain}  amounts={testMapper}> </Board> }
    </Col>
    <Col>
    {chain && <Board   blockChain={chain} amounts={testMapper}> </Board> }
    </Col>
  </Row>
  <Row>
       <Col>
    <p> {counter}</p>
    <Button variant={Style.Dark} onClick={(e)=> onSort(e)} > SORT</Button>
    </Col>
  </Row>
  </Container>
  </div>
)}

export default App;
