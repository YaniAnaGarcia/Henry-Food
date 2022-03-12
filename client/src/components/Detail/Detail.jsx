import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import style from './detail.module.css'

export default function Detail(props){ //detail 
    //console.log("props", props)

    const dispatch = useDispatch();
    const {id}= useParams()
    //console.log("ID", id)
    const allRecipes = useSelector((state)=> state.detail)
    

    useEffect(()=>{
        dispatch(getDetail(id))  //props.match.id
    }, [dispatch, id])
    

    //console.log("recipes", allRecipes)

    return(
        <div>
            <div className={style.serch} > {/* encabezado */}
               <SearchBar/>
               
            </div>
            {   
                allRecipes.length > 0 ?
                <div className={style.details}>
                    <div className={style.head}>{/* imagen */}
                        <img src={allRecipes[0].image? allRecipes[0].image : 'https://images.unsplash.com/photo-1540660290370-8aa90e451e8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'} alt={allRecipes.title} />
                    </div>
                    <div> 
                        <div className={style.text}>
                            <h2 className={style.title}>{allRecipes[0].title}</h2>
                            <div className={style.data}>
                                <div className={style.scores}>
                                    <h4>Score: <span>{allRecipes[0].spoonacularScore}</span></h4>
                                    <h4>Healthy-Score: <span>{allRecipes[0].healthScore}</span></h4>
                                </div>
                                <h4>Diets: <span>{allRecipes[0].diets && allRecipes[0].diets.map(el=> el + ' , ')}</span> </h4>
                                <h4>Summary: <span className={style.summary}>{allRecipes[0].summary && allRecipes[0].summary.replace(/<[^>]+>/g, '')}</span></h4>
                            </div>
                        </div> 
                        <div className={style.steps}>
                            <h3>Instructions</h3>
                            <p>{allRecipes[0].instructions ? allRecipes[0].instructions.replace(/<[^>]+>/g, '') : "This recipe does not have any intructions" }</p>
                        </div>   
                    </div> 
                </div> : <p>LOADING</p>
            }
        </div>
        
    )
}