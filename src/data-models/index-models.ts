import {BlockChain}  from  "./chain-models" ;

enum Color {
    "red", 
    "blue",
    "green",
    "yellow"
};


export interface Point {
    xPos   : number ; 
    yPos   : number ;
    width? : number
    }
        
  export  interface IShapeNode {
        preNode  :  IShapeNode  ;
        nextNode :  IShapeNode  ;
        amount   : number ; 
        label  ? : string ;
        color  ? : Color  ;
        payload ?: string ;
        position : Point   ;
        draw :  () => boolean  ; 
        delete: () => boolean ;
        move: (pos : Point) => void ;
    };

  export class ShapeNode implements IShapeNode {
        public preNode    : ShapeNode  = null   ;
        public nextNode   : ShapeNode  = null   ;
        public amount     : number     = 0      ;
        public position   : Point   = null   ;
        public mintUrl    : string     =  ""    ; 
    
        constructor(
            _amount    : number ) 
        {
            this.amount   = _amount   ;   
        } ;

    draw = (): boolean => {
        console.log("drawing");
        return true ;
    }

    delete = (): boolean => {
        console.log("deleting");
        return true ;
    }

    move = (point : Point)  => {
        console.log("move from to");
        this.position.xPos = point.xPos ;
        return true ;
    } 

    get Position() : Point  {
        return this.position ;
    } ;

    set Position(pos :Point) {
        this.position.xPos = pos.xPos ;
        this.position.yPos = pos.yPos ;
    } ;

    mintNodeUrl = () => {

    }
}

export interface BlockChainProps {
    blockChain : BlockChain ;
    }    





