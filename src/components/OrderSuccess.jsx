export default function OrderSuccess({ order, onBackHome }) {
  const payload = order?.payload || {};
  const response = order?.response || {};

  const boyut = payload.boyut || "-";
  const hamur = payload.hamur || "-";
  const malzemeler = Array.isArray(payload.malzemeler) ? payload.malzemeler : [];

  const secimlerFiyati =
    typeof payload.secimlerFiyati === "number" ? payload.secimlerFiyati : 0;

  const toplam =
    typeof payload.toplam === "number" ? payload.toplam : 0;

  return (
    <div className="success-page">
      <h1 className="success-logo">Teknolojik Yemekler</h1>

      <p
        style={{
          marginTop: 40,
          marginBottom: 6,
          fontFamily: "Satisfy, cursive",
          color: "#FDC913",
          fontSize: 20,
        }}
      >
        lezzetin yolda
      </p>

      <h2 className="success-title">SİPARİŞ ALINDI</h2>

      <div style={{ width: "min(820px, 92%)", marginTop: 26 }}>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.35)",
            margin: "0 auto 22px",
          }}
        />

        <h3 style={{ textAlign: "center", margin: "0 0 22px" }}>
          Position Absolute Acı Pizza
        </h3>

        <div
          style={{
            textAlign: "center",
            lineHeight: 1.9,
            fontSize: 14,
            opacity: 0.95,
          }}
        >
          <div>
            Boyut: <b>{boyut}</b>
          </div>
          <div>
            Hamur: <b>{hamur}</b>
          </div>
          <div style={{ marginTop: 8 }}>
            Ek Malzemeler:{" "}
            <b>
              {malzemeler.length ? malzemeler.join(", ") : "-"}
            </b>
          </div>
          {response?.id && (
            <div style={{ marginTop: 10, opacity: 0.9 }}>
              Sipariş No: <b>{response.id}</b>
            </div>
          )}
        </div>

        <div
          style={{
            margin: "28px auto 0",
            width: "min(360px, 92%)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 10,
            padding: 18,
            background: "rgba(0,0,0,0.12)",
          }}
        >
          <h4 style={{ margin: "0 0 14px", textAlign: "center" }}>
            Sipariş Toplamı
          </h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            <span>Seçimler</span>
            <span>{secimlerFiyati.toFixed(2)}₺</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <span>Toplam</span>
            <span>{toplam.toFixed(2)}₺</span>
          </div>
        </div>

        <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
          <button type="button" className="success-btn" onClick={onBackHome}>
            ANASAYFAYA DÖN
          </button>
        </div>
      </div>
    </div>
  );
}
