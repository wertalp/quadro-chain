import { captureRejectionSymbol } from "events";
import { Context } from "vm";
import {BlockChain}  from  "./chain-models" ;
import {canvas_arrow, drawArrowhead, drawConnectLine} from '../utils/chain-utils' ;
import {NODE} from '../utils/util-constants' ;

enum Color {
    "red", 
    "blue",
    "green",
    "yellow"
};

export interface Point {
    xPos   : number ; 
    yPos   : number ;
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

export interface IFormData{
    name : string ;
    val  : number ;
    art  : Style  ;
} 

export interface NodeData{
    label  :  string ;
    amount :  number ;
}
        
  export  interface IShapeNode {
        preNode    : ShapeNode  ;
        nextNode   : ShapeNode  ;
        amount   : number ; 
        label  ? : string ;
        style    : Style  ;
        payload ?: string ;
        position : Point   ;
        draw :  (ctx: Context) => void  ; 
        delete: () => boolean ;
        move: (pos : Point) => void ;
    };

  export class ShapeNode implements IShapeNode {
    private _preNode    : ShapeNode  = null    ;
    private _nextNode   : ShapeNode  = null    ;
    private _amount     : number     = 0       ;
    private _label      : string     = ""      ;
    private _position   : Point      = {xPos:10 , yPos:10}    ;
    private _mintUrl    : string     =  ""     ; 
    private _style      : Style      = Style.Warning ; 
    private _leftNode   : ShapeNode  = null    ;
    private _rightNode  : ShapeNode  = null    ;

    
    constructor(
     _amount : number ,
     _style  : Style  ,
     _label  : string ,
     _position : Point) 
        {
        this._amount   = _amount   ;   
        if (_style) {
        this._style    = _style    ;
        }
        this._label    = _label 
        this.position  = _position
    }  ;


    draw = (ctx : any): void => {

        if (!ctx) return ;

        let sizeWidth  = ctx.canvas.clientWidth;
        let sizeHeight = ctx.canvas.clientHeight;

        let xPos = this.position.xPos ;
        let yPos = this.position.yPos ;

        ctx.fillStyle = '#FF0000'
        ctx.beginPath();

        if (this.preNode == null) {
            xPos = this.position.xPos ;
            yPos = this.position.yPos ;
        }
        else {
            xPos = this.preNode.position.xPos + NODE.WIDTH + 25;
            this.position.yPos = this.preNode.position.yPos ;
            yPos = this.preNode.position.yPos ;
        }
            this.position.xPos = xPos ;
        
        if ( xPos + NODE.WIDTH+40 > sizeWidth){
            this.position.xPos = 10 ;
            this.position.yPos = this.position.yPos + NODE.HEIGHT+5 ;
        }
    
        this.paintLabel(ctx , this.position) ;

        ctx.stroke();

    }

    paintLabel = (ctx : any , pos :Point) => {
        let xPos = pos.xPos ;
        let yPos = pos.yPos ;
        ctx.beginPath()     ; 
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.rect(xPos,yPos, NODE.WIDTH, NODE.HEIGHT);
        ctx.fillStyle = NODE.COLOR ;
        ctx.fillRect(xPos,yPos, NODE.WIDTH, NODE.HEIGHT);   
        ctx.font = "9px Verdana";
        ctx.fillStyle = "#000000";
        ctx.fillText( this.label ,xPos+10,yPos+15 )    ; 
        ctx.font = "8px Verdana";
        ctx.fillText( this._amount ,xPos+NODE.WIDTH-20,yPos+8 )    ; 
        if (this.preNode) {
          // drawConnectLine( ctx,this.position, this.position);
         }
     
        ctx.stroke();
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

    get position() : Point  {
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

    get leftNode() : ShapeNode {
        return this._leftNode ;
    }

    set leftNode( nNode : ShapeNode)  {
        this._leftNode = nNode ;
    }

    get rightNode() : ShapeNode {
        return this._rightNode ;
    }

    set rightNode( nNode : ShapeNode)  {
        this._rightNode = nNode ;
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





