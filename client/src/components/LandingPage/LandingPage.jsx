import { Link } from "react-router-dom";
import github from './img/github.png';
import style  from './LandingPage.module.css';



export default function LandingPage (){

    return(
        <div className={style.landing}>
            <div className={style.container}>
                <nav className={style.body}>
                    {/*  <p className={style.title}>Welcome to Hen-Recipes</p>  */}
                    <Link to={'/recipes'}>
                        <button className={style.button}>Explore Recipes...</button>
                    </Link>
                </nav>
            </div>
            <footer className={style.footer}>
                <p>@Hen-Recipes, All rigths Reserved</p>
                    <Link to={'https://github.com/YaniAnaGarcia/PI-Food'}>
                        <img src={github} alt="githublogo" width={'20px'}/>
                    </Link>
            </footer>
        </div>
    )
}