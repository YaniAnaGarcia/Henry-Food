import {
    GET_ALL_RECIPES,
    GET_ALL_DIETS,
    SEARCH_BY_TITLE,
    FILTER_BY_DIET,
    ORDER_BY_TITLE,
    ORDER_BY_SCORE,
    GET_RECIPE_DETAIL,
    POST_RECIPES
} from '../actions/index'

//ceo un estado inicial
const initialState = {
    recipes: [], //todas las recetas que se van ir filtrando/ordenando etc
    copyRecipes: [],//aca guardo siempre la totalidad de las recetas en el estado
    diets: [], //
    detail: [],
}

function rootReducer(state= initialState, action){
    if(action.type === GET_ALL_RECIPES){
        return{
            ...state, //guardo una copia del estado
            recipes: action.payload,//aca guardo en mi estado recipes. todo lo q recibo del payload del action creado
            copyRecipes: action.payload
        }
    }
    if(action.type === SEARCH_BY_TITLE){
        return{
            ...state,
            recipes: action.payload
        }
    }
    if( action.type === GET_ALL_DIETS){
        return{
            ...state,
            diets: action.payload,
        }
    }
    if(action.type === FILTER_BY_DIET){
        return{
            ...state,
            recipes: state.copyRecipes.filter(recipe => recipe.diets.includes(action.payload))
        }
    }
    if(action.type === ORDER_BY_TITLE){
        const orderT = state.recipes.length > 0 ? state.recipes : state.copyRecipes;
        if(action.payload === "A-Z") orderT.sort((a,b)=> a.title.localeCompare(b.title));
        else if(action.payload === "Z-A") orderT.sort((a,b)=> b.title.localeCompare(a.title));
        return{
            ...state
        }
    }
    if(action.type === ORDER_BY_SCORE){
        const orderScore = action.payload === "asc" ? state.copyRecipes.sort((a,b)=>{
            if(a.score > b.score){
                return 1
            }
            if(b.score > a.score){
                return -1
            }
            return 0
        }) :
        state.copyRecipes.sort((a,b)=>{
            if(a.score > b.score){
                return -1
            }
            if(b.score > a.score){
                return 1
            }
            return 0
        })
        return {
            ...state,
            recipe:  orderScore
        }
    }
    if(action.type === GET_RECIPE_DETAIL){
        return {
            ...state,
            detail: action.payload
        }
    }
    if(action.type === POST_RECIPES){
        return {
            ...state
        }
    }
    return state;
    
}

export default rootReducer;