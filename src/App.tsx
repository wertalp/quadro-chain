import React, { ChangeEventHandler, FunctionComponent, useEffect, useState} from 'react' ;
import ReactDOM from 'react-dom' ;
import logo from './logo.svg'    ;
import './App.css'               ;
import {ShapeNode, Point, BlockChainProps, IFormData, IShapeNode, NodeData, IPersonData, PersonDataProps} from './data-models/index-models'  ;
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
import { CustSpinner } from './components/CustSpinner';
import { PersonCard }  from './components/PersonCard' ;
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

 

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
    const [loading, setLoading  ]        = useState(true)            ;
    const [personDatas , setPersonDatas] = useState<IPersonData[]>(null) ;


   useEffect( 
        () => {  
        console.log("starting ... hooking; use Effect ") ; 
        myChain = Utils.createChain() ;
   
     const initSetup = async () => {
        if (loading && !isTest) {
            promiseBC
            .then( item =>  { setChain(item)})
          };  
          
        if (loading && isTest){
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
  
        let url = BASEURL;
        let datas : IPersonData[] ;
        
        datas = await axios.get(url)
          .then( response => response.data)
          .then( res      => res.results  )
          .then( (items)  => 
            items.map( (item : IPersonData) =>  {
            const {  name , location, gender,email, login, registered, id,picture, nat } 
            :     {  name: any , location : any , gender: string, email: string, login:any,
                     registered:any, id:any,picture:any,nat:string} = item ;
      
          return { name , location,gender,email,login,registered,id,picture,nat };} )
          )
          .catch( (error: any) => console.log("Error fetching data fro API: "+error )) ;
         
        await new Promise(resolve => setTimeout(resolve, 1000)).then( res => { setLoading(false) ;setPersonDatas(datas) ;  return res})                
                    
        datas.forEach( async (item : IPersonData ) => {
          var myNode : ShapeNode ;
              myNode = MAPPING.mapJsonToShapeNode(item.name.last , item.location.postcode ) ;
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
        chain.buildBinaryTree(context) ;
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
        {personDatas && <PersonCard PersonDatas={personDatas}></PersonCard> } 
        <div className="nodeInfoDIV">
      <p> {counter}</p>
      Name :  {chain && <p>{chain.Chainname} </p>  } 
      RootNode:  {chain && <p>{chain.RootNode.label} </p>} 
      CurrentNode:  {chain && <p> {chain.CurrentNode.label} </p>}

      <div onChange={onChangeValue}>
        <input type="radio" value="Male" name="gender"  /> Clear
        <input type="radio" value="Female" name="gender" /> Binary
        <input type="radio" value="Other" name="gender" /> Sort
      </div>

    </div>
        </Col>

        <Col>
        {loading ? <Spinner animation="border" /> :
      <CanvasContext.Provider value={{ value : "" , changeContext: (ctx) => changeContext(ctx)}}  >
      {chain && <Canvas  blockchain={chain} node={chain.CurrentNode} draw={drawLinkedList} drawNode={drawNode} width={740}  height={420} > </Canvas>}
      </CanvasContext.Provider>}


      <p> {counter}</p>
      <Button variant={Style.Dark} onClick={(e)=> buildTree(e)} > Tree</Button>
      <Button variant={Style.Info} onClick={(e)=> buildBinaryTRee(e)} > BinaryTree</Button>
      <Button variant={Style.Info} onClick={(e)=> buildTree(e)} > Alpha</Button>
      <Button variant={Style.Success} onClick={(e)=> buildTree(e)} > Numeric</Button>
      </Col>
  
    </Row>
    <Row>
      <Col>
  

      </Col>
      <Col>
  
      {chain && <Board blockChain={chain}  counter={counter}> </Board> }
  </Col>
  <Col>
  {chain && <Board blockChain={chain}  counter={counter}> </Board> }

  </Col>
   
  
    </Row>
    <AmplifySignOut/>

  </Container>

    </div>
  )}

export default withAuthenticator(App);
