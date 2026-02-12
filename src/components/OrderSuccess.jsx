export default function OrderSuccess({ order, onBackHome }) {
  const showDebug = false;

  return (
    <div className="success-page">
      <h1 className="success-logo">Teknolojik Yemekler</h1>

      <div className="success-center">
        <h2 className="success-title">TEBRİKLER!</h2>
        <h2 className="success-subtitle">SİPARİŞİNİZ ALINDI!</h2>

        {showDebug && order && (
          <pre className="success-debug">{JSON.stringify(order, null, 2)}</pre>
        )}

        <button type="button" className="success-btn" onClick={onBackHome}>
          ANASAYFAYA DÖN
        </button>
      </div>
    </div>
  );
}
