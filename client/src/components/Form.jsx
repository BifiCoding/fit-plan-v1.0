import React, { useState, useEffect} from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDoc from './PdfDoc';
import { Container } from 'react-bootstrap';
import Loader from './Loader';



const API_KEY = ' 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';

function Form() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [serverMessages, setServerMessages] = useState([]);

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weight, setWeight] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [want, setWant] = useState('');
  const [steps, setSteps] = useState('');
  const [allergy, setAllergy] = useState('');

  const navigateTo = useNavigate();
  

  const handlePayClick = () => {
    navigateTo(`/payment`);
  };

  const prompt = `${gender}, 
      Age: ${age},
      Height: ${height} ${heightUnit}, 
      Weight: ${weight} ${weightUnit}, 
      Lifestyle: ${lifestyle}, 
      ${want}, 
      Number of steps per day: ${steps},
      Allergy, health problems or dietary restrictions: ${allergy} ,
      

      Based on the previous data, calculate daily calorie requirements and create a personalized meal plan. 
      Write an individualized meal plan for each day of the week in relation to the data you have obtained, and divide it into meals,
       indicating the dishes according to the calorie content you have calculated. ADD THE WEIGHT OF THE INGREDIENTS FOR EACH DISH in grams and pounds:
       If the user specified their initial weight in kg, enter the weight of the ingredients in grams. If the user entered their initial weight in lbs, 
       enter the weight of the ingredients in pounds.
     `;


  const handleSend = async event => {
    navigateTo(`/payment`);
    event.preventDefault();
    console.log(`Age: ${age},
      Height: ${height} ${heightUnit}, 
      Weight: ${weight} ${weightUnit}, 
      Lifestyle: ${lifestyle}, 
      ${want}, 
      Number of steps per day: ${steps}, 
      Allergy, health problems or dietary restrictions: ${allergy} ,`);

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
    console.log(data);

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

  return (
    <div>
      <Container>
        
        <form className='form-parent shadow'>
          <select
            className='select'
            onChange={e => setGender(e.target.value)}
            style={{ color: gender ? 'black' : '#666666' }}
          >
            <option value='' disabled selected hidden>
              Gender
            </option>
            <option value='Men'>Men</option>
            <option value='Womenn'>Women</option>
            <option value='Other'>Other</option>
            <option value='Prefer not to say'>Prefer not to say</option>
          </select>

          <input
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder='Age'
            className='inp'
          />

          <div className='hw-block'>
            <input
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder='Height'
              className='hw-inp'
            />
            <select
              className='select-hw'
              onChange={e => setHeightUnit(e.target.value)}
              style={{ paddingLeft: '1px' }}
            >
              <option value='cm'>cm</option>
              <option value='inch'>inch</option>
            </select>
          </div>
          <div className='hw-block'>
            <input
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder='Weight'
              className='hw-inp'
            />
            <select
              className='select-hw'
              onChange={e => setWeightUnit(e.target.value)}
            >
              <option value='kg'>kg</option>
              <option value='lb'>lb</option>
            </select>
          </div>

          <select
            className='select'
            onChange={e => setLifestyle(e.target.value)}
            style={{ color: lifestyle ? 'black' : '#666666' }}
          >
            <option value='' disabled selected hidden>
              Lifestyle
            </option>
            <option value='Active'>Active</option>
            <option value='Not active'>Not active</option>
            <option value='Medium'>Medium</option>
          </select>

          <select
            className='select'
            onChange={e => setWant(e.target.value)}
            style={{ color: want ? 'black' : '#666666' }}
          >
            <option value='' disabled selected hidden>
              You would like to lose / maintain / gain weight
            </option>
            <option value='Lose weight'>Lose weight</option>
            <option value='Maintain weight'>Maintain weight</option>
            <option value='Gain weight'>Gain weight</option>
          </select>

          <input
            value={steps}
            onChange={e => setSteps(e.target.value)}
            placeholder='Steps per day'
            className='inp'
          />

          <textarea
            className='textarea-form'
            cols='32'
            rows='5'
            placeholder='Allergy, health problems or dietary restrictions'
            value={allergy}
            onChange={ e => setAllergy(e.target.value)}
          ></textarea>

          <button onClick={handlePayClick} className='send-btn'>
            Buy
          </button>


            
          

          {serverMessages.length > 0 ? (
          <div className='download-parent'>
            <PDFDownloadLink
              document={<PdfDoc textDiet={serverMessages} />}
              fileName='Diet by FitPlan'
              onClick={e => e.preventDefault}
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <button className='download'>Download PDF</button>
            </PDFDownloadLink>
          </div>
        ) : (
          ''
        )}
          
          {typing && <div className="">
          Please wait, your personalized diet is creating...
          <Loader />
          </div>}
          
        </form>
        {serverMessages.length > 0 ? (
      <div style={{backgroundColor: 'white'}} className='shadow mt-4 pt-3'>

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

        {serverMessages.length > 0 ? (
          <div className='download-parent'>
            <PDFDownloadLink
              document={<PdfDoc textDiet={serverMessages} />}
              fileName='Diet by FitPlan'
              onClick={e => e.preventDefault}
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <button className='download'>Download PDF</button>
            </PDFDownloadLink>
          </div>
        ) : (
          ''
        )}
        </div>
        ):('')}
      </Container>
    </div>
  );
}

export default Form;
