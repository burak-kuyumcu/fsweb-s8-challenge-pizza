export default function ProductInfo() {
  return (
    <section className="product">
      <h2 className="product__title">Position Absolute Acı Pizza</h2>

      <div className="product__meta">
        <div className="product__price">85.50₺</div>
        <div className="product__rating">
          <span>4.9</span>
          <span className="product__count">(200)</span>
        </div>
      </div>

      <p className="product__desc">
        Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
        Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
        geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
        yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli
        bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
      </p>
    </section>
  );
}
