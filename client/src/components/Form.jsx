import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Container } from 'react-bootstrap';

import {
  setGender,
  setAge,
  setHeight,
  setHeightUnit,
  setWeight,
  setWeightUnit,
  setLifestyle,
  setWant,
  setSteps,
  setAllergy,
} from '../toolkitRedux/toolkitSlice';

import './form.css';
import PdfDoc from './PdfDoc';
import Loader from './Loader';

const API_KEY = ' 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';

function Form() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [serverMessages, setServerMessages] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const dispatch = useDispatch();

  const gender = useSelector(state => state.toolkit.gender);
  const age = useSelector(state => state.toolkit.age);
  const height = useSelector(state => state.toolkit.height);
  const heightUnit = useSelector(state => state.toolkit.heightUnit);
  const weight = useSelector(state => state.toolkit.weight);
  const weightUnit = useSelector(state => state.toolkit.weightUnit);
  const lifestyle = useSelector(state => state.toolkit.lifestyle);
  const want = useSelector(state => state.toolkit.want);
  const steps = useSelector(state => state.toolkit.steps);
  const allergy = useSelector(state => state.toolkit.allergy);

  const navigateTo = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePayClick = e => {
    navigateTo('/payment')
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
        <form className='form-parent shadow ' onSubmit={handlePayClick}>
          <select
            className='select'
            onChange={e => dispatch(setGender(e.target.value))}
            style={{ color: gender ? 'black' : '#666666' }}
            required
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
            onChange={e => dispatch(setAge(e.target.value))}
            placeholder='Age'
            className='inp'
            required
          />

          <div className='hw-block'>
            <input
              value={height}
              onChange={e => dispatch(setHeight(e.target.value))}
              placeholder='Height'
              className='hw-inp'
              required
            />
            <select
              className='select-hw'
              onChange={e => dispatch(setHeightUnit(e.target.value))}
              style={{ paddingLeft: '1px' }}
            >
              <option value='cm'>cm</option>
              <option value='inch'>inch</option>
            </select>
          </div>
          <div className='hw-block'>
            <input
              value={weight}
              onChange={e => dispatch(setWeight(e.target.value))}
              placeholder='Weight'
              className='hw-inp'
              required
            />
            <select
              className='select-hw'
              onChange={e => dispatch(setWeightUnit(e.target.value))}
            >
              <option value='kg'>kg</option>
              <option value='lb'>lb</option>
            </select>
          </div>

          <select
            className='select'
            onChange={e => dispatch(setLifestyle(e.target.value))}
            style={{ color: lifestyle ? 'black' : '#666666' }}
            required
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
            onChange={e => dispatch(setWant(e.target.value))}
            style={{ color: want ? 'black' : '#666666' }}
            required
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
            onChange={e => dispatch(setSteps(e.target.value))}
            placeholder='Steps per day'
            className='inp'
            required
          />

          <textarea
            className='textarea-form'
            cols='32'
            rows='5'
            placeholder='Allergy, health problems or dietary restrictions'
            value={allergy}
            onChange={e => dispatch(setAllergy(e.target.value))}
          ></textarea>

          <div class='form-check mb-3' style={{maxWidth: '300px'}}>
            <input
              type='checkbox'
              class='form-check-input'
              id='validationFormCheck1'
              required
            />
            <label class='form-check-label' for='validationFormCheck1'>
              I agree with <a href='/privacy-policy' style={{fontWeight: '500'}}>terms conditions and privacy policy</a>
            </label>
          </div>

          <button className='send-btn' type='submit'>
            Buy
          </button>
        </form>

      </Container>
    </div>
  );
}

export default Form;
