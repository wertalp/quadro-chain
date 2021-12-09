import { ShapeNode } from  "../data-models/index-models";
import {Style}       from  '../data-models/index-models' ;




export const mapJsonToShapeNode =  (label : string ,amount :number ) : ShapeNode =>{
 
    let shapeNode : ShapeNode = null;

    try {  shapeNode = new ShapeNode(amount,Style.Dark,label, {xPos :10 ,yPos:10})
        } 
    catch( e: any){
        return null ;
    }
    
    return shapeNode ;

}