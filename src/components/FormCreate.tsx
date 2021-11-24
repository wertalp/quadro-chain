import React, {FormEvent, FormEventHandler, FunctionComponent, useEffect, useState} from'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlockChain } from '../data-models/chain-models';
import { IShapeNode, ShapeNode, IFormData } from '../data-models/index-models';
import { getEmitHelpers } from 'typescript';
import {Form, FormSelect} from 'react-bootstrap'
import {Style}      from '../data-models/index-models' ;



interface FormProps {
    blockChain : BlockChain              ;
    submitForm : (formInfo :IFormData) => void     ;
 }


export const FormCreate : React.FC<FormProps> = (props : FormProps) =>  {
    const [style , setStyle]     = useState(Style.Info)  ;
    const [option, setOption]    = useState<string>( "") ;
    const [formData , setFormData ] = useState<IFormData>(({name:"", val:1,art: Style.Info})) ;

useEffect( () => {              
       
})

const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault() ; 

    if(formData.name) {
        props.submitForm(formData) ;
    }
   //setFormData( name : event.currentTarget.value )
}

const onChangeStyle = ( e: React.FormEvent<any>) =>  {
    console.log("you clicked" + e.currentTarget.value);
    setFormData( {...formData , art : e.currentTarget.value })
 }  

 const changeState = ( event: React.FormEvent<any>) =>  {
     setFormData( { ...formData, [event.currentTarget.name] : event.currentTarget.value})
 }  

return (
    <div style={{ display: 'inline-flex', 
                  padding: 5 ,
                  border : 1}}>
   
      <Form  className="cform"  id="formCreateNode" onSubmit={(event) => handleSubmit(event)}>
      <Form.Group>
          <Form.Label>Node Name:</Form.Label>
          <Form.Control type="text" 
                        placeholder="NodeText" 
                        value={formData.name}
                        name="name"
                        onChange={e => changeState(e)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Node Value</Form.Label>
          <Form.Control type="number" 
                        placeholder="Value -Node"
                        name="val"
                        onChange={e => changeState(e)}
                        value={formData.val} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Style</Form.Label>
          <Form.Control type="label" 
                        placeholder="style"
                        name="style"
                        value={formData.art}
                        onChange={e => changeState(e)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Style</Form.Label>
          <select  onChange={ (e) => onChangeStyle(e) }>
        {(Object.keys(Style) as (keyof typeof Style)[])
           .map( enumKey =>  <option key={Style[enumKey]} label={enumKey} value={Style[enumKey]} />  )}
        </select>
        </Form.Group>
     <Form.Group>
     <Button variant="primary" type="submit">
          ADD 
        </Button>
     </Form.Group>
      </Form>
    </div>
  );
}
