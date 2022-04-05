import React, { useState } from 'react';
import style from './Paginado.module.css'

export default function Paginado({recipesPerPage, totalRecipes, handleClick, currentPage, setCurrentPage}){
    
     //litmite de paginas que quiero mostrar
     const pageNumberLimit= 5; //total de paginas que quiero renderizar
     const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(3);
     const [minPageNumberLimit, setminPageNumberLimit]= useState(0);

    const pages = [] //
    
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {//cantidad de paginas q voy a necesitar
        pages.push(i)
    }

    const renderPageNumbers= pages.map((number)=>{
        
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit){
            return(
                <li 
                key={number} 
                id={number} 
                onClick={handleClick}
                className={currentPage === number? "active" : null} >
                    {number}
                </li>
            )
        }else{
            return null;
        }
    }) 
   
    //HANDLE PARA EL BTN NEXT
    const handleNextbtn=()=>{
        setCurrentPage(currentPage +1);
 
        if(currentPage+1> maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        } 
    }
//HANDLE PARA BOTON PREV
    const handlePrevbtn=()=>{
        setCurrentPage(currentPage -1);
 
        if((currentPage -1)%pageNumberLimit === 0){
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        } 
    }

    //para indicar que hay algo mas antes y despues de las paginas q estoy renderizando
    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextbtn} > &hellip; </li>
    }

    let pageDecrementBtn = null;
    if(minPageNumberLimit >=1){
        pageDecrementBtn = <li onClick={handlePrevbtn} > &hellip; </li>
    }

  return (
    <>
    
        <ul className={style.pageNumbers}>
            <li>
                <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
                >
                    Prev
                </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button
                onClick={handleNextbtn}
                disabled={currentPage === pages[pages.length -1] ? true : false}
                >
                    Next
                </button>
            </li>

        </ul>
        
    </>
  )
}