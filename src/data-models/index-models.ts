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

export enum  Style  {
    Info      = "outline-info"      ,
    Primary   = "outline-primary"   ,
    Secondary = "Secondary" ,
    Warning   = "outline-warning"   ,
    Success   = "outline-success"   ,
    Light     = "outline-light"     ,
    Dark      = "outline-dark"      
}    
        
  export  interface IShapeNode {
        preNode    : ShapeNode  ;
        nextNode   : ShapeNode  ;
        amount   : number ; 
        label  ? : string ;
        style    : Style  ;
        payload ?: string ;
        position : Point   ;
        draw :  () => boolean  ; 
        delete: () => boolean ;
        move: (pos : Point) => void ;
    };

  export class ShapeNode implements IShapeNode {
    private _preNode    : ShapeNode  = null    ;
    private _nextNode   : ShapeNode  = null    ;
    private _amount     : number     = 0       ;
    private _label      : string     = ""      ;
    private _position   : Point      = null    ;
    private _mintUrl    : string     =  ""     ; 
    private _style?      : Style      = Style.Warning ; 

    
    constructor(
        _amount    : number ,
        _style?     : Style) 
        {
        this._amount   = _amount   ;   
        if (_style) {
        this._style    = _style    ;
        }
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
        this._position.xPos = point.xPos ;
        return true ;
    } 

    get Position() : Point  {
        return this._position ;
    } ;

    set position(pos :Point) {
        this.position.xPos = pos.xPos ;
        this.position.yPos = pos.yPos ;
    } ;

    mintNodeUrl = () => {
    }

    get preNode() : ShapeNode {
        return this._preNode ;
    }

    set preNode( nNode : ShapeNode)  {
        this._preNode = nNode ;
    }

    get nextNode() : ShapeNode {
        return this._nextNode ;
    }

    set nextNode( nNode : ShapeNode)  {
        this._nextNode = nNode ;
    }

    get amount() : number {
        return this._amount ;
    }

    get label() : string {
        return this._label ;
    }

    set label( label : string)  {
        this._label = label ;
    }

    get style( )  {
        return this._style ;
    }

    set style( style : Style)  {
        this._style = style ;
    }

}

export interface BlockChainProps {
    blockChain : BlockChain ;
    }    





