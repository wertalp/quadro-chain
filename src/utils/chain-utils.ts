import {ShapeNode, Point,  IFormData, IShapeNode} from '../data-models/index-models'  ;
import { BlockChain}                              from '../data-models/chain-models'  ; 
import {Style}                                    from '../data-models/index-models'  ;
import { NODE } from './util-constants';
import { SIGXFSZ } from 'constants';
import { Block } from 'typescript';

let position : Point  = { xPos: 10, yPos :10};

export const createRootNode = () => {
    return new ShapeNode(1,Style.Dark,"RootNode", position ) ;
 };
 
export const  delay = (ms: number) : Promise<number> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

export const createChain = () : BlockChain => {
    let myChain : BlockChain ;
    console.log("starting ... creating Chain ") ;
    myChain = new BlockChain("QuadroChain",true) ;
    console.log("starting ... creating Chain ") ;
    return myChain ;      
}

export const clearCanvas = ( ctx : any) : Boolean => {
    if(!ctx) return false  
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#89DBF9';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
    return true ;
}

export const canvas_arrow = (context : any, fromPosition: Point, toPosition :Point) => {
    console.log("WE ARE PAINTING ARROWS Function");


    let fromPos : Point = fromPosition ;
    let toPos   : Point = {xPos : fromPosition.xPos+120 , yPos : fromPosition.yPos} ;

    var headlen = 25; // length of head in pixels
    var dx = toPos.xPos - fromPos.xPos ; 
    var dy = toPos.yPos - fromPos.yPos ;
    var angle = Math.atan2(dy, dx);

    context.moveTo(fromPos.xPos+90, fromPos.yPos+20);
    context.lineTo(toPos.xPos, fromPos.yPos +20);
    context.moveTo(toPos.xPos, toPosition.yPos+20);
    context.lineTo(toPos.xPos - headlen/2 * Math.cos(angle + Math.PI / 6), toPos.yPos+15 - headlen * Math.sin(angle - Math.PI / 6));
 
    context.lineTo(toPos.xPos - headlen/2 * Math.cos(angle + Math.PI / 6), toPos.yPos+15 - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke() ;
  
  }

  export const drawArrowhead = (context : any , from :Point, to : Point, radius : number) => {
	var x_center = to.xPos+100;
	var y_center = to.yPos+20;

	var angle;
	var x;
	var y;

	context.beginPath();
    
	angle = Math.atan2(to.yPos - from.xPos, to.yPos - from.xPos)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.moveTo(x, y);

    context.lineTo(from.xPos,from.yPos ,from.xPos+100,from.yPos) 
	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius *Math.cos(angle) + x_center;
	y = radius *Math.sin(angle) + y_center;

	context.lineTo(x, y);

	context.closePath();

	context.fill();
}

export const drawConnectLine = (context : any , from :Point, to : Point) => {

    
    context.strokeStyle = "red";  
	context.moveTo(from.xPos+90, from.yPos+15);
    context.lineTo(from.xPos+130,from.yPos+15) 
    context.stroke() ;
    context.closePath();

}

export const buildTree = async (chain : BlockChain, ctx : any)  =>  {
    clearCanvas(ctx) ;
    chain.CurrentNode = chain.RootNode ;
    let  hspace : number = 12;   
    let  vspace : number =  8;
    let  currentNode : ShapeNode = chain.RootNode ;
    let  _xpos : number  =  0;
    let  _ypos : number  =  0;
    let sizeWidth  = ctx.canvas.clientWidth;
    let sizeHeight = ctx.canvas.clientHeight;
                   
     while (currentNode) {

    if  (! currentNode.preNode) {
        await delay(500) ;
        ctx.font      = "24px Verdana";
        ctx.fillStyle = "#000000";
        ctx.fillText( chain.Chainname, sizeWidth/2-80 , 32 )     ; 
        await delay(800) ;
        //currentNode   = currentNode.nextNode ;
        currentNode.position.xPos = sizeWidth/2 -NODE.WIDTH/2 ;
        currentNode.position.yPos = 60 ;
        chain.RootNode = currentNode ;
        currentNode.preNode = null ;  
    } else {

    if (currentNode.amount < currentNode.preNode.amount){
        console.log("compare to nodes :" 
        + currentNode.amount 
        + " - < " 
        + currentNode.preNode.amount);
        _xpos =  currentNode.preNode.position.xPos - NODE.WIDTH/2  -  hspace ;

    if (currentNode.position.xPos + NODE.WIDTH < NODE.WIDTH/2 -hspace ){
        _xpos =  NODE.WIDTH/2+hspace  ; }
        _ypos =  currentNode.preNode.position.yPos+
                    NODE.HEIGHT + vspace ;

        currentNode.position = {xPos: _xpos , yPos: _ypos} ;
    }
    if (currentNode.amount > currentNode.preNode.amount){
        console.log("compare to nodes :" 
        + currentNode.amount + " - > " 
        + currentNode.preNode.amount);
        
        _xpos =  currentNode.preNode.position.xPos + NODE.WIDTH/2  + hspace     ;
        _ypos =  currentNode.preNode.position.yPos + NODE.HEIGHT   + vspace     ;
            
    if (currentNode.preNode.position.xPos+ NODE.WIDTH/2 > sizeWidth-200 ){
        _xpos = currentNode.preNode.position.xPos ;}
        
       currentNode.position = {xPos: _xpos , yPos: _ypos} ;
        }
    }
        await delay(20) ; 
        currentNode.paintLabel(ctx, currentNode.position)  ;
        if(currentNode.preNode) {
            drawlines(currentNode.preNode,currentNode,ctx) ;
        }
        currentNode = currentNode.nextNode ;
    }         
}


    export const drawlines = (fromNode : ShapeNode , toNode : ShapeNode, ctx : any) : void => {
        
        let pointFrom : Point = {xPos:0  ,yPos:0} ;
        let pointTo   : Point = {xPos:0 , yPos:0} ;      

        console.log("Drawing from X pos: " + fromNode.position.xPos+NODE.WIDTH/2 ) ; 
        console.log("Drawing from Y pos: " + fromNode.position.xPos+NODE.WIDTH/2 ) ; 

 
      if (toNode){

        pointFrom.xPos = fromNode.position.xPos+NODE.WIDTH/2 ;
        pointFrom.yPos = fromNode.position.yPos+NODE.HEIGHT  ;

        pointTo.xPos = toNode.position.xPos+NODE.WIDTH/2 ;
        pointTo.yPos = toNode.position.yPos ;

        console.log("Drawing to X pos: " + toNode.position.xPos+NODE.WIDTH/2 ) ; 
        console.log("Drawing to Y pos: " + toNode.position.xPos+NODE.WIDTH/2 ) ; 
      }
  
        ctx.beginPath();       // Start a new path
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = "1";
        ctx.moveTo(pointFrom.xPos, pointFrom.yPos);    // Move the pen to (30, 50)
        ctx.lineTo(pointTo.xPos, pointTo.yPos);  // Draw a line to (150, 100)
        ctx.stroke();          // Render the path
       
     }

     


