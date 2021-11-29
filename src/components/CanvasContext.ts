import React from 'react' ;


interface IParamCTX {
        value : "" ,
        changeContext? : (ctx: any)  => void
    }


export const CanvasContext = React.createContext<IParamCTX>({value: ""}) ;