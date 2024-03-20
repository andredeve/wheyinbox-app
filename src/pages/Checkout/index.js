import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeGenerator from '../../components/QrCode';
import { useLocation } from 'react-router-dom';

const api = axios.create({
  baseURL: "https://api.mercadopago.com/"
});

function Checkout() {
  const location = useLocation();
  const [responsePayment, setResponsePayment] = useState(null);
  const [linkbuymercadopago, setLinkbuymercadopago] = useState('');
  const [statusPayment, setStatusPayment] = useState(false);
  const [verifyPayment, setVerifyPayment] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(1);

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  api.interceptors.request.use(async config => {
    const token = "APP_USR-4626628561794341-030506-95d667f3892f4f4ae16ab63aa42ff53b-213326122";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-Idempotency-Key'] = `${randomNumber}`;
    return config;
  });

  const getStatusPayment = () => {
    api.get(`v1/payments/${responsePayment.data.id}`).then(response => {
      if (response.data.status === "pending") {
        // alert('Compra pendente de Pagamento');
      }
      if (response.data.status === "approved") {
        // alert('Compra Aprovada');
        setStatusPayment(true);
        setVerifyPayment(false);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      "transaction_amount": transactionAmount , // Usar o valor do state
      "description": "produto",
      "payment_method_id": "pix",
      "payer": {
        "email": "andreluizzz299@hotmail.com",
        "first_name": "andre",
        "last_name": "luiz",
        "identification": {
          "type": "CPF",
          "number": "07209783199"
        }
      },
      "notification_url": "https://eozzldzggu9fcwv.m.pipedream.net",
    };

    api.post("v1/payments", body).then(response => {
      setResponsePayment(response);
      setLinkbuymercadopago(response.data.point_of_interaction.transaction_data.qr_code);
      setVerifyPayment(true);

    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    if (!responsePayment){
       setTransactionAmount(parseFloat(location.state.total)); // Definir o transactionAmount com o valor total 
       handleSubmit({ preventDefault: () => {} });
    }
    const interval = setInterval(() => {
      if (verifyPayment && responsePayment) {
        getStatusPayment();
        console.log('here');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [verifyPayment, responsePayment]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '20px auto' }}>
        {linkbuymercadopago && !statusPayment &&
          <QRCodeGenerator value={linkbuymercadopago} /> 
        }
        <h2>Valor a Pagar: R${transactionAmount.toFixed(2)}</h2>
      </div>
      {statusPayment &&
        <div>
          <h1>Compra Aprovada</h1>
          {/* Adicione mais informações sobre a compra aqui */}
        </div>
      }
    </div>
  );
}

export default Checkout;
