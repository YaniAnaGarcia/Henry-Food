import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, createRecipe } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import style from './recipe.module.css'


/*********************** */
export default function Recipe(){

    const dispatch= useDispatch();
    
    const allDiets = useSelector((state)=> state.diets);

    const [errors, setErrors]= useState({})

     //validaciones
function validates(input){
    let errors = {};

    if(!input.title){
        errors.title = "Title is required"
    }

    if(!input.summary){
        errors.summary = "Summary is required"
    }

    if(!input.spoonacularScore){
        errors.spoonacularScore = "Score is required"
    }else if(input.spoonacularScore > 100 || input.spoonacularScore < 1){
        errors.spoonacularScore = "The Score must be a number between 1 and 100"
    }

    if(!input.healthScore){
        errors.healthScore = "Health-Score is required"
    }else if(input.healthScore > 100 || input.healthScore < 1){
        errors.healthScore = "The Health-Score must be a number between 1 and 100"
    }

    if(!input.instructions){
        errors.instructions = " Instructions are required"
    }
    if(!input.diets.length === 0){
        errors.diets= "you must select one or  more types of diet"
    }
    return errors
    
}

console.log("errorvalidate", errors)

    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        instructions: "",
        image: "",
        diets: []
    })

    useEffect(()=>{
        dispatch(getAllDiets())
    }, [dispatch])

    //
    function handleChange(e){ //aca voy guardando los valores q tome a medida q se ejecute
        setInput({ 
            ...input, //guardar una copia de lo q ya hay en el estado
            [e.target.name] : e.target.value //segun el name de cada prop q cree (name:"title")--> toma el value del input y lo guarda
        });
        setErrors(validates({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        });
        setErrors(validates({
            ...input,
            diets:[...input.diets, e.target.value]
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createRecipe(input))
        alert("Your recipe was created successfully")
        setInput({
            title: "",
            summary: "",
            spoonacularScore: "",
            healthScore: "",
            instructions: "",
            image: "",
            diets: []
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter((diet)=> diet !== e)
        })
    }


    return(
        <div>
            <div className={style.serch} > 
               <SearchBar/>
            </div>
            <div className={style.container}>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.grupo_Title}>
                        <div className={style.grupo}>
                            <input className={style.input} type="text" name="title" placeholder="Title..." value={input.title} onChange={handleChange}/>

                        </div >
                        {errors.title && (<span className={style.error}>{errors.title}</span>)}
                    </div>
                    

                    <div className={style.grupo_image}>
                        <div className={style.grupo}>
                            <input className={style.input} type="text" name="image" placeholder="URL image..." value={input.image} onChange={handleChange}/>
                        </div>
                    </div>
                    
                    <div className={style.grupo_score}>
                        <div className={style.grupo}>
                            <input 
                            className={style.input}
                                type="number"
                                name="spoonacularScore"
                                placeholder="Score..."
                                /* max="100"
                                min="1" */
                                value={input.spoonacularScore} 
                                onChange={handleChange} />
                        </div>
                        {errors.spoonacularScore && (<span className={style.error}>{errors.spoonacularScore}</span>)}
                    </div>
                    
                    <div  className={style.grupo_health}>
                        <div className={style.grupo}>
                        <input
                            className={style.input}
                            type="number"
                            name="healthScore"
                            /* max="100"
                            min="1" */
                            placeholder="Health-Score..."
                            value={input.healthScore}
                            onChange={handleChange} />
                        </div>
                        {errors.healthScore && (<span className={style.error}>{errors.healthScore}</span>)}
                    </div>

                    <div className={style.grupo_summary}>
                        <div className={style.grupo}>
                            <textarea className={style.textarea} name="summary" cols="50" rows="3" value={input.summary} onChange={handleChange} placeholder="Summary..." />
                        </div>
                        {errors.summary && (<span className={style.error}>{errors.summary}</span>)}
                    </div>
                    
                    <div className={style.grupo_instruction}>
                        <div className={style.grupo}>
                            <textarea name="instructions" cols="50" rows="5" value={input.instructions} onChange={handleChange} placeholder="Intructions..."/>
                        </div>
                        {errors.instructions && (<span className={style.error}>{errors.instructions}</span>)}
                    </div>

                    <div >
                        <select className={style.select} onChange={handleSelect} >
                            <option >types of diets...</option>
                            {
                                allDiets.map((diet)=>(
                                    <option key={diet.id} value={input} >{diet.name}</option>
                                ))
                            }
                        </select>
                        {errors.diets && (<span className={style.error}>{errors.diets}</span>)}
                        <ul>
                            {
                                input.diets.map((e)=>(
                                    <li key={e}>
                                        {e}
                                        <button onClick={handleDelete} >X</button>
                                    </li>
                                ))
                            }
                        </ul>  
                    </div>
                    <div className={style.containerButton}>
                    {
                            Object.keys(errors).length !== 0 ? <a className={style.button}  onClick={(e)=> alert("Please complete all form")} >Create Recipe</a> : <button className={style.button} type="submit" /* onSubmit={handleSubmit} */ >Create Recipe</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}