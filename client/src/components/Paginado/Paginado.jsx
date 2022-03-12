import React from 'react';
import style from './Paginado.module.css'

export default function Paginado({recipesPerPage, totalRecipes, paginado}){

    const pageNumber = [] //
    
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {//cantidad de paginas q voy a necesitar
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul className={style.paginado}>
                {
                    pageNumber && pageNumber.map(number => (
                        <li key={number} className={style.li}>
                            <button className={style.button} onClick={()=> paginado(number)} >{number}</button>
                        </li>
                            
                    ))
                }
            </ul>
        </nav>
    )
}