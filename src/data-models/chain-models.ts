import { getNodeMajorVersion } from "typescript";
import { Context } from "vm";
import { NODE } from "../utils/util-constants";
import { ShapeNode, IShapeNode} from  "./index-models" ;


export class BlockChain {

    private chainName   : string    ; 
    private rootNode    : ShapeNode ;
    private currentNode : ShapeNode ;
    private lastNode    : ShapeNode ;
    private isRoot      : boolean   ;

    
constructor( _chainName : string, 
             _isRoot    : boolean = true )
    {
    this.chainName   = _chainName    ;
    this.is_Root      = _isRoot      ;
    
    if(this.isRoot) {
        this.currentNode = null ;
        this.lastNode    = null ;
        this.rootNode    = null ;
    }

    }

public addnextNode = (itemNode : ShapeNode) => { 
    if (this.is_Root){
        this.isRoot   = false       ;
        this.rootNode = itemNode    ;
        this.currentNode = itemNode ;
        this.lastNode    = itemNode ;
        this.rootNode.preNode    = null ;
        this.currentNode.preNode = null ;
        }
    else {
        itemNode.preNode =this.currentNode   ;
        this.currentNode.nextNode = itemNode ;
        this.currentNode = itemNode    ;
        this.lastNode    = itemNode    ;
    }    


    this.currentNode = itemNode    ;
    console.log("adding Node",itemNode.label.toString()) ;
    return this ;
} ;


private findLastNode = (currentNode : ShapeNode): ShapeNode => {  
    
    let lastNode : ShapeNode = null ;
    if ( ! currentNode.nextNode ){
        return currentNode ; }
    while ( this.findLastNode( currentNode.nextNode) )
    { try{ lastNode = currentNode.nextNode ; }
        catch(e)
        { console.log(e);};
        } ;
    return lastNode ;
}

drawChaintoCanvas   = (ctx : any) =>  {
    this.currentNode = this.rootNode ;
    while ( this.currentNode ){
    this.currentNode.draw(ctx) ;
    this.currentNode = this.currentNode.nextNode ;
    }
};

buildBinaryTree = ( ctx :any) : BlockChain => {
    
    let btreechain  : BlockChain  = null ;
    this.currentNode =  this.RootNode    ; 
    btreechain       =  new BlockChain("Whatever", true) ;
    btreechain.addnextNode(this.rootNode) ;
    

    const getNextNode = ( node :ShapeNode)  => {
   
    
        if ( node.amount >= node.preNode.amount ){
        if (node.rightNode) {
            getNextNode( node.rightNode)  ;
        } 
        node.preNode.rightNode = node         ;
        node.position = node.preNode.position ;
        node.position.xPos = node.position.xPos + NODE.WIDTH     ;
        node.position.yPos = node.position.yPos + NODE.HEIGHT+20 ;
        return node ;
        }
        if ( node.amount < node.preNode.amount){
            if (node.leftNode){
            getNextNode(node.leftNode) ;
            }
        node.preNode.leftNode = node          ;
        node.position = node.preNode.position ;
        node.position.xPos = node.position.xPos - NODE.WIDTH     ;
        node.position.yPos = node.position.yPos + NODE.HEIGHT+20 ;
        return node ;
        }    
    }
     
     while ( this.currentNode.nextNode){
        btreechain.addnextNode(getNextNode(this.currentNode)) ;
        this.currentNode.draw(ctx) ;
        this.currentNode = this.currentNode.nextNode          ;
     }

return btreechain ;

}


getallValues =  (): IShapeNode[] => {
    let nodes : IShapeNode[] = [] ;
    let currNode : ShapeNode = null ;
       if( typeof this.is_Root === 'undefined'){
           return [] ;
       }
        currNode = this.rootNode ;

    while ( currNode.nextNode ){
            currNode = currNode.nextNode ;
            nodes.push(currNode);
        }
    return  nodes ;
} 

sortValues = (): IShapeNode[] => {
    if (! this.rootNode){
    return ;
    }
    return this.getallValues().sort( (a,b) =>  a.amount - b.amount )   
}

get Chainname() : string  {
    return this.chainName ;
} ;
set Chainname(_name : string) {
    this.chainName = _name ;
}

get CurrentNode() : ShapeNode  {
    return this.currentNode ;
} ;
set CurrentNode( _cnode : ShapeNode) {
    this.currentNode = _cnode ;
};


get RootNode() : ShapeNode {
    return this.rootNode  ;
}
set RootNode( _node :ShapeNode)  {
    this.rootNode =_node ;
}

get is_Root() : boolean  {
    return this.isRoot ;
} ;
set is_Root( _isRoot : boolean) {
    this.isRoot = _isRoot ;
};


}