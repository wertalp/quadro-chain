import { ShapeNode} from  "./index-models" ;


export class BlockChain {

    chainName   : string    ; 
    rootNode    : ShapeNode ;
    currentNode : ShapeNode ;
    
    constructor( _chainName : string, 
                 _rootNode  : ShapeNode  
                 ){
                    this.chainName   = _chainName    ;
                    this.rootNode    = _rootNode     ;
                    this.currentNode = this.rootNode ;
                 }

    addnextNode = (itemNode : ShapeNode) => { 
        this.currentNode.nextNode = itemNode ;
        this.currentNode = itemNode ;
        console.log("adding Node",itemNode.amount.toString()) } ;


    drawChain   = () =>  {
        while ( this.currentNode.nextNode != null){
          this.currentNode = this.currentNode.nextNode ;
          console.log("here we go with node " +this.currentNode.amount );
        }
    };

    searchNode = ( rootNode : ShapeNode) : ShapeNode=> { return new ShapeNode(false,null, null, 30 )}

}