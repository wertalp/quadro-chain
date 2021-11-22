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
    this.currentNode.nextNode = itemNode ;
    this.lastNode = itemNode    ;
    this.currentNode = itemNode ;
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

drawChain   = () =>  {
    this.currentNode = this.rootNode ;
    while ( this.currentNode ){
    console.log("here we paint node " +this.currentNode.amount );
    this.currentNode = this.currentNode.nextNode ;
    }
};

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


 

}