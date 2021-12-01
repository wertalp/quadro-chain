import {ShapeNode, Point,  IFormData, IShapeNode} from '../data-models/index-models'  ;
import { BlockChain}                              from '../data-models/chain-models'  ; 
import {Style}                                    from '../data-models/index-models'  ;

let position : Point  = { xPos: 10, yPos :10};

export const createRootNode = () => {
    return new ShapeNode(1,Style.Dark,"RootNode", position ) ;
 }


export const createChain = () : BlockChain => {
    let myChain : BlockChain ;
    console.log("starting ... creating Chain ") ;
    setTimeout(() => { console.log("Waiting short TiemOut ....")},5000) ;
    myChain = new BlockChain("QuadroChain",createRootNode()) ;
    console.log("starting ... creating Chain ") ;
    return myChain ;      
}

export const clearCanvas = ( ctx : any) : Boolean => {
    if(!ctx) return false  
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            return true ;
}

export const canvas_arrow =(context : any, fromPosition: Point, toPosition :Point) => {
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


