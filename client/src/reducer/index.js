import {
    GET_ALL_RECIPES,
    GET_ALL_DIETS,
    SEARCH_BY_TITLE,
    FILTER_BY_DIET,
    ORDER_BY_TITLE,
    ORDER_BY_SCORE,
    GET_RECIPE_DETAIL,
    POST_RECIPES,
    DELETE_DETAIL
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
            ...state, 
            recipes: action.payload,
            copyRecipes: action.payload
        }
    }
    if(action.type === SEARCH_BY_TITLE){
        const error = "error"
        return{
            ...state,
            recipes: action.payload ? action.payload : error
        }
    }
    if( action.type === GET_ALL_DIETS){
        return{
            ...state,
            diets: action.payload,
        }
    }
    if(action.type === FILTER_BY_DIET){
        const recipesAll = state.copyRecipes;
        const recipesFiltered = action.payload === "all" 
        ? recipesAll
        : recipesAll.filter((recipe) => recipe.diets.includes(action.payload))
        return{
            ...state,
            recipes: recipesFiltered
        }
    }
   
    if(action.type === ORDER_BY_TITLE){
        const orderTitle = action.payload === "A-Z" ?
        state.recipes.sort(function(a,b){
            if(a.title === b.title){
                return 0;
            }
            if(a.title < b.title){
            return -1
            }
            return 1
        }):
        state.recipes.sort(function(a,b){
            if(a.title === b.title){
                return 0;
            }
            if(a.title > b.title){
                return -1
            }
            return 1
        })
        return{
            ...state,
            recipes: orderTitle
        }
    }
    if(action.type === ORDER_BY_SCORE){
        const orderScore = action.payload === "asc" ? 
            state.recipes.sort(function(a,b){
            if(a.score > b.score){
                return 1
            }
            if(b.score > a.score){
                return -1
            }
            return 0
        }) :
        state.recipes.sort(function(a,b){
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
            recipes:  orderScore
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
    if(action.type === DELETE_DETAIL){
        return {
            ...state,
            detail: []
        }
    }
    
    return state;
    
}

export default rootReducer;