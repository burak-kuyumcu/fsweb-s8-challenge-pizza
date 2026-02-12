import { useState } from "react";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import Footer from "./components/Footer.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import OrderForm from "./Components/OrderForm.jsx";
import OrderHeader from "./components/OrderHeader.jsx";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home"); 
  const [orderData, setOrderData] = useState(null);

  const goOrder = () => setPage("order");
  const goHome = () => setPage("home");

  const handleOrderSuccess = (dataFromForm) => {
    setOrderData(dataFromForm);
    setPage("success");
  };

  if (page === "home") {
    return (
      <>
        <Header onStartOrder={goOrder} />
        <Body />
        <Footer />
      </>
    );
  }

  if (page === "order") {
    return (
      <>
        <OrderHeader />
        <main className="page">
          <OrderForm onSuccess={handleOrderSuccess} />
        </main>
      </>
    );
  }

  return (
    <>
      <Success order={orderData} onBackHome={goHome} />
    </>
  );
}
