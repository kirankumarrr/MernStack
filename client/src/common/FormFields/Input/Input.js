import React from 'react'
import {
  UsergroupDeleteOutlined,
  UnlockOutlined,
  MailOutlined
} from "@ant-design/icons";

const InputIcon = ({ iconName, setIconClassName }) => {
  switch (iconName) {
    case 'email':
      return <MailOutlined className={setIconClassName} />
    case 'password':
        return <UnlockOutlined className={setIconClassName} />
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