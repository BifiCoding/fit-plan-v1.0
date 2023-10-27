import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useLocation, useNavigate } from 'react-router-dom';

import './FormPaid.css'

import PdfDoc from '../components/PdfDoc';
import Loader from '../components/Loader';

const API_KEY = '';

function FormPaid() {
  const location = useLocation();
  const navigate = useNavigate();

  const age = useSelector(state => state.toolkit.age);
  const mail = useSelector(state => state.toolkit.mail);
  const gender = useSelector(state => state.toolkit.gender);
  const height = useSelector(state => state.toolkit.height);
  const heightUnit = useSelector(state => state.toolkit.heightUnit);
  const weight = useSelector(state => state.toolkit.weight);
  const weightUnit = useSelector(state => state.toolkit.weightUnit);
  const lifestyle = useSelector(state => state.toolkit.lifestyle);
  const want = useSelector(state => state.toolkit.want);
  const steps = useSelector(state => state.toolkit.steps);
  const allergy = useSelector(state => state.toolkit.allergy);

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [serverMessages, setServerMessages] = useState([]);

  const prompt = `${gender}, 
      Age: ${age},
      Height: ${height} ${heightUnit}, 
      Weight: ${weight} ${weightUnit}, 
      Lifestyle: ${lifestyle}, 
      ${want}, 
      Number of steps per day: ${steps},
      Allergy, health problems or dietary restrictions: ${allergy} ,
      

      Based on the previous data, calculate daily calorie requirements and create a personalized meal plan. 
      Write an individualized meal plan for EACH DAY of the WEEK(Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday) in relation to the data you have obtained,  and divide it into meals,
      indicating the dishes according to the calorie content you have calculated. For each day NEW MEAL PLAN !!!. !!! ADD THE WEIGHT OF THE INGREDIENTS FOR EACH DISH in grams or pounds !!! :
      If the user specified their initial weight in kg, enter the weight of the ingredients in grams. If the user entered their initial weight in lbs, 
      enter the weight of the ingredients in pounds.
      `;

  const handleGenerete = async event => {
    event.preventDefault();
    const newMessage = {
      message: prompt,
      sender: 'user',
      direction: 'outgoing',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatAI(newMessages);
  };

  async function processMessageToChatAI(chatMessage) {
    let apiMessages = chatMessage.map(messageObject => {
      let role = '';
      if (messageObject.sender === 'ChatAI') {
        role = 'assistant';
      } else {
        role = 'user';
      }

      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [...apiMessages],
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();
    

    setMessages([
      ...chatMessage,
      {
        message: data.choices[0].message.content,
        sender: 'ChatAI',
      },
    ]);

    setServerMessages([
      ...serverMessages,
      {
        message: data.choices[0].message.content,
      },
    ]);

    setTyping(false);
  }




  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentIntent = searchParams.get('payment_intent');

    

    if (paymentIntent) {
      // URL містить параметр payment_intent, виконуємо ваш скрипт або дії
      // ...
      // Ваш код для випадку, коли URL містить параметр payment_intent
      const handleGenerete = async event => {
        const newMessage = {
          message: prompt,
          sender: 'user',
          direction: 'outgoing',
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setTyping(true);
        await processMessageToChatAI(newMessages);
      };

      async function processMessageToChatAI(chatMessage) {
        let apiMessages = chatMessage.map(messageObject => {
          let role = '';
          if (messageObject.sender === 'ChatAI') {
            role = 'assistant';
          } else {
            role = 'user';
          }

          return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
          model: 'gpt-3.5-turbo',
          messages: [...apiMessages],
        };

        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        const data = await response.json();
        

        setMessages([
          ...chatMessage,
          {
            message: data.choices[0].message.content,
            sender: 'ChatAI',
          },
        ]);

        setServerMessages([
          ...serverMessages,
          {
            message: data.choices[0].message.content,
          },
        ]);

        setTyping(false);
      }

      handleGenerete();
    } else {
      // URL не містить параметр payment_intent, перенаправляємо користувача на іншу сторінку
      navigate('/'); // Замініть на URL-адресу іншої сторінки
    }
  }, [location.search, navigate]);



  if (serverMessages.length >= 1) {
    localStorage.clear('/');
  }

  if (localStorage.length === 0 && serverMessages.length < 1) {
    navigate('/');
  }



  const weekdays = ['Monday:', 'Tuesday:', 'Wednesday:', 'Thursday:', 'Friday:', 'Saturday:', 'Sunday:'];
  const weekdaysRegex =
    /(Monday:|Tuesday:|Wednesday:|Thursday:|Friday:|Saturday:|Sunday:)/gi;
    

  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }} className='shadow'>
        {typing && (
          <div
            className='text-center'
            style={{ paddingTop: '10px', fontWeight: '500', fontSize: '18px' }}
          >
            Please wait, your personalized diet is creating...
            <Loader />
            <video
              loop
              className='fillWidth my-2 '
              muted
              controls
              style={{ maxWidth: '550px' }}
              autoPlay
            >
              <source
                src='https://res.cloudinary.com/dsnq7fnsl/video/upload/v1687882410/FitPlan_um64om.mov'
                type='video/mp4'
              />
            </video>
          </div>
        )}

        {localStorage.length === 0 ? (
          <>
            <div
              className=''
              style={{
                textAlign: 'center',
                paddingTop: '10px',
                fontWeight: '600',
                fontSize: '20px',
              }}
            >
              Your 100% personalized meal plan:
            </div>
            {serverMessages.length > 0 && (
              <div style={{ backgroundColor: '' }} className='pt-1'>
                {messages.map((message, index) =>
                  message.sender === 'ChatAI' ? (
                    <div
                      key={index}
                      style={{ whiteSpace: 'pre-line' }}
                      className='result'
                    >
                      {message.message
                        .split(weekdaysRegex)
                        .map((part, index) =>
                          weekdays.includes(part) ? (
                            <strong key={index}>{part}</strong>
                          ) : (
                            part
                          )
                        )}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {serverMessages.length > 0 && (
              <div style={{ backgroundColor: '' }} className='pt-1'>
                {messages.map(
                  (message, index) =>
                    message.sender === 'ChatAI' && (
                      <div
                        key={index}
                        style={{ whiteSpace: 'pre-line' }}
                        className='result'
                      >
                        {message.message}
                      </div>
                    )
                )}
              </div>
            )}
          </>
        )}

        {serverMessages.length > 0 && (
          <div className='download-parent'>
            <PDFDownloadLink
              document={<PdfDoc textDiet={serverMessages} />}
              fileName='Diet by FitPlan'
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <button className='download'>Download PDF</button>
            </PDFDownloadLink>
          </div>
        )}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default FormPaid;
