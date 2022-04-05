import React from 'react';
import style from './footer.module.css';
import { BsGithub } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaTwitterSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className={style.footer}>
        <p> <span>@The Kitchen of Henry,</span> All rigths Reserved.</p>
        <div>
          <a href="https://github.com/YaniAnaGarcia">
              <BsGithub className={style.icons}/>
          </a>
          <a href="https://www.linkedin.com/in/yaninagarcia-fullstackdeveloper/">
              <AiFillLinkedin className={style.icons}/>
          </a>
          <a href="https://twitter.com/YaninaAnaG?t=ceSkCLhhzEmX7n6dCtSItg&s=08">
              <FaTwitterSquare className={style.icons}/>
         </a>
        </div>
        
    </div>
  )
}
