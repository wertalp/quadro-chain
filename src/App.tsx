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
    let myChain       : BlockChain  = null ; 
    let isLoading     : boolean     = true ;
    let position      : Point  = { xPos: 10, yPos :20};
    let startCounter  : number = 1  ;
    let hspacer       : number = 80 ;

    const [chain,    setChain]    = useState<BlockChain>(null) ;
    const [counter,  setCounter]   = useState<number>(startCounter)       ;  
    const [rerender, setRerender]  = useState(false)           ;
    const [currentNode, setCurrentNode]  = useState(null)      ;
    const [context, setContext]  = useState(null)              ;
 

   useEffect( 
        () => {  
        console.log("starting ... hooking; use Effect ") ; 
        setCounter(() => counter+1) ;
        
        const initSetup = async () => {
         promiseBC
                 .then( item =>  { setChain(item) ; return item  })
                 .then( item =>  item.RootNode.draw(context) )
        };        
        initSetup() ;

        },[] )


 const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve ) => 
         resolve( Utils.createChain( new ShapeNode(10,Style.Dark,"Init",{ xPos:0 ,yPos:0})))  
          );      
     

  const handleSubmit = ( formInfo : IFormData) => {
    let currNode : ShapeNode =   
    new ShapeNode(
          formInfo.val ,
          formInfo.art ,
          formInfo.name,
          position)
    if (!chain){
     setChain(Utils.createChain(currNode)) ;  
     currNode.draw(context)                ; 
     return
    
    }  
      currNode.position.xPos = chain.CurrentNode.position.xPos + hspacer ;
      currNode.position.yPos = chain.CurrentNode.position.yPos       ;
  
        setChain(chain.addnextNode(currNode))  ;  
        currNode.draw(context)                 ; 
        setCounter( (counter) => ( counter +1 ))     
        setRerender(!render) ;   
    } 
     


  const drawList = (e : any) => {
     drawLinkedList( context) ;
  }       

  const buildtree = (e : any) => {
    Utils.buildTree( chain , context) ;
    //setChain(null) ;
 }       

  const drawLinkedList = (ctx : any):Boolean => {
    if( Utils.clearCanvas(ctx)) {
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
      <Row>
        <Col>
        <FormCreate blockChain={chain} submitForm={handleSubmit}></FormCreate>
        </Col>
        <Col>
      {chain && <Board blockChain={chain}  counter={counter}> </Board> }
      </Col>
    </Row>
  <Row>
    <Col>
    <FormCreate blockChain={chain} submitForm={handleSubmit}></FormCreate>
    </Col>
    <Col>
      <CanvasContext.Provider value={{ value : "" , changeContext: (ctx) => changeContext(ctx)}}  >
      {chain && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={drawLinkedList} drawNode={drawNode} width={800}  height={400} > </Canvas>}
    </CanvasContext.Provider>
    </Col>
    <Col>
      <p> {counter}</p>
      <Button variant={Style.Dark} onClick={(e)=> buildtree(e)} > SORT</Button>
      </Col>
  </Row>
  </Container>

    </div>
  )}

export default App;
