import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, orderByTitle, orderByScore} from "../../actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import style from "./home.module.css"
import { Link } from "react-router-dom";


export default function Home (){
    const dispatch = useDispatch();//genero la constante dipatch paara poder usar el useDispatch y despachar las acciones

    const totalRecipes = useSelector((state)=>state.recipes) //cumple la misma funcion q mapStateToProps--> solo retorna la parte del estado q me interesa. en este caso todo lo q este en el estado de recipes
    //console.log("SOYTOATLRECIPES", totalRecipes)
    
    //creo un estado locla para el ordenamiento
    const [orderTitle, setOrderTitle] = useState('')
    const [orderScore, setOrderScore] = useState('')
    
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1); //creo un estado local para las paginas. su valor inicial se setea en 1 q seria la pagina a partir de la cual se arranca

    //creo un estado local para la cantidad de recetas x pagina- le paso la cantidad por parametro
    const [recipesPerPage] = useState(9)

    const lastRecipePag = currentPage * recipesPerPage;//guardo el numero del ultimo pais por pagina
    const firstRecipePag = lastRecipePag - recipesPerPage; // guardo la posicion de la er receta de la pagina

    const currentRecipes = totalRecipes.slice(firstRecipePag, lastRecipePag);//guardo las reectas de la pagina q se encuentras entre las posiciones indicadas

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    //monto el componente
    useEffect(()=>{
       dispatch(getAllRecipes())
    },[dispatch])

    //recargar todas las recetas
    function handleRefresh(e){
        e.preventDefault();
        dispatch(getAllRecipes());
    }
    
    //orden alfabetico
    function handleOrderByTitle(e){
        e.preventDefault();
        dispatch(orderByTitle(e.target.value));
        setOrderTitle(`ordenado ${e.target.value}`)
    }
    
    //order x puntaje
    function handleOrderByScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setOrderScore(`ordenado ${e.target.value}`)
    }
    
    return(
        <div className={style.container}>
            <div>
                <SearchBar
                handleRefresh={handleRefresh}
                />
            </div>
            <div>
                <NavBar
                handleOrderByTitle={handleOrderByTitle}
                handleOrderByScore={handleOrderByScore}
                />
            </div>

            <div className={style.containerCard}>
                {
                    currentRecipes && currentRecipes.map((rec)=>(
                        <Link key={rec.id} to={`/recipes/${rec.id}`} > 
                            <Card 
                                key={rec.id} 
                                id={rec.id} 
                                title={rec.title} 
                                image={rec.image} 
                                diets={rec.diets.map(el => el.name ? el.name : el)} 
                                score={rec.score} 
                            />
                        </Link>      
                    ))
                }
            </div>
            <div className={style.paginado}>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    totalRecipes={totalRecipes.length}
                    paginado={paginado}
                />
            </div>
            
        </div>
    )
}