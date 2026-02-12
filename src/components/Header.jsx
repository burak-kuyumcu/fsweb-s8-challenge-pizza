const Header = ({ onStartOrder }) => {
  return (
    <header>
      <section className="aciklama">
        <div className="aciklama-logo">
          <img src="/assets/iteration-1/logo.svg" alt="Teknolojik Yemekler Logo" />
        </div>

        <img src="/assets/iteration-1/home-banner.png" alt="Ana sayfa banner" />

        <div className="aciklama-content">
          <p>Fırsatı kaçırma</p>
          <h1>
            KOD ACIKTIRIR<br />
            PIZZA, DOYURUR
          </h1>
           <button type="button" onClick={onStartOrder}>
        ACIKTIM
      </button>
        </div>
      </section>

      <nav>
        <ul>
          <li>
            <img src="/assets/iteration-2/icons/1.svg" alt="Kore" /> YENİ! Kore
          </li>
          <li>
            <img src="/assets/iteration-2/icons/2.svg" alt="Pizza" /> Pizza
          </li>
          <li>
            <img src="/assets/iteration-2/icons/3.svg" alt="Burger" /> Burger
          </li>
          <li>
            <img src="/assets/iteration-2/icons/4.svg" alt="Kızartmalar" /> Kızartmalar
          </li>
          <li>
            <img src="/assets/iteration-2/icons/5.svg" alt="Fast food" /> Fast food
          </li>
          <li>
            <img src="/assets/iteration-2/icons/6.svg" alt="Gazlı içecek" /> Gazlı İçecek
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
