const Footer = () => {
  return (
    <footer>
      <div className="footerUp">
        <div className="solFooter">
          <div className="footerBrand">
            <img
              src="/assets/iteration-2/footer/logo-footer.svg"
              alt="Teknolojik Yemekler footer logo"
            />

            <ul className="footerContact">
              <li>
                <img
                  src="/assets/iteration-2/footer/icons/icon-1.png"
                  alt="Adres ikonu"
                />
                <span>
                  341 Londonderry Road,<br />
                  İstanbul Türkiye
                </span>
              </li>

              <li>
                <img
                  src="/assets/iteration-2/footer/icons/icon-2.png"
                  alt="E-posta ikonu"
                />
                <span>aciktim@teknolojikyemekler.com</span>
              </li>

              <li>
                <img
                  src="/assets/iteration-2/footer/icons/icon-3.png"
                  alt="Telefon ikonu"
                />
                <span>+90 216 123 45 67</span>
              </li>
            </ul>
          </div>

          <div className="footerMenu">
            <h3>Hot Menu</h3>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
        </div>

        <div className="sagFooter">
          <h3>Instagram</h3>

          <div className="igGrid">
            <img src="/assets/iteration-2/footer/insta/li-0.png" alt="Instagram 1" />
            <img src="/assets/iteration-2/footer/insta/li-1.png" alt="Instagram 2" />
            <img src="/assets/iteration-2/footer/insta/li-2.png" alt="Instagram 3" />
            <img src="/assets/iteration-2/footer/insta/li-3.png" alt="Instagram 4" />
            <img src="/assets/iteration-2/footer/insta/li-4.png" alt="Instagram 5" />
            <img src="/assets/iteration-2/footer/insta/li-5.png" alt="Instagram 6" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
        <a className="social" href="#">
          <img src="/Vector.png" alt="Sosyal ikon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

 
 
 
 