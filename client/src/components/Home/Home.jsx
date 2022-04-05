import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, orderByTitle, orderByScore} from "../../actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Paginado/Paginado";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import style from "./home.module.css"
import { Link } from "react-router-dom";


export default function Home (){
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const totalRecipes = useSelector((state)=>state.recipes) //cumple la misma funcion q mapStateToProps
    //console.log("SOYTOATLRECIPES", totalRecipes)
    
    //creo un estado local para el ordenamiento
    const [orderTitle, setOrderTitle] = useState('')
    const [orderScore, setOrderScore] = useState('')
   
    
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1); 
    //const [recipesPerPage] = useState(9)
    const recipesPerPage= 9
    
    
    
    const indexOfLastItem = currentPage * recipesPerPage;//9-18
    const indexOfFirstItem = indexOfLastItem - recipesPerPage;//0-9 

    const currentRecipes = totalRecipes.slice(indexOfFirstItem, indexOfLastItem);

    /* const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
 */

    function handleClick(e){
        setCurrentPage(Number(e.target.id));
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
    
    function handleOrderByTitle(e){
        e.preventDefault();
        dispatch(orderByTitle(e.target.value));
        setCurrentPage(1)
        setOrderTitle(`ordenado ${e.target.value}`)
    }
    
    function handleOrderByScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1)
        setOrderScore(`ordenado ${e.target.value}`)
    }
    
    
    return(
        <div className={style.container}>
            <div>
                <SearchBar/>
            </div>
            <div>
                <NavBar
                handleOrderByTitle={handleOrderByTitle}
                handleOrderByScore={handleOrderByScore}
                handleRefresh={handleRefresh}
                />
            </div>
            
            {loading === true ? (
                <Loading setLoading={setLoading}/>
            ): 
            <div className={style.containerCard}>
                {
                    currentRecipes && currentRecipes.map((rec)=>(
                        <Link className={style.cardLink} key={rec.id} to={`/recipes/${rec.id}`} > 
                            <Card 
                                key={rec.id} 
                                id={rec.id} 
                                title={rec.title} 
                                image={rec.image} 
                                diets={rec.diets.map(el => el.name? el.name :el )} 
                                score={rec.score} 
                                helthyScore={rec.helthyScore}
                            />
                        </Link>      
                    ))
                }
            </div> 
            }
            
            <div className={style.paginado}>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={totalRecipes.length}
                    handleClick={handleClick}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                   /*  paginado={paginado} */
                />
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
    )
}