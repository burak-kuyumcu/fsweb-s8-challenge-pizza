const Header = () =>{
return(
    <header>
      <section className="aciklama">
        <div className="aciklama-logo">
           <img src="public/assets/iteration-1/logo.svg" alt="">
        </div>
       <img src="public/assets/iteration-1/home-banner.png" alt="">
       <div className="aciklama-content">
         <p>fırsatı kaçırma</p>
         <h1>KOD ACIKTIRIR<br>PIZZA, DOYURUR</h1>
         <button>ACIKTIM</button>
       </div>
      </section>
     
      <nav>
        <ul>
          <li>
            <img src="public/assets/iteration-2/icons/1.svg" alt=""> YENİ! Kore</li>
          <li>
            <img src="public/assets/iteration-2/icons/2.svg" alt=""> Pizza</li>
          <li>
            <img src="public/assets/iteration-2/icons/3.svg" alt=""> Burger</li>
          <li>
            <img src="public/assets/iteration-2/icons/4.svg" alt=""> Kızartmalar</li>
          <li>
            <img src="public/assets/iteration-2/icons/5.svg" alt="">Fast food</li>
          <li>
            <img src="public/assets/iteration-2/icons/6.svg" alt="">Gazlı İçecek</li>
        </ul>
      </nav>
    </header>
)
}
export default Header;