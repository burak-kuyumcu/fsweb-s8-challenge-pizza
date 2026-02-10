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

export default function OrderForm() {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    hamur: "",
    malzemeler: [],
    not: "",
  });

  const [submitting, setSubmitting] = useState(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        isim: form.isim.trim(),
        boyut: form.boyut,
        hamur: form.hamur,
        malzemeler: form.malzemeler,
        ozel: form.not,
      };

      const res = await axios.post("https://reqres.in/api/pizza", payload, {
        headers: {
          "x-api-key": "reqres-free-v1",
          "Content-Type": "application/json",
        },
      });

      console.log("API Yanıtı:", res.data);
      console.log("Sipariş Özeti:", {
        id: res.data.id,
        createdAt: res.data.createdAt,
        ...payload,
      });

      setForm({
        isim: "",
        boyut: "",
        hamur: "",
        malzemeler: [],
        not: "",
      });
    } catch (err) {
      console.error("Sipariş gönderilemedi:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1>Pizza Siparişi</h1>

      <label style={{ display: "block", marginTop: 16 }}>
        İsim *
        <input
          name="isim"
          value={form.isim}
          onChange={onChange}
          minLength={3}
          required
          placeholder="Adınız"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </label>
      {errors.isim && <p style={{ color: "crimson" }}>{errors.isim}</p>}

      <fieldset style={{ marginTop: 16 }}>
        <legend>Boyut Seç *</legend>
        {["Küçük", "Orta", "Büyük"].map((b) => (
          <label key={b} style={{ display: "block", marginTop: 6 }}>
            <input
              type="radio"
              name="boyut"
              value={b}
              checked={form.boyut === b}
              onChange={onChange}
              required
            />{" "}
            {b}
          </label>
        ))}
      </fieldset>
      {errors.boyut && <p style={{ color: "crimson" }}>{errors.boyut}</p>}

      <label style={{ display: "block", marginTop: 16 }}>
        Hamur Seç *
        <select
          name="hamur"
          value={form.hamur}
          onChange={onChange}
          required
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        >
          <option value="">Seçiniz</option>
          <option value="İnce">İnce</option>
          <option value="Orta">Orta</option>
          <option value="Kalın">Kalın</option>
        </select>
      </label>
      {errors.hamur && <p style={{ color: "crimson" }}>{errors.hamur}</p>}

      <div style={{ marginTop: 16 }}>
        <h3>Ek Malzemeler</h3>
        <p>En az 4, en fazla 10 seçim.</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {MALZEMELER.map((m) => {
            const checked = form.malzemeler.includes(m);
            const disableNewCheck = !checked && form.malzemeler.length >= 10;

            return (
              <label key={m} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMalzeme(m)}
                  disabled={disableNewCheck}
                />
                {m}
              </label>
            );
          })}
        </div>

        {errors.malzemeler && <p style={{ color: "crimson" }}>{errors.malzemeler}</p>}
      </div>

      <label style={{ display: "block", marginTop: 16 }}>
        Sipariş Notu
        <textarea
          name="not"
          value={form.not}
          onChange={onChange}
          placeholder="Eklemek istediğin bir not var mı?"
          style={{ width: "100%", padding: 10, marginTop: 6, minHeight: 90 }}
        />
      </label>

      <button
        type="submit"
        disabled={!isValid || submitting}
        style={{
          marginTop: 18,
          width: "100%",
          padding: 12,
          border: 0,
          cursor: !isValid || submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
      </button>

      {!isValid && (
        <p style={{ marginTop: 10, color: "#5F5F5F" }}>
          Form tamamlanmadan sipariş veremezsin.
        </p>
      )}
    </form>
  );
}
