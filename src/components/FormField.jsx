import React from 'react';

const FormField = ({ field, name, value, onChange, onBlur, error, touched }) => {
  const handleChange = (e) => {
    const fieldValue = field.type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(name, fieldValue);
  };

  const handleBlur = () => {
    onBlur(name);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={field.type}
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder || ''}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={field.disabled}
            required={field.required}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder || ''}
            rows={field.rows || 3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={field.disabled}
            required={field.required}
          />
        );
      
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={field.disabled}
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value || false}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors ${
                touched && error ? 'border-red-500' : ''
              }`}
              disabled={field.disabled}
              required={field.required}
            />
            <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
              {field.checkboxLabel || field.label}
            </label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 transition-colors ${
                    touched && error ? 'border-red-500' : ''
                  }`}
                  disabled={field.disabled}
                  required={field.required}
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <input
            type="file"
            id={name}
            name={name}
            onChange={(e) => {
              // For file inputs, we pass the FileList object
              onChange(name, e.target.files);
            }}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={field.disabled}
            required={field.required}
            accept={field.accept}
            multiple={field.multiple}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={field.disabled}
            required={field.required}
            min={field.min}
            max={field.max}
          />
        );
      
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="mb-4 transition-all duration-200 hover:shadow-sm p-2 rounded-md">
      {field.type !== 'checkbox' && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {field.helpText && <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>}
      {touched && error && (
        <p className="mt-1 text-sm text-red-600 animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default FormField;
