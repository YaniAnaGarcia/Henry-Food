import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, deletDetail} from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import foto from './img/photo-1540660290370-8aa90e451e8a.avif'
import style from './detail.module.css'

export default function Detail(props){ //detail 
    //console.log("props", props)

    const dispatch = useDispatch();
    const {id}= useParams()
    //console.log("ID", id)
    const recipes = useSelector((state)=> state.detail)
    

    useEffect(()=>{
        dispatch(getDetail(id))  //props.match.id
        return function(){         //para q borre el estado el detail anterior 
            dispatch(deletDetail())
        }
    }, [dispatch, id])
    

    //console.log("SOY RECIP ID", recipes)

    return(
        <div>
            <div className={style.serch} > {/* encabezado */}
               <SearchBar/>
            </div>
            {   
                Object.keys(recipes).length > 0 ?
                (<div className={style.details}>
                    <div className={style.head}>{/* imagen */}
                        <img src={recipes.image ? recipes.image : foto} alt={recipes.title} />
                    </div>
                    <div> 
                        <div className={style.text}>
                            <h2 className={style.title}>{recipes.title}</h2>
                            <div className={recipes.data}>
                                <div className={style.scores}>
                                    <h4>Score: <span>{recipes.spoonacularScore}</span></h4>
                                    <h4>Healthy-Score: <span>{recipes.healthScore}</span></h4>
                                </div>
                                <h4>Diets: <span>{recipes.diets?.join(', ')}</span> </h4>
                               
                                <h4>Summary:<span>{recipes.summary && recipes.summary.replace(/<[^>]+>/g, '')}</span></h4>
                            </div>
                        </div> 
                        <div className={style.steps}>
                            <h3>Instructions</h3>
                            <p>{recipes.instructions ? recipes.instructions.replace(/<[^>]+>/g, ''): "This recipe does not have any intructions"}</p>
                        </div>   
                    </div> 
                </div>) : <p>LOADING</p>
                
                
            }
        </div>
        
    )
}