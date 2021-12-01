import { captureRejectionSymbol } from "events";
import { Context } from "vm";
import {BlockChain}  from  "./chain-models" ;
import {canvas_arrow, drawArrowhead, drawConnectLine} from '../utils/chain-utils' ;

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
            let sizeWidth = ctx.canvas.clientWidth;
            let sizeHeight = ctx.canvas.clientHeight;

            ctx.fillStyle = '#000000'
            ctx.beginPath();
            let xPos = this.position.xPos ;
            let yPos = this.position.yPos ;

            if ( xPos+200 > sizeWidth){
                this.position.xPos = 0 ;
                this.position.yPos = this.position.yPos +40 ;
            }
            ctx.strokeStyle = "black";
            ctx.rect(xPos,yPos, 90, 30);
            ctx.fillStyle = "#FFFF00";
            ctx.fillRect(xPos,yPos, 90, 30);   
            ctx.font = "16px Verdana";
            ctx.fillStyle = "#000000";
            ctx.fillText( this.label ,xPos+15,yPos+18 )    ; 
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            if (this._preNode) {
                drawConnectLine( ctx,this.position, this.position);
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





