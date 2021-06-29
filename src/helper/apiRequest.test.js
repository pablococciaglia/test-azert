import { apiRequest } from './apiRequest';

describe ('pruebas en apiRequest', () =>{

    it('debe traer 10 elementos', async() => {
        const data = await apiRequest('react')
        
        expect(data.items.length) .toBe(10); 
    })

})