import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, filterByDiet} from "../../actions";
import { BiRefresh } from 'react-icons/bi';
import style from './navBar.module.css'


export default function NavBar({handleOrderByTitle, handleOrderByScore, handleRefresh}){
    const dispatch = useDispatch();

    const typeOfDiets = useSelector((state)=>state.diets);
   // console.log("DIETAS",typeOfDiets)

    useEffect(()=>{
        dispatch(getAllDiets());
    },[dispatch])
    //filtro
    function handleFilterByDiet(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
    }
    

    return(
        /* aca voy a hacer los filtrados */
        <div className={style.container} >
            <div className={style.container_refresh}>
                <p className={style.title}>Refresh</p>
                <div>
                    <button className={style.refresh} onClick={(e)=>handleRefresh(e)}>
                        <BiRefresh />
                    </button>
                </div>
                
            </div>
            <div> {/* filtrado por tipos de dietas */}
                <p className={style.title}>Select type of Diet</p>
                <div className={style.diets}>
                    <select className={style.select} onChange={(e)=> handleFilterByDiet(e)} >  
                        <option value="all">All Diets...</option>
                        {
                            typeOfDiets && typeOfDiets.map((diet)=>(
                                <option key={diet.id} value={diet.name}>{diet.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/*  ORDENAMIENTOS*/}
            <div className={style.order}>
                <p className={style.title}>Order By ...</p>
                    <div className={style.order_title}>{/* orden alfabetico */}
                        <select className={style.select}  name="orderTitle" onChange={(e)=> handleOrderByTitle(e)} >
                            <option value="All">Title</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                    <div className={style.order_score}>{/* orden x puntaje */}
                        <select className={style.select}  name="orderScore" onChange={(e)=> handleOrderByScore(e)}>
                            <option default>Score</option>
                            <option value="asc">Ascending order</option>
                            <option value="desc">Descending order</option>
                        </select>
                    </div>
            </div>
        </div>
    )
}