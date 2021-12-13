import axios, { AxiosInstance } from 'axios' ;
import { BASEURL } from './util-constants';

let client: AxiosInstance = null ;

const ApiClient =  (baseUrl : string): AxiosInstance => {
    
try {
    const client = axios.create({
        baseURL: baseUrl ,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json'}
        }) 
    return client 
    }
    catch( error : any)
{
    console.log(error) ;
    return null ;
}
}

export const getAPIClient =  (url :string ) :AxiosInstance => {
    try {
        url = BASEURL ;
        return   ApiClient(url) ; 
        } catch (error: any) {
            console.log("error")
        }
        return null ;
}