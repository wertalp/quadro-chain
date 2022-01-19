import { Fragment, useEffect, useState } from "react";
import {  Badge, Button } from "react-bootstrap"

import  {IPersonData, PersonDataProps} from '../data-models/index-models'  ;

export const PersonCard : React.FC<PersonDataProps> = ( {PersonDatas} : PersonDataProps)  =>  {

     let personData : IPersonData = PersonDatas[1] ;
     const [index,setIndex] = useState(0);


     const forward = (e: any) => {
        if (index === PersonDatas.length) 
        return ; 
        setIndex( (index ) => index +1) ;
     }

     const goback = (e: any) => {
        if (index === 0) 
        return ; 
        setIndex( (index) => index -1) ;
   }

    useEffect( () => {
        try {
        personData.name.first = PersonDatas[index].name.first ; 
        personData.email = PersonDatas[index].email ; 
        personData.name.last = PersonDatas[index].name.last ;
        personData.registered.age = PersonDatas[index].registered.age ;
        personData.picture.thumbnail = PersonDatas[index].picture.thumbnail ;
            
        } catch (error) {
            console.log( "Error occured " + personData.name.first ) ;
        }

    },[index, PersonDatas,personData])

    return (
  <Fragment>
    <div className="personCard">
        <h6>  Person: <Badge > {index} </Badge> </h6>
    <hr></hr>
        { personData.picture.thumbnail &&  <img src={personData.picture.thumbnail} alt="Here we do" onError={(e) => { } }/> }
        { personData.name.last  &&    <p>Name  {personData.name.last} 
        { personData.email  &&  <p>Email:{personData.email}</p> }</p> }
        { personData.name.first &&     <p>Vorname{personData.name.first} </p>}
        { personData.registered.age  &&  <p>Alter{personData.registered.age}</p> }
<hr></hr>

    <Button variant="outline-secondary" onClick={ (e) => goback(e)}> Before</Button>
    <Button variant="outline-secondary" onClick={ (e) => forward(e)} > Next </Button>

    </div>
  </Fragment>
 );
}