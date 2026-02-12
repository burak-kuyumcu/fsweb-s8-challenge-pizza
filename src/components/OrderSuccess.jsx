export default function OrderSuccess({ order, onBackHome }) {
  return (
    <div className="success-page">
      <h1>Teknolojik Yemekler</h1>

      <h2 className="success-title">TEBRİKLER!</h2>
      <h2 className="success-subtitle">SİPARİŞİNİZ ALINDI!</h2>

      {order && (
        <pre className="success-debug">
          {JSON.stringify(order, null, 2)}
        </pre>
      )}

      <button type="button" className="submit-btn" onClick={onBackHome}>
        ANASAYFAYA DÖN
      </button>
    </div>
  );
}
