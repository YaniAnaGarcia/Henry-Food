import React from "react";
import style from './Card.module.css'
import  logo from '../SearchBar/Img/Diseño sin título.png'
import { AiFillStar } from 'react-icons/ai';


export default function Card ({title, image, diets, score}){

    console.log("aca", title, diets)

    return(
        <div className={style.container}>
            <div className={style.item}>
                <img src={image? image : logo} alt={title} className={style.img} />   
                <p className={style.point}> <AiFillStar className={style.star}/> <span>{score}</span></p>

            <div className={style.infoContainer}>
                <div>
                    <h3 className={style.title}>"{title}."</h3> 
                </div>
                <div className={style.listContainer}>
                    <h4 className={style.listTitle}>Type of diet:
                        <ul>
                            {
                                 diets.map((e)=>(
                                    <li key={e}>{e}</li>
                                )) 
                            }
                        </ul>
                    </h4>
                    
                </div>
            </div>
            </div> 
        </div>
    )
}