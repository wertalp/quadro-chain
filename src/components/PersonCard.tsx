import { Fragment, useEffect, useState } from "react";
import {  Button } from "react-bootstrap"

import  {IPersonData, PersonDataProps} from '../data-models/index-models'  ;

export const PersonCard : React.FC<PersonDataProps> = ( {PersonDatas} : PersonDataProps)  =>  {

     let personData : IPersonData = PersonDatas[1] ;
     const [index,setIndex] = useState(0);


     const forward = (e: any) => {
        if (index === PersonDatas.length) 
        return ; 
        setIndex( index+1) ;
     }

     const goback = (e: any) => {
        if (index === 0) 
        return ; 
        setIndex( index-1) ;
   }

    useEffect( () => {
        personData.name.first = PersonDatas[index].name.first ; 
        personData.email = PersonDatas[index].email ; 
        personData.name.last = PersonDatas[index].name.last ;
        personData.registered.age = PersonDatas[index].registered.age ;
        personData.picture.thumbnail = PersonDatas[index].picture.thumbnail ;
    },[index])

    return (
  <Fragment>
      <div className="personCard">
      <h4>  PersonDatas </h4>

    <img 
   src={personData.picture.thumbnail} alt="Here we do" onError={(e) => { } }/>
    
        <p>Name</p> {personData.name.last}
        <p>Vorname</p>{personData.name.first}
        <p>Alter</p>{personData.registered.age}

        <p>Email:</p>{personData.email}

    </div>
    <Button variant="primary" onClick={ (e) => goback(e)}> Before</Button>
    <Button variant="primary" onClick={ (e) => forward(e)} > Next </Button>
  </Fragment>
 );
}