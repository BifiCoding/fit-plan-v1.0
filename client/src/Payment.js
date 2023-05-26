import { useEffect, useState } from 'react';
import './payment.css';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/config').then(async r => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(async result => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className='body-payment'>
      <div className='payment block'>
        <h1> FitPlan x Stripe Payment </h1>
        <div className=''>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
