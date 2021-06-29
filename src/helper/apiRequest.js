
export const apiRequest = async ( searchText )=>{
/* Realiza el la query y la almacena en una constante URL y luego hace la peticion fetch */
    const queryString = 'q=framework ' + encodeURIComponent (`${ searchText } in:name`) + '&page=1&per_page=10&sort=stars&order=desc';

    const url = `https://api.github.com/search/repositories?${ queryString }`;
    
    const response = await fetch( url )

    const data = await response.json();

    return data

}
