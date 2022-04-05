import React from 'react'
import style from './loading.module.css'
import loader from './img/143.gif'

export default function Loading({setLoading}) {
  return (
    <div>
        <img src={loader} alt="loading" className={style.loading}/>
        <div className={style.setloading}>
          {
            setTimeout(() => {
              setLoading(false);
            }, 3000)
          }
        </div>
    </div>
  )
}

