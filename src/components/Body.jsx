const Body = () =>{
return(
 <main class="container">
      <section class="resSec">

        <div class="resSecLeft">

          <img src="public/assets/iteration-2/cta/kart-1.png" alt="">

          <div class="resSecLeft-content">
            <h2>Özel<br>Lezzetus</h2>
            <h3>Position:Absolute Acı Burger</h3>
            <button>Siparis Ver</button>
          </div>

        </div>

        <section class="resSecRight">
          <div class="resSecRight-first">
            <img src="public/assets/iteration-2/cta/kart-2.png" alt="">

             <div class="resSecRight-content1">
            <h2>Hackathlon</h2>
            <h3>Burger Menü</h3>
            <button>Siparis Ver</button>
          </div>
          </div>

           <div class="resSecRight-second">
            <img src="public/assets/iteration-2/cta/kart-3.png" alt="">
             <div class="resSecRight-content2">
            <h2><span class="red">Çooooook</span> hızlı</h2>
            <h3>npm gibi kurye</h3>
            <button>Siparis Ver</button>
          </div>
            
          </div>

        </section>
      </section>
      <div class="main-content">
        <h3>en çok paketlenen menüler</h3>
        <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>
      </div>
    </main>

    <section class="secenekler">
      <nav>
        <a href=""> <img src="public/assets/iteration-2/icons/1.svg" alt="">Ramen</a>
        <a class="active" href=""><img src="public/assets/iteration-2/icons/2.svg" alt="">Pizza</a>
        <a href=""><img src="public/assets/iteration-2/icons/3.svg" alt="">Burger</a>
        <a href=""><img src="public/assets/iteration-2/icons/4.svg" alt="">French Fries</a>
        <a href=""><img src="public/assets/iteration-2/icons/5.svg" alt="">Fast Food</a>
        <a href=""><img src="public/assets/iteration-2/icons/6.svg" alt="">Soft Drinks</a>
    </nav></section>
    
    <section class="urunler">

       <div class="urun1">
        <div class="urun1-content">
          <img src="public/assets/iteration-2/pictures/food-1.png" alt="">
          <div class="urun1-content-details">

            <h4>Terminal Pizza</h4>

            <div class="urun1-content-details-numbers">
              <p>4.9</p>
              <p>(200)</p>
              <p>60</p>
            </div>
          </div>
        </div>
      </div>

       <div class="urun2">
        <div class="urun2-content">
          <img src="public/assets/iteration-2/pictures/food-2.png" alt="">
          <div class="urun2-content-details">

            <h4>Position Absolute Acı Pizza</h4>

            <div class="urun2-content-details-numbers">
              <p>4.9</p>
              <p>(200)</p>
              <p>60</p>
            </div>
          </div>
        </div>
      </div>

      <div class="urun3">
        <div class="urun3-content">
          <img src="public/assets/iteration-2/pictures/food-3.png" alt="">
          <div class="urun3-content-details">

            <h4>useEffect Tavuklu Burger</h4>

            <div class="urun3-content-details-numbers">
              <p>4.9</p>
              <p>(200)</p>
              <p>60</p>
            </div>
          </div>
        </div>
      </div>
    </section>
)
}
export default Body;