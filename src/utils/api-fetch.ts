import axios, { AxiosInstance } from 'axios' ;

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

export const geAPIData =  async (url :string ) => {
    try {
        client = ApiClient(url) ;
        return  client 
        } catch (error: any) {
            console.log("error")
        }
}