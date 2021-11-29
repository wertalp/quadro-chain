import {ShapeNode, Point,  IFormData, IShapeNode} from '../data-models/index-models'  ;
import { BlockChain}                              from '../data-models/chain-models'  ; 
import {Style}                                    from '../data-models/index-models'  ;

let position : Point  = { xPos: 10, yPos :10};

export const createRootNode = () => {
    return new ShapeNode(1,Style.Dark,"RootNode", position ) ;
 }

 
export const createChain =  () : BlockChain => {
    let myChain : BlockChain ;
    console.log("starting ... creating Chain ") ;
    setTimeout(() => { console.log("Waiting short TiemOut ....")},5000) ;
    myChain = new BlockChain("QuadroChain",createRootNode()) ;
    console.log("starting ... creating Chain ") ;
    return myChain ;      
}

