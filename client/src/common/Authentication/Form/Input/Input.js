import validator from 'validator';
import React, {useState} from 'react'
import PropTypes from 'prop-types';

import {  ExclamationOutlined }  from '@ant-design/icons';

import './Input.scss';

const Input = ({
    onChange,
   item,
   formData,
   formError,
   keyIn
}) => {

    const [errors, setErrors] = useState([])

    const { 
        type,
        name,
        placeholder,
        label,
        required,
        validations,
    } = item

    const setField =(e)=>{
        const {value} = e.target;
       
        let collectFieldDetails={
            value,
            field:name
        };
        validations.forEach(element => {
            if(element.task=== 'email' && !validator.isEmail(value)){
                collectFieldDetails.errorMessage= element.errorMessage;
            }
            else if(element.task=== 'required' && validator.isEmpty(value)){
                collectFieldDetails.errorMessage= element.errorMessage;
            }
        }); 
        onChange(collectFieldDetails)
    }
    return (
        <div className='element-wrapper' key={keyIn}>
            <div className="input-item" key={keyIn}>
                
                <input
                    type={type}
                    id={name}
                    name={name}
                    onChange={(e) => setField(e)}
                    onBlur={e=>setField(e)}
                    placeholder={placeholder}
                    value={formData[name] || ''}
                    autoComplete="false" 
                />
                <label htmlFor={name}>{label} </label>
                
        </div>
        {
            formError!==undefined && formError!=='' && 
            <div className="error-container" key={`${keyIn}-error`}>
                <span className="error-layer">
                    <ExclamationOutlined />
                    <span className="error-msg">{formError}</span>
                </span>
            </div>
        }
      </div>
    )
}

Input.propTypes = {

}

export default Input
