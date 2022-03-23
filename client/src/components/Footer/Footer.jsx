import React from 'react';
import style from './footer.module.css';
import github from './img/github.png';

export default function Footer() {
  return (
    <div className={style.footer}>
        <p> <span>@The Kitchen of Henry,</span> All rigths Reserved.</p>
         <a href="https://github.com/YaniAnaGarcia">
            <img src={github} alt="githublogo" width={'20px'}/>
         </a>
    </div>
  )
}
