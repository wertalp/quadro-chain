import React, { ChangeEventHandler, FunctionComponent, useEffect, useState} from 'react' ;
import ReactDOM from 'react-dom' ;
import logo from './logo.svg'    ;
import './App.css'               ;
import {ShapeNode, Point, BlockChainProps, IFormData, IShapeNode, NodeData} from './data-models/index-models'  ;
import {BlockChain}    from './data-models/chain-models' ;
import Board           from './components/Board'         ;
import Button          from 'react-bootstrap/esm/Button' ;
import Spinner          from 'react-bootstrap/esm/Spinner' ;
import {render}        from '@testing-library/react'     ;
import {Container, Form, Row, Col}  from 'react-bootstrap' ;
import {Style}         from './data-models/index-models' ;
import {FormCreate}    from './components/FormCreate'    ;
import Canvas          from './components/Canvas'        ;
import * as Utils      from './utils/chain-utils'        ;
import * as MAPPING    from './utils/map-utils'         ;
import {CanvasContext} from './components/CanvasContext' ;   
import dataNodes       from './test/test-data/test-tree.json' ;
import  * as apiutil   from './utils/api-fetch' ;
import  axios,{ AxiosInstance} from 'axios';
import { BASEURL } from './utils/util-constants';
import { isTemplateSpan } from 'typescript';
 


export  const App : FunctionComponent<{}> = () =>  {
    let myChain       : BlockChain  = null ; 
    let isLoading     : boolean     = true ;
    let isTest        : boolean     = true ;
    let position      : Point  = { xPos: 20, yPos :20};
    let startCounter  : number = 1      ;
    let hspacer       : number = 10     ;
    let loadedData    : NodeData[] = [] ;


    const [chain,    setChain   ]        = useState<BlockChain>(null)     ;
    const [counter,  setCounter ]        = useState<number>(startCounter) ;  
    const [rerender, setRerender]        = useState(false)           ;
    const [currentNode, setCurrentNode]  = useState(null)            ;
    const [context, setContext  ]        = useState(null)            ;



   useEffect( 
        () => {  
        console.log("starting ... hooking; use Effect ") ; 
        myChain = Utils.createChain() ;
   
     const initSetup = async () => {
        if (isLoading && !isTest) {
            promiseBC
            .then( item =>  { setChain(item)})
          };  
          
        if (isLoading && isTest){
          loadedData = [...dataNodes];
          loadedData
          .forEach( async (item ) => {
          var myNode : ShapeNode ;
              myNode = MAPPING.mapJsonToShapeNode(item.label , item.amount ) ;
              myChain.addnextNode(myNode);   
            });
              setChain(myChain) ;  
        }
      };

      //initSetup() ;
      
      const loadAPIDATA = async () => {
        let client : AxiosInstance = null ;
        let url = BASEURL;
        let datas : any[] ;
        
         datas = await axios.get(url)
              .then( response => response.data)
              .then( res      => res.results  )
              .then( (items)  => 
                      items.map( (item : any) =>  {
                      const { name , location} : { name: any , location : any} = item ;
                return { name , location };} )
              ).then(
                items => items.map( (items :any) =>  
                        ({ amount : items.location.street.number , label : items.name.last }) ))
                        .catch( (error: any) => console.log("Error fetching data fro API: "+error )) ;
                    
        datas.forEach( async (item ) => {
          var myNode : ShapeNode ;
              myNode = MAPPING.mapJsonToShapeNode(item.label , item.amount ) ;
              myChain.addnextNode(myNode);   
            });
              setChain(myChain) ;  
              console.log(datas);

         }

    loadAPIDATA() ;   

    },[counter] )


 const promiseBC : Promise<BlockChain> = new Promise<BlockChain>( ( resolve ) => 
         resolve( Utils.createChain( ))  
          );      
     

  const handleSubmit = ( formInfo : IFormData) => {
    let currNode : ShapeNode =   
    new ShapeNode(
          formInfo.val ,
          formInfo.art ,
          formInfo.name,
          position)
    if (!chain.CurrentNode){
     setChain(Utils.createChain()) ;  
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
     

  const buildTree = (e : any) => {
    isLoading = true ;
    Utils.buildTree( chain , context) ;
      } 

  const buildBinaryTRee = ( e: any) => {
    Utils.clearCanvas(context) ;
        chain.buildBinaryTree(context)
  }   
      
   const onChangeValue = (event : any) => {
    isLoading = false ;

   }   

  
    const drawLinkedList = (ctx : any):Boolean => {
    if( Utils.clearCanvas(ctx)) {
      if(chain) {
        let cNode : ShapeNode =  chain.RootNode ;
  
        while (cNode.nextNode) {
          cNode.draw(ctx)        ;
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
        {!chain && <Board blockChain={chain}  counter={counter}> </Board> }</Col>
        <Col></Col>
        <Col>
      {!chain && <Board blockChain={chain}  counter={counter}> </Board> }
      </Col>
    </Row>
  <Row>
  <Col>
    <CanvasContext.Provider value={{ value : "" , changeContext: (ctx) => changeContext(ctx)}}  >
      {false && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={drawLinkedList} drawNode={drawNode} width={180}  height={200} > </Canvas>}
    </CanvasContext.Provider>

    </Col>
    <Col>
    {false ? <Spinner animation="border" /> :
    <CanvasContext.Provider value={{ value : "" , changeContext: (ctx) => changeContext(ctx)}}  >
      {chain && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={drawLinkedList} drawNode={drawNode} width={850}  height={800} > </Canvas>}
    </CanvasContext.Provider>}
    </Col>
    <Col>
    <div className="nodeInfoDIV">
    <Col>
      <p> {counter}</p>
   Name :  {chain && <p>{chain.Chainname} </p>  } 
   RootNode:  {chain && <p>{chain.RootNode.label} </p>} 
   CurrentNode:  {chain && <p> {chain.CurrentNode.label} </p>}

   <div onChange={onChangeValue}>
        <input type="radio" value="Male" name="gender"  /> Clear
        <input type="radio" value="Female" name="gender" /> Binary
        <input type="radio" value="Other" name="gender" /> Sort
      </div>
      </Col>
    </div>
      <p> {counter}</p>
      <Button variant={Style.Dark} onClick={(e)=> buildTree(e)} > Tree</Button>
      <Button variant={Style.Info} onClick={(e)=> buildBinaryTRee(e)} > BinaryTree</Button>
      <Button variant={Style.Info} onClick={(e)=> buildTree(e)} > Alpha</Button>
      <Button variant={Style.Success} onClick={(e)=> buildTree(e)} > Numeric</Button>
      </Col>
  </Row>
  </Container>

    </div>
  )}

export default App;
