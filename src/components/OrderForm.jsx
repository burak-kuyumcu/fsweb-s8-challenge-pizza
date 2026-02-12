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

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState({
    boyut: "", 
    hamur: "",
    malzemeler: [],
    not: "",
    adet: 1,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const basePrice = 85.5;
  const ingredientPrice = 5;

  const errors = useMemo(() => {
    const e = {};
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
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleMalzeme = (m) => {
    setForm((p) => {
      const checked = p.malzemeler.includes(m);
      const next = checked ? p.malzemeler.filter((x) => x !== m) : [...p.malzemeler, m];
      return { ...p, malzemeler: next };
    });
  };

  const dec = () => setForm((p) => ({ ...p, adet: Math.max(1, p.adet - 1) }));
  const inc = () => setForm((p) => ({ ...p, adet: p.adet + 1 }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      boyut: form.boyut,
      hamur: form.hamur,
      malzemeler: form.malzemeler,
      ozel: form.not,
      adet: form.adet,
      toplam: total,
    };

    try {
     
      const res = await axios.post("https://reqres.in/api/users", payload, {
        headers: { "Content-Type": "application/json" },
      });

      onSuccess?.({ payload, response: res.data, mocked: false });
    } catch (err) {
      setSubmitError("İnternet'e bağlanılamadı veya istek başarısız oldu. Tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="orderSection">
      <form className="orderLayout" onSubmit={onSubmit}>
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

              <select className="select2" name="hamur" value={form.hamur} onChange={onChange}>
                <option value="">Hamur Kalınlığı Seç</option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>

              {errors.hamur && <p className="err">{errors.hamur}</p>}
            </div>
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
            <input
              className="noteInput"
              name="not"
              value={form.not}
              onChange={onChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </div>

          <div className="divider" />

          <div className="bottomRow">
            <div className="qty">
              <button type="button" className="qtyBtn" onClick={dec}>
                -
              </button>
              <span className="qtyVal">{form.adet}</span>
              <button type="button" className="qtyBtn" onClick={inc}>
                +
              </button>
            </div>
          </div>
        </div>

        <aside className="orderRight">
          <h3 className="sumTitle">Sipariş Toplamı</h3>

          <div className="sumRow">
            <span>Seçimler</span>
            <span>{(selectionsTotal * form.adet).toFixed(2)}₺</span>
          </div>

          <div className="sumRow totalRow">
            <span>Toplam</span>
            <span>{total.toFixed(2)}₺</span>
          </div>

          {submitError && <p className="err">{submitError}</p>}

          <button className="orderBtn" type="submit" disabled={!isValid || submitting}>
            {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
          </button>

          {!isValid && <p className="miniHint">Form tamamlanmadan sipariş veremezsin.</p>}
        </aside>
      </form>
    </section>
  );
}
