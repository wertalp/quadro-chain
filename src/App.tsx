import React, { ChangeEventHandler, FunctionComponent, useEffect, useState} from 'react' ;
import ReactDOM from 'react-dom' ;
import logo from './logo.svg';
import './App.css';
import {ShapeNode, Point, BlockChainProps, IFormData, IShapeNode} from './data-models/index-models'  ;
import {BlockChain}    from './data-models/chain-models' ;
import Board           from './components/Board'         ;
import Button          from 'react-bootstrap/esm/Button' ;
import {render}        from '@testing-library/react'     ;
import {Container, Form, Row, Col}  from 'react-bootstrap' ;
import {Style}         from './data-models/index-models' ;
import {FormCreate}    from './components/FormCreate'    ;
import Canvas          from './components/Canvas'        ;
import * as Utils      from './utils/chain-utils'        ;
import {CanvasContext} from './components/CanvasContext' ;   

 export  const App : FunctionComponent<{}> = () =>  {
    let myChain    : BlockChain  = null ; 
    let isLoading  : boolean     = true ;
    let position   : Point  = { xPos: 10, yPos :20};

    const [chain,    setChain]    = useState<BlockChain>(null) ;
    const [counter,  setCounter]   = useState<number>(0)       ;  
    const [rerender, setRerender]  = useState(false)           ;
    const [currentNode, setCurrentNode]  = useState(null)      ;
    const [context, setContext]  = useState(null)              ;
    let   _ctx : any = null ; 
 

   useEffect( 
        () => {  
        console.log("starting ... hooking; use Effect ") ; 
        setCounter(counter+1) ;
        initSetup()           ;  
        },[] )


  const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve ) => 
        resolve( Utils.createChain())  
        );      
     

  const handleSubmit = ( formInfo : IFormData) => {
          position.xPos = chain.CurrentNode.position.xPos + 80 ;
          position.yPos = chain.CurrentNode.position.yPos   ;
        setChain(chain.addnextNode(
                new ShapeNode(formInfo.val ,
                              formInfo.art ,
                              formInfo.name,
                              position)))   ;  
        chain.CurrentNode.draw(context)     ;                                
   
        }

  const initSetup = async () => {
         promiseBC
                 .then( item =>  
                          { setChain(item) ; 
                    } );  
       
        }

  const onSort = (event: any) => {
        let sortedChain      : BlockChain   = null ;
        let sortedChainArray : IShapeNode[] = null ;
       
        console.log("Sorting the Array now" )      ;
        sortedChain           = Utils.createChain()      ;
        sortedChain.Chainname = "SortedChain"      ;
        sortedChainArray      = chain.sortValues() ;
       
        sortedChainArray
        .forEach( item => { console.log("Sortierter Array: wert: "+ item.amount) ;  sortedChain
          .addnextNode(
            new ShapeNode(item.amount,
                Style.Dark, 
                item.label,position))})
        setChain(sortedChain) ;
        setRerender(!render) ;
        }

  const draw = (ctx : any) => {
    if(chain) {

      ctx.strokeStyle = "#000000";
      ctx.strokeRect(chain.CurrentNode.position.xPos, chain.CurrentNode.position.yPos, 60, 25);
      console.log("Hallo hier Holzhammer :" + chain.CurrentNode.position.yPos) ;
      setRerender(!render) ;
    } else {
      console.log("Hallo hier Holzhammer :" + chain.CurrentNode.position.yPos) ;
    }
      setRerender(!render) ;
    return ; 
    }

  const drawNode = (ctx: any) => { 
        chain && chain.CurrentNode.draw(ctx) ;
        setRerender(!render) ;
        }  

  const changeContext = (val : any) => {
        setContext(val);

  }      

  return (
    <div className="App">
    <Container>
      <CanvasContext.Provider value={{ value : "" , changeContext: (ctx) => changeContext(ctx)}}  >
      <Row>
        <Col>
        <FormCreate blockChain={chain} submitForm={handleSubmit}></FormCreate>
        </Col>
        <Col>
      {chain && <Board blockChain={chain} > </Board> }
      </Col>
      <Col>
      {chain && <Board blockChain={chain} > </Board> }
      </Col>
    </Row>
    <Row>
        <Col>
      <p> {counter}</p>
      <Button variant={Style.Dark} onClick={(e)=> onSort(e)} > SORT</Button>
      </Col>  
    </Row>
    {chain && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={draw} drawNode={drawNode} width={400}  height={280} > </Canvas>}
    </CanvasContext.Provider>
    </Container>
    </div>
  )}

export default App;
