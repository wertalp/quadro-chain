import { Context } from "vm";
import { ShapeNode, IShapeNode} from  "./index-models" ;


export class BlockChain {

    private chainName   : string    ; 
    private rootNode    : ShapeNode ;
    private currentNode : ShapeNode ;
    private lastNode    : ShapeNode ;

    
constructor( _chainName : string, 
             _rootNode  : ShapeNode  )
    {
    this.chainName   = _chainName    ;
    this.rootNode    = _rootNode     ;
    this.currentNode = this.rootNode ;
    }

public addnextNode = (itemNode : ShapeNode) => { 
    itemNode.preNode =this.currentNode   ;
    this.currentNode.nextNode = itemNode ;

    this.currentNode = itemNode    ;
    this.lastNode    = itemNode    ;
    if (!itemNode.preNode){
         itemNode.preNode = this.currentNode ;
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


getallValues =  (): IShapeNode[] => {
    let nodes : IShapeNode[] = [] ;
    let currNode : ShapeNode = null ;
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


}