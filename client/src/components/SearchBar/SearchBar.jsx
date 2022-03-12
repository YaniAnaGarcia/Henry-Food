import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from './searchBar.module.css';
import { Link } from "react-router-dom";
import { searchByTitle } from "../../actions";
import logo from './Img/Henry.png'

export default function SearchBar({handleRefresh}){
    const dispatch = useDispatch();

    const [title, setTitle] = useState(''); //creo un estado local
   // console.log(title)
    
    //una funcion q caputre lo q me ingresan x input
    function handleInput(e){
        e.preventDefault();
        setTitle(e.target.value);//guardo en mi estado local seteando el titulo con el titulo q ingresan en input
        
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchByTitle(title));
        
    }
  

    return(
        <div className={style.container}>
            <nav className={style.nav}>
                    <Link to={'/'} className={style.links} >
                        <img className={style.image} src={logo} alt="logo" />
                    </Link>
                    
                    <Link to={'/recipes'} className={style.links} onClick={(e)=>handleRefresh(e)} >Recipes</Link>

                    <Link to={'/create'} className={style.links}>Create your Recipe.</Link>
                
                <div className={style.contenedor_link}>
                    <form onSubmit={(e)=> handleSubmit(e)}>
                        <div>
                            <input 
                                className={style.input}
                                type="text"
                                name="title"
                                value={title}
                                placeholder= "Search Recipe" 
                                onChange={(e)=> handleInput(e)}
                                />
                            
                            <button className={style.button} type="submit" >Search</button> 
                            
                        </div>
                    </form>
                </div>
                
            </nav>
        </div>
    )
}