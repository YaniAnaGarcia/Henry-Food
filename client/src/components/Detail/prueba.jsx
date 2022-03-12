
    return(
        <div>
            <div className={style.serch} > {/* encabezado */}
               <SearchBar/>
               
            </div>
            {   
                Object.keys(recipes).length > 0 ?
                (<div className={style.details}>
                    <div className={style.head}>{/* imagen */}
                        <img src={recipes.image} alt={recipes.title} />
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
                                {
                                    recipes.dishTypes?.length && 
                                    <h4>Dish Types: <span>{recipes.dishTypes?.join(', ')}</span></h4>
                                }
                                <h4>Summary:<span>{recipes.summary}</span></h4>
                            </div>
                        </div> 
                        <div className={style.steps}>
                            <h3>Instructions</h3>
                            <p>{recipes.instructions}</p>
                        </div>   
                    </div> 
                </div>) : <p>LOADING</p>
                
                
            }
        </div>
        
    )