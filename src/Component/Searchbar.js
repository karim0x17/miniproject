import React,{useState} from 'react';
function Searchbar({onSearch}) {
    const [city,setCity] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(city.trim()){
            onSearch(city);
            setCity('')
        }else{
            alert('enter city name first !')
        }
    }

    const handleOnchange = (e) =>{
        setCity(e.target.value)
    }
    
    return ( 
        <div>
            <form onSubmit={handleSubmit} className="form-group d-flex justify-content-center row">
              <input type="text"
                className="form-control col-8 col-md-8 " value={city} onChange={handleOnchange} placeholder="Enter the city ..."/>
                <button type="submit" className="btn btn-info col-3 col-md-2 ml-2">Search</button>
            </form>
        </div>

     );
}

export default Searchbar;