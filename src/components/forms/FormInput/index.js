import React from 'react'
import './index.scss'

const FormInput =({ handleChange, label, ...otherProps}) => {
    return (
        <div className="form">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className="forminput"  onChange={handleChange} {...otherProps} />
        </div>
    );
}

export default FormInput;