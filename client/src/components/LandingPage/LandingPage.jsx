import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import style  from './LandingPage.module.css';



export default function LandingPage (){

    return(
        <div className={style.landing}>
            <div className={style.container}>
                <nav className={style.body}>
                    <Link to={'/recipes'}>
                        <button className={style.button}>Explore Recipes...</button>
                    </Link>
                </nav>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}