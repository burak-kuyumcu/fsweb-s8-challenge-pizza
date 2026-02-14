import { useMemo, useRef, useState } from "react";
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

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    hamur: "",
    malzemeler: [],
    ozel: "",
    adet: 1,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submitLockRef = useRef(false);

  const basePrice = 85.5;
  const ingredientPrice = 5;

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

  const selectionsTotal = form.malzemeler.length * ingredientPrice;
  const total = (basePrice + selectionsTotal) * form.adet;

  const setSize = (s) => setForm((p) => ({ ...p, boyut: s }));

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleMalzeme = (m) => {
    setForm((p) => {
      const checked = p.malzemeler.includes(m);
      const next = checked ? p.malzemeler.filter((x) => x !== m) : [...p.malzemeler, m];
      return { ...p, malzemeler: next };
    });
  };

  const dec = () => setForm((p) => ({ ...p, adet: Math.max(1, p.adet - 1) }));
  const inc = () => setForm((p) => ({ ...p, adet: p.adet + 1 }));

  const buildPayload = () => ({
    isim: form.isim.trim(),
    boyut: form.boyut,
    hamur: form.hamur,
    malzemeler: form.malzemeler,
    ozel: form.ozel,
    adet: form.adet,
    secimlerFiyati: selectionsTotal,
    toplam: total,
  });

  const resetForm = () => {
    setForm({
      isim: "",
      boyut: "",
      hamur: "",
      malzemeler: [],
      ozel: "",
      adet: 1,
    });
  };

  const mockResponse = () => ({
    id: String(Math.floor(Math.random() * 900000 + 100000)),
    createdAt: new Date().toISOString(),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (submitLockRef.current) return;
    if (!isValid || submitting) return;

    submitLockRef.current = true;
    setSubmitting(true);
    setSubmitError("");

    const payload = buildPayload();

    try {
      const res = await axios.post("/reqres/api/users", payload, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        timeout: 20000,
      });

      console.log("API RESPONSE:", res.data);
      console.log("ORDER SUMMARY:", { payload, response: res.data });

      onSuccess?.({ payload, response: res.data, mocked: false });
      resetForm();
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 || status === 403) {
        const fake = mockResponse();
        console.warn("API auth failed, using MOCK response:", { status, fake });

        onSuccess?.({ payload, response: fake, mocked: true });
        resetForm();
      } else {
        setSubmitError("İnternet'e bağlanılamadı / CORS oldu. Lütfen tekrar deneyin.");
        console.error("API ERROR:", err);
      }
    } finally {
      setSubmitting(false);
      submitLockRef.current = false;
    }
  };

  return (
    <section className="orderSection">
      <form className="orderLayout" onSubmit={onSubmit} noValidate data-cy="order-form">
        <div className="orderLeft">
          <div className="rowTop">
            <div className="block">
              <div className="labelRow">
                <span className="labelText">Boyut Seç</span>
                <span className="req">*</span>
              </div>

              <div className="sizePills" role="radiogroup" aria-label="Boyut">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-cy={`size-${s}`}
                    className={`pill ${form.boyut === s ? "isActive" : ""}`}
                    onClick={() => setSize(s)}
                    aria-pressed={form.boyut === s}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {errors.boyut && <p className="err">{errors.boyut}</p>}
            </div>

            <div className="block">
              <div className="labelRow">
                <span className="labelText">Hamur Seç</span>
                <span className="req">*</span>
              </div>

              <select className="select2" name="hamur" value={form.hamur} onChange={onChange} data-cy="hamur">
                <option value="">Hamur Kalınlığı Seç</option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>

              {errors.hamur && <p className="err">{errors.hamur}</p>}
            </div>
          </div>

          <div className="block">
            <h3 className="h3">İsim</h3>
            <input
              className="noteInput"
              name="isim"
              value={form.isim}
              onChange={onChange}
              placeholder="Adınız (en az 3 karakter)"
              data-cy="name-input"
            />
            {errors.isim && <p className="err">{errors.isim}</p>}
          </div>

          <div className="block">
            <h3 className="h3">Ek Malzemeler</h3>
            <p className="hint2">En fazla 10 malzeme seçebilirsiniz. 5₺</p>

            <div className="gridChecks">
              {MALZEMELER.map((m) => {
                const checked = form.malzemeler.includes(m);
                const disableNew = !checked && form.malzemeler.length >= 10;

                return (
                  <label key={m} className="checkItem">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMalzeme(m)}
                      disabled={disableNew}
                      data-cy={`malzeme-${m}`}
                    />
                    <span className="box" aria-hidden="true" />
                    <span className="txt">{m}</span>
                  </label>
                );
              })}
            </div>

            {errors.malzemeler && <p className="err">{errors.malzemeler}</p>}
          </div>

          <div className="block">
            <h3 className="h3">Sipariş Notu</h3>
            <textarea
              className="noteInput"
              name="ozel"
              value={form.ozel}
              onChange={onChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              data-cy="order-note"
              rows={3}
            />
          </div>

          <div className="divider" />

          <div className="bottomRow">
            <div className="qty">
              <button type="button" className="qtyBtn" onClick={dec} data-cy="qty-dec">
                -
              </button>
              <span className="qtyVal" data-cy="qty-val">
                {form.adet}
              </span>
              <button type="button" className="qtyBtn" onClick={inc} data-cy="qty-inc">
                +
              </button>
            </div>
          </div>
        </div>

        <aside className="orderRight" data-cy="order-summary">
          <h3 className="sumTitle">Sipariş Toplamı</h3>

          <div className="sumRow">
            <span>Seçimler</span>
            <span data-cy="sum-selections">{(selectionsTotal * form.adet).toFixed(2)}₺</span>
            <span data-cy="secimler-fiyat" style={{ display: "none" }}>
              {(selectionsTotal * form.adet).toFixed(2)}
            </span>
          </div>

          <div className="sumRow totalRow">
            <span>Toplam</span>
            <span data-cy="sum-total">{total.toFixed(2)}₺</span>
            <span data-cy="toplam-fiyat" style={{ display: "none" }}>
              {total.toFixed(2)}
            </span>
          </div>

          {submitError && (
            <p className="err" data-cy="submit-error">
              {submitError}
            </p>
          )}

          <button className="orderBtn" type="submit" disabled={!isValid || submitting} data-cy="submit-order">
            {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
          </button>

          {!isValid && <p className="miniHint">Form tamamlanmadan sipariş veremezsin.</p>}
        </aside>
      </form>
    </section>
  );
}
