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
    let startCounter       : number = 1 ;

    const [chain,    setChain]    = useState<BlockChain>(null) ;
    const [counter,  setCounter]   = useState<number>(startCounter)       ;  
    const [rerender, setRerender]  = useState(false)           ;
    const [currentNode, setCurrentNode]  = useState(null)      ;
    const [context, setContext]  = useState(null)              ;
 

   useEffect( 
        () => {  
        console.log("starting ... hooking; use Effect ") ; 
        setCounter(() => counter+1) ;
        initSetup()           ;  
        },[] )


  const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve ) => 
        resolve( Utils.createChain())  
        );      
     

  const handleSubmit = ( formInfo : IFormData) => {
          position.xPos = chain.CurrentNode.position.xPos + 130 ;
          position.yPos = chain.CurrentNode.position.yPos       ;
          setChain(chain.addnextNode(
                   new ShapeNode(formInfo.val ,
                                formInfo.art ,
                                formInfo.name,
                                position)))   ;  
          chain.CurrentNode.draw(context)     ; 
          setCounter( (counter) => ( counter +1 ))
          setRerender(!render) ;                               
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


  const drawList = (e : any) => {
     drawLinkedList( context) ;
  }       

  const drawLinkedList = (ctx : any):Boolean => {
    if( Utils.clearCanvas(ctx))
        return true 
    if(chain) {
      let cNode : ShapeNode =  chain.RootNode ;

      while (cNode.nextNode) {
        cNode.draw(ctx) ;
        cNode = cNode.nextNode ;
      }
      setRerender(!render) ;
 
    } else {
      return ;
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
      {chain && <Board blockChain={chain}  counter={counter}> </Board> }
      </Col>
      <Col>
      {chain && <Board blockChain={chain}  counter={counter}> </Board> }
      </Col>
    </Row>
    <Row>
        <Col>
      <p> {counter}</p>
      <Button variant={Style.Dark} onClick={(e)=> drawList(e)} > SORT</Button>
      </Col>  
    </Row>
    {chain && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={drawLinkedList} drawNode={drawNode} width={800}  height={400} > </Canvas>}
    </CanvasContext.Provider>
    </Container>
    </div>
  )}

export default App;
