import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Container } from 'react-bootstrap';

import {
  setAge,
  setEmail,
  setGender,
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


function Form() {

  const dispatch = useDispatch();

  const age = useSelector(state => state.toolkit.age);
  const email = useSelector(state => state.toolkit.email);
  const gender = useSelector(state => state.toolkit.gender);
  const height = useSelector(state => state.toolkit.height);
  const heightUnit = useSelector(state => state.toolkit.heightUnit);
  const weight = useSelector(state => state.toolkit.weight);
  const weightUnit = useSelector(state => state.toolkit.weightUnit);
  const lifestyle = useSelector(state => state.toolkit.lifestyle);
  const want = useSelector(state => state.toolkit.want);
  const steps = useSelector(state => state.toolkit.steps);
  const allergy = useSelector(state => state.toolkit.allergy);

  const navigateTo = useNavigate();

  const handlePayClick = e => {
    navigateTo('/payment');
  };

  const[buttonClicked, setButtonClicked] = useState(false)

  const errors = {};

  if (age.trim() === '') {
    errors.age = 'Age cannot be blank';
  }
  if (email.trim() === '') {
    errors.email = 'Email cannot be blank';
  }
  if (gender.trim() === '') {
    errors.gender = 'Gender cannot be blank';
  }
  if (height.trim() === '') {
    errors.height = 'Height cannot be blank';
  }
  if (weight.trim() === '') {
    errors.weight = 'Weight cannot be blank';
  }
  if (lifestyle.trim() === '') {
    errors.lifestyle = 'Lifestyle type cannot be blank';
  }
  if (want.trim() === '') {
    errors.want = 'This field cannot be blank';
  }
  if (steps.trim() === '') {
    errors.steps = 'Steps cannot be blank';
  }

  return (
    <div>
      <Container>
        <form className='form-parent shadow ' onSubmit={handlePayClick}>
          <input
            required
            value={age}
            onChange={e => dispatch(setAge(e.target.value))}
            placeholder='Age'
            className='inp'
            type='text'
          />
          {errors.age && buttonClicked && <div className='error'> <small>{errors.age}</small> </div>}

          <input
            required
            value={email}
            onChange={e => dispatch(setEmail(e.target.value))}
            placeholder='Your Email'
            className='inp'
          />
          {errors.email && buttonClicked && <div className='error'> <small>{errors.email}</small> </div>}

          <select
            required
            className='select'
            onChange={e => dispatch(setGender(e.target.value))}
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

          {errors.gender && buttonClicked && <div className='error'><small>{errors.gender}</small></div>}


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
          {errors.height && buttonClicked && <div className='error'><small>{errors.height}</small></div>}

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
          {errors.weight && buttonClicked && <div className='error'><small>{errors.weight}</small></div>}

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
          {errors.lifestyle && buttonClicked && <div className='error'> <small>{errors.lifestyle}</small> </div>}

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
          {errors.want && buttonClicked && <div className='error'> <small>{errors.want}</small> </div>}
          <input
            value={steps}
            onChange={e => dispatch(setSteps(e.target.value))}
            placeholder='Steps per day'
            className='inp'
            required
          />
          {errors.steps && buttonClicked && <div className='error'><small>{errors.steps}</small></div>}

          <textarea
            className='textarea-form'
            cols='32'
            rows='5'
            placeholder='Allergy, health problems or dietary restrictions'
            value={allergy}
            onChange={e => dispatch(setAllergy(e.target.value))}
          ></textarea>

          <div className='form-check mb-3' style={{ maxWidth: '300px', marginTop: '20px' }}>
            <input
              type='checkbox'
              className='form-check-input'
              id='validationFormCheck1'
              required
            />
            <label className='form-check-label' htmlFor='validationFormCheck1'>
              I agree with
              <a href='/privacy-policy' style={{ fontWeight: '500' }}>
                terms conditions and privacy policy
              </a>
            </label>
          </div>

          {age && age < 18 ? (
            <div style={{minWidth:'300px'}}>
              <p style={{textAlign: 'center', color: 'red'}}>Sorry, you are not 18 years old</p>
              <button className='send-btn' type='submit' disabled style={{width: '100%'}}>
                Buy
              </button>
            </div>
          ) : age == 0 || age >= 18 ? (
            <button
              className='send-btn'
              type='submit'
              onClick={() => setButtonClicked(true)}
            >
              Buy
            </button>
          ) : null}
        </form>
      </Container>
    </div>
  );
}

export default Form;
