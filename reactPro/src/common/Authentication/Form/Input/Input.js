import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
    onChange,
   item,
   formData
}) => {

    const { 
        type,
        name,
        placeholder,
        label,
        required
    } = item

    const setField =(e)=>{
        onChange(e.target.value,name)
    }

    return (
        <div className="input-item">
            <input
            type={type}
            name={name}
            onChange={(e) => setField(e)}
            placeholder={placeholder}
            value={formData[name] || ''}
            required={required}
            />
            <label htmlFor="email">{label} </label>
      </div>
    )
}

Input.propTypes = {

}

export default Input
