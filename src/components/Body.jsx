const Body = () => {
  return (
    <>
      <main className="container">
        <section className="resSec">
          <div className="resSecLeft">
            <img src="/assets/iteration-2/cta/kart-1.png" alt="Kart 1" />

            <div className="resSecLeft-content">
              <h2>
                Özel<br />
                Lezzetus
              </h2>
              <h3>Position:Absolute Acı Burger</h3>
              <button>Sipariş Ver</button>
            </div>
          </div>

          <section className="resSecRight">
            <div className="resSecRight-first">
              <img src="/assets/iteration-2/cta/kart-2.png" alt="Kart 2" />

              <div className="resSecRight-content1">
                <h2>Hackathlon</h2>
                <h3>Burger Menü</h3>
                <button>Sipariş Ver</button>
              </div>
            </div>

            <div className="resSecRight-second">
              <img src="/assets/iteration-2/cta/kart-3.png" alt="Kart 3" />

              <div className="resSecRight-content2">
                <h2>
                  <span className="red">Çooooook</span> hızlı
                </h2>
                <h3>npm gibi kurye</h3>
                <button>Sipariş Ver</button>
              </div>
            </div>
          </section>
        </section>

        <div className="main-content">
          <h3>en çok paketlenen menüler</h3>
          <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>
        </div>
      </main>

      <section className="secenekler">
        <nav>
          <a href="">
            <img src="/assets/iteration-2/icons/1.svg" alt="Ramen" />
            Ramen
          </a>

          <a className="active" href="">
            <img src="/assets/iteration-2/icons/2.svg" alt="Pizza" />
            Pizza
          </a>

          <a href="">
            <img src="/assets/iteration-2/icons/3.svg" alt="Burger" />
            Burger
          </a>

          <a href="">
            <img src="/assets/iteration-2/icons/4.svg" alt="French Fries" />
            French Fries
          </a>

          <a href="">
            <img src="/assets/iteration-2/icons/5.svg" alt="Fast Food" />
            Fast Food
          </a>

          <a href="">
            <img src="/assets/iteration-2/icons/6.svg" alt="Soft Drinks" />
            Soft Drinks
          </a>
        </nav>
      </section>

      <section className="urunler">
        <div className="urun1">
          <div className="urun1-content">
            <img src="/assets/iteration-2/pictures/food-1.png" alt="Terminal Pizza" />
            <div className="urun1-content-details">
              <h4>Terminal Pizza</h4>
              <div className="urun1-content-details-numbers">
                <p>4.9</p>
                <p>(200)</p>
                <p>60</p>
              </div>
            </div>
          </div>
        </div>

        <div className="urun2">
          <div className="urun2-content">
            <img src="/assets/iteration-2/pictures/food-2.png" alt="Position Absolute Acı Pizza" />
            <div className="urun2-content-details">
              <h4>Position Absolute Acı Pizza</h4>
              <div className="urun2-content-details-numbers">
                <p>4.9</p>
                <p>(200)</p>
                <p>60</p>
              </div>
            </div>
          </div>
        </div>

        <div className="urun3">
          <div className="urun3-content">
            <img src="/assets/iteration-2/pictures/food-3.png" alt="useEffect Tavuklu Burger" />
            <div className="urun3-content-details">
              <h4>useEffect Tavuklu Burger</h4>
              <div className="urun3-content-details-numbers">
                <p>4.9</p>
                <p>(200)</p>
                <p>60</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;
