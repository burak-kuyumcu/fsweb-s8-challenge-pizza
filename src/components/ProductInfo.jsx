
const banner = "/assets/iteration-2/pictures/form-banner.png";

export default function ProductInfo() {
  return (
    <section className="productHero">
      <div className="productHero__pizza">
        <img src={banner} alt="Pizza" />
      </div>

      <div className="productHero__inner">
        <p className="crumb">
          Anasayfa - Seçenekler - <span>Sipariş Oluştur</span>
        </p>

        <h2 className="productTitle">Position Absolute Acı Pizza</h2>

        <div className="productMeta">
          <span className="price">85.50₺</span>
          <span className="muted">4.9</span>
          <span className="muted">(200)</span>
        </div>

        <p className="productDesc">
          Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
          Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
          geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
          yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
          yemektir...
        </p>
      </div>
    </section>
  );
}
