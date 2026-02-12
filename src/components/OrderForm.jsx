import { useMemo, useState } from "react";
import axios from "axios";

const MALZEMELER = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalepeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak",
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(" ", "-");

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    hamur: "",
    malzemeler: [],
    not: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [adet, setAdet] = useState(1); 

  const errors = useMemo(() => {
    const e = {};
    if (form.isim.trim().length < 3) e.isim = "İsim en az 3 karakter olmalı.";
    if (!form.boyut) e.boyut = "Boyut seçmelisin.";
    if (!form.hamur) e.hamur = "Hamur seçmelisin.";

    const count = form.malzemeler.length;
    if (count < 4) e.malzemeler = "En az 4 malzeme seçmelisin.";
    if (count > 10) e.malzemeler = "En fazla 10 malzeme seçebilirsin.";

    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleMalzeme = (malzeme) => {
    setForm((p) => {
      const checked = p.malzemeler.includes(malzeme);
      const next = checked
        ? p.malzemeler.filter((m) => m !== malzeme)
        : [...p.malzemeler, malzeme];
      return { ...p, malzemeler: next };
    });
  };

  const basePrice = 85.5;
  const ingredientPrice = 5;
  const selectionsTotal = form.malzemeler.length * ingredientPrice;
  const total = (basePrice + selectionsTotal) * adet;

  const buildPayload = () => ({
    isim: form.isim.trim(),
    boyut: form.boyut,
    hamur: form.hamur,
    malzemeler: form.malzemeler,
    ozel: form.not,
    adet,
  });

  const buildFakeResponse = () => ({
    id: (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
    createdAt: new Date().toISOString(),
  });

  const resetForm = () => {
    setForm({
      isim: "",
      boyut: "",
      hamur: "",
      malzemeler: [],
      not: "",
    });
    setAdet(1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    const payload = buildPayload();

    try {
      const res = await axios.post("https://reqres.in/api/pizza", payload, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
      });

      console.log("API Yanıtı:", res.data);
      console.log("Sipariş Özeti:", { ...payload, ...res.data });

      onSuccess?.({ payload, response: res.data, mocked: false });
      resetForm();
    } catch (err) {
      console.error("Sipariş gönderilemedi (API):", err);

      const fakeResponse = buildFakeResponse();
      console.log("Mock yanıt üretildi:", fakeResponse);
      console.log("Sipariş Özeti (Mock):", { ...payload, ...fakeResponse });

      onSuccess?.({ payload, response: fakeResponse, mocked: true });
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="order-form" onSubmit={onSubmit}>
      <h2 className="order-form__title">Pizza Siparişi</h2>


      <div className="field">
        <label className="label" htmlFor="isim">
          İsim <span className="req">*</span>
        </label>
        <input
          id="isim"
          data-cy="name-input"
          className="input"
          name="isim"
          value={form.isim}
          onChange={onChange}
          minLength={3}
          required
          placeholder="Adınız"
        />
        {errors.isim && <p className="error">{errors.isim}</p>}
      </div>


      <div className="row-2">
        <fieldset className="field fieldset">
          <legend className="label">
            Boyut Seç <span className="req">*</span>
          </legend>

          {["Küçük", "Orta", "Büyük"].map((b) => (
            <label key={b} className="radio">
              <input
                type="radio"
                name="boyut"
                value={b}
                checked={form.boyut === b}
                onChange={onChange}
                required
              />
              <span>{b}</span>
            </label>
          ))}

          {errors.boyut && <p className="error">{errors.boyut}</p>}
        </fieldset>

        <div className="field">
          <label className="label" htmlFor="hamur">
            Hamur Seç <span className="req">*</span>
          </label>
          <select
            id="hamur"
            className="select"
            name="hamur"
            value={form.hamur}
            onChange={onChange}
            required
          >
            <option value="">Hamur Kalınlığı</option>
            <option value="İnce">İnce</option>
            <option value="Orta">Orta</option>
            <option value="Kalın">Kalın</option>
          </select>
          {errors.hamur && <p className="error">{errors.hamur}</p>}
        </div>
      </div>


      <div className="field">
        <h3 className="section-title">Ek Malzemeler</h3>
        <p className="hint">En az 4, en fazla 10 seçim. (5₺)</p>

        <div className="ingredients">
          {MALZEMELER.map((m) => {
            const checked = form.malzemeler.includes(m);
            const disableNewCheck = !checked && form.malzemeler.length >= 10;
            const slug = slugify(m);

            return (
              <label key={m} className="check">
                <input
                  data-cy={`ingredient-${slug}`}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMalzeme(m)}
                  disabled={disableNewCheck}
                />
                <span>{m}</span>
              </label>
            );
          })}
        </div>

        {errors.malzemeler && <p className="error">{errors.malzemeler}</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="not">
          Sipariş Notu
        </label>
        <textarea
          id="not"
          className="textarea"
          name="not"
          value={form.not}
          onChange={onChange}
          placeholder="Siparişine eklemek istediğin bir not var mı?"
        />
      </div>

   
      <div className="order-bottom">
        <div className="quantity">
          <button
            type="button"
            className="qty-btn"
            onClick={() => setAdet((a) => Math.max(1, a - 1))}
          >
            -
          </button>
          <span className="qty-val">{adet}</span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => setAdet((a) => a + 1)}
          >
            +
          </button>
        </div>

        <aside className="order-form__right">
          <h3 className="summary-title">Sipariş Toplamı</h3>

          <div className="summary-row">
            <span>Seçimler</span>
            <span>{(selectionsTotal * adet).toFixed(2)}₺</span>
          </div>

          <div className="summary-row summary-total">
            <span>Toplam</span>
            <span>{total.toFixed(2)}₺</span>
          </div>

          <button
            data-cy="submit-order"
            className="submit-btn"
            type="submit"
            disabled={!isValid || submitting}
          >
            {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
          </button>

          {!isValid && (
            <p className="hint" style={{ marginTop: 10 }}>
              Form tamamlanmadan sipariş veremezsin.
            </p>
          )}
        </aside>
      </div>
    </form>
  );
}
