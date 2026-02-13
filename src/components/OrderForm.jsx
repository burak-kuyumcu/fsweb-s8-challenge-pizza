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

  const cyKey = (s) =>
    String(s)
      .toLowerCase()
      .trim()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replaceAll(" ", "-");

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleMalzeme = (m) => {
    setForm((p) => {
      const checked = p.malzemeler.includes(m);
      const next = checked
        ? p.malzemeler.filter((x) => x !== m)
        : [...p.malzemeler, m];
      return { ...p, malzemeler: next };
    });
  };

  const dec = () => setForm((p) => ({ ...p, adet: Math.max(1, p.adet - 1) }));
  const inc = () => setForm((p) => ({ ...p, adet: p.adet + 1 }));

  const buildPayload = () => ({
    boyut: form.boyut,
    hamur: form.hamur,
    malzemeler: form.malzemeler,
    not: form.not,
    adet: form.adet,
    secimlerFiyati: selectionsTotal,
    toplam: total,
  });

  const resetForm = () => {
    setForm({
      boyut: "",
      hamur: "",
      malzemeler: [],
      not: "",
      adet: 1,
    });
  };

  const buildMockResponse = () => ({
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    const payload = buildPayload();

    try {
      const res = await axios.post("https://reqres.in/api/users", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 8000,
      });

      onSuccess?.({ payload, response: res.data, mocked: false });
      resetForm();
    } catch (err) {
      const mock = buildMockResponse();
      setSubmitError("Ağ hatası/CORS oldu. Mock yanıt ile devam edildi.");

      onSuccess?.({ payload, response: mock, mocked: true });
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="orderSection" data-cy="order-section">
      <form
        className="orderLayout"
        onSubmit={onSubmit}
        data-cy="order-form"
        noValidate
      >
        <div className="orderLeft" data-cy="order-left">
          <div className="rowTop">
            <div className="block" data-cy="size-block">
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

              {errors.boyut && (
                <p className="err" data-cy="err-size">
                  {errors.boyut}
                </p>
              )}
            </div>

            <div className="block" data-cy="dough-block">
              <div className="labelRow">
                <span className="labelText">Hamur Seç</span>
                <span className="req">*</span>
              </div>

              <select
                className="select2"
                name="hamur"
                value={form.hamur}
                onChange={onChange}
                data-cy="dough-select"
              >
                <option value="">Hamur Kalınlığı Seç</option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>

              {errors.hamur && (
                <p className="err" data-cy="err-dough">
                  {errors.hamur}
                </p>
              )}
            </div>
          </div>

          <div className="block" data-cy="ingredients-block">
            <h3 className="h3">Ek Malzemeler</h3>
            <p className="hint2">En fazla 10 malzeme seçebilirsiniz. 5₺</p>

            <div className="gridChecks" data-cy="ingredients-grid">
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
                      data-cy={`ing-${cyKey(m)}`}
                    />
                    <span className="box" aria-hidden="true" />
                    <span className="txt">{m}</span>
                  </label>
                );
              })}
            </div>

            {errors.malzemeler && (
              <p className="err" data-cy="err-ings">
                {errors.malzemeler}
              </p>
            )}
          </div>

          <div className="block" data-cy="note-block">
            <h3 className="h3">Sipariş Notu</h3>
            <input
              className="noteInput"
              name="not"
              value={form.not}
              onChange={onChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              data-cy="order-note"
            />
          </div>

          <div className="divider" />

          <div className="bottomRow" data-cy="qty-row">
            <div className="qty">
              <button
                type="button"
                className="qtyBtn"
                onClick={dec}
                data-cy="qty-dec"
              >
                -
              </button>

              <span className="qtyVal" data-cy="qty-val">
                {form.adet}
              </span>

              <button
                type="button"
                className="qtyBtn"
                onClick={inc}
                data-cy="qty-inc"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <aside className="orderRight" data-cy="order-summary">
          <h3 className="sumTitle">Sipariş Toplamı</h3>

          <div className="sumRow">
            <span>Seçimler</span>
            <span data-cy="sum-selections">
              {(selectionsTotal * form.adet).toFixed(2)}₺
            </span>
          </div>

          <div className="sumRow totalRow">
            <span>Toplam</span>
            <span data-cy="sum-total">{total.toFixed(2)}₺</span>
          </div>

          {submitError && (
            <p className="err" data-cy="submit-error">
              {submitError}
            </p>
          )}

          <button
            className="orderBtn"
            type="submit"
            disabled={!isValid || submitting}
            data-cy="order-submit"
          >
            {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
          </button>

          {!isValid && (
            <p className="miniHint" data-cy="form-hint">
              Form tamamlanmadan sipariş veremezsin.
            </p>
          )}
        </aside>
      </form>
    </section>
  );
}
