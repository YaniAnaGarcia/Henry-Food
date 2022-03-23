import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, createRecipe} from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import style from './recipe.module.css'


/*********************** */
export default function Recipe(){

    const dispatch= useDispatch();
    
    const allDiets = useSelector((state)=> state.diets);
    
    const [errors, setErrors]= useState({})

     /***************   validaciones  **********************/
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

 /***************  fin validaciones  **********************/

//console.log("errorvalidate", errors)

    
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
    function handleChange(e){ 
        setInput({ 
            ...input, 
            [e.target.name] : e.target.value 
        });
        setErrors(validates({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    function handleSelect(e){
        if(input.diets.includes(e.target.value)){
            alert("la receta ya fue seleccionada")
        }else{
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
            });
            setErrors(validates({
                ...input,
                diets:[...input.diets, e.target.value]
            }))
        }
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
    //console.log("AA", allDiets)

    return(
        <div>
            <div className={style.serch} > 
               <SearchBar/>
            </div>
            <div className={style.container}>

                <form onSubmit={handleSubmit} className={style.form}>
                    {/* titulo */}
                    <div className={style.grupo_Title}>
                        <div className={style.grupo}>
                            <input className={style.input} type="text" name="title" required placeholder="Title..." value={input.title} onChange={handleChange}/>
                        </div >
                        {errors.title && (<span className={style.error}>{errors.title}</span>)}
                    </div>
                    {/* image */}
                    <div className={style.grupo_image}>
                        <div className={style.grupo}>
                            <input className={style.input} type="text" name="image" placeholder="URL image..." value={input.image} onChange={handleChange}/>
                        </div>
                    </div>
                    {/* s ore */}
                    <div className={style.grupo_score}>
                        <div className={style.grupo}>
                            <input 
                            className={style.input}
                                type="number" 
                                name="spoonacularScore"
                                placeholder="Score..."
                                value={input.spoonacularScore} 
                                onChange={handleChange} />
                        </div>
                        {errors.spoonacularScore && (<span className={style.error}>{errors.spoonacularScore}</span>)}
                    </div>
                    {/* healthScore */}
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
                    {/* summary */}
                    <div className={style.grupo_summary}>
                        <div className={style.grupo}>
                            <textarea className={style.textarea} name="summary" cols="50" rows="3" value={input.summary} onChange={handleChange} placeholder="Summary..." />
                        </div>
                        {errors.summary && (<span className={style.error}>{errors.summary}</span>)}
                    </div>
                    {/* instructions */}
                    <div className={style.grupo_instruction}>
                        <div className={style.grupo}>
                            <textarea name="instructions" cols="50" rows="5" value={input.instructions} onChange={handleChange} placeholder="Intructions..."/>
                        </div>
                        {errors.instructions && (<span className={style.error}>{errors.instructions}</span>)}
                    </div>
                    {/* diets */}
                    <div >
                        <select className={style.select} onChange={handleSelect} >
                            <option >types of diets...</option>
                            {
                                allDiets.map((diet)=>(
                                    <option key={diet.id} value={input.diets.name} >{diet.name}</option>
                                ))
                            }
                        </select>
                        {errors.diets && (<span className={style.error}>{errors.diets}</span>)}
                    </div>
                    {/*boton  */}
                    <div className={style.containerButton}>
                    {
                            Object.keys(errors).length !== 0 ? 
                            <p className={style.button}  onClick={(e)=> alert("Please complete all form")} >Create Recipe</p> :
                            <button className={style.button} type="submit" >Create Recipe</button>
                        }
                    </div>

                    <div>
                    <ul>
                            {
                                
                                input.diets.map((e)=>(
                                    <li key={e}>
                                        {e}
                                        <button  type="" onClick={()=>{handleDelete(e)}} >X</button>
                                    </li>
                                ))
                            }
                        </ul> 
                    </div>
                </form>
            </div>
        </div>
    )
}