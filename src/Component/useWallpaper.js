import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wallpaper(city) {
    const pixabayKey = process.env.REACT_APP_PIXABAY_KEY

    const [image,setimage] = useState('')

    useEffect(()=>{
        if(!city)return;
        const fetchDataWallpaper = async () =>{
            try{
                const fetchImage = await axios.get('https://pixabay.com/api/',{
                    params : {
                        key : pixabayKey,
                        q:`${city} city`,
                        image_type : "photo",
                        orientation: "horizontal",
                        category: "buildings",
                        per_page: 5
                    },
                })

                const ImageUrl = fetchImage.data.hits
                if(ImageUrl.length > 0){
                    setimage(ImageUrl[0].largeImageURL)
                }else{
                    setimage('')
                }
            }catch(err){
                console.error('error fetching wallpaper :',err)
            }
        }
        fetchDataWallpaper()
    },[city])
    return image;
}

export default Wallpaper;