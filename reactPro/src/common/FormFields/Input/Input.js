import React from 'react'
import {
  UsergroupDeleteOutlined,
  FacebookOutlined
} from "@ant-design/icons";

const InputIcon = ({ iconName, setIconClassName }) => {
  switch (iconName) {
    case 'UsergroupDeleteOutlined':
      return <UsergroupDeleteOutlined className={setIconClassName} />

    default:
      return <UsergroupDeleteOutlined className={setIconClassName} />
  }
}

const Input = (props) => {
  const {
    isIconRequired,
    placeholder,
    inputSetClassName,
    onChange,
    field,
    value,
    type} = props;
  return (
    <div className="input-field">
      {isIconRequired && <InputIcon {...props} />}
      <input type={type}
        placeholder={placeholder}
        className={inputSetClassName}
        onChange={onChange}
        name={field}
        value={value || ''}
      />
    </div>
  )
}

export default Input