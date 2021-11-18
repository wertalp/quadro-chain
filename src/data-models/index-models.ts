
    enum Color {
        "red", 
        "blue",
        "green",
        "yellow"
    
    };
     interface Point {
      xPos   : number ; 
      yPos   : number ;
      width? : number
    }
    
     interface Position {
     position : Point;
     }
    
  export  interface IShapeNode {
        isRootNode : boolean   ;
        preNode  :  IShapeNode  ;
        nextNode :  IShapeNode  ;
        amount   : number ; 
        label  ? : string ;
        color  ? : Color  ;
        payload ?: string ;
        position : Position   ;
        draw :  () => boolean  ; 
        delete: () => boolean ;
        move: (pos : Position) => void ;
    };

  export class ShapeNode implements IShapeNode {
        public isRootNode : boolean    = false  ;
        public preNode    : ShapeNode           ;
        public nextNode   : ShapeNode  = null   ;
        public amount     : number     = 0      ;
        public position   : Position   = null   ;
        public mintUrl    : string     =  ""    ; 
    
        constructor(
            isRootNode : boolean   ,
            _preNode   : ShapeNode ,
            _nextNode  : ShapeNode ,
            _amount    : number    ,
            _position  : Position  ,
        ) 

        {
            if (isRootNode){
                this.preNode = null   ;        
            }
            else { 
            this.isRootNode = false   ;    
            this.preNode  = _preNode  ;
            }
            this.amount   = _amount   ;   
            this.position = _position ;
            
        } ;

    draw = (): boolean => {
        console.log("drawing");
        return true ;
    }

    delete = (): boolean => {
        console.log("deleting");
        return true ;
    }

    move = (pos : Position)  => {
        console.log("move from to");
        this.position.position.xPos = pos.position.xPos ;
        return true ;
    } 

    mintNodeUrl = () => {

    }

    }





