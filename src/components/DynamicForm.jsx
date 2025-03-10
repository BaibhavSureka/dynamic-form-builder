import { useState, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import FormField from "./FormField"
import FormSection from "./FormSection"

const DynamicForm = ({ schema, onSubmit, formData, setFormData }) => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sections, setSections] = useState([])

  useEffect(() => {
    const initialData = {}

    const initializeData = (fields, parentKey = "") => {
      fields.forEach((field) => {
        const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name

        if (field.type === "section") {
          initializeData(field.fields, fieldKey)
        } else if (field.defaultValue !== undefined) {
          setNestedValue(initialData, fieldKey, field.defaultValue)
        } else if (field.type === "checkbox") {
          setNestedValue(initialData, fieldKey, false)
        } else if (field.type === "select") {
          setNestedValue(initialData, fieldKey, field.options[0]?.value || "")
        } else {
          setNestedValue(initialData, fieldKey, "")
        }
      })
    }

    initializeData(schema.fields)
    setFormData(initialData)

    const topLevelSections = schema.fields.filter((field) => field.type === "section")
    setSections(
      topLevelSections.map((section, index) => ({
        id: section.name,
        index,
        section,
      })),
    )
  }, [schema, setFormData])

  const setNestedValue = (obj, path, value) => {
    const keys = path.split(".")
    let current = obj

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
  }

  const getNestedValue = (obj, path) => {
    const keys = path.split(".")
    let current = obj

    for (const key of keys) {
      if (current === undefined || current === null) return undefined
      current = current[key]
    }

    return current
  }

  const validateField = (field, value) => {
    if (field.required && (value === undefined || value === "" || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address"
      }
    }

    if (field.type === "password" && value && field.minLength) {
      if (value.length < field.minLength) {
        return `Password must be at least ${field.minLength} characters`
      }
    }

    if (field.type === "number" && value !== "") {
      const numValue = Number(value)
      if (isNaN(numValue)) {
        return "Please enter a valid number"
      }
      if (field.min !== undefined && numValue < field.min) {
        return `Value must be at least ${field.min}`
      }
      if (field.max !== undefined && numValue > field.max) {
        return `Value must be at most ${field.max}`
      }
    }

    if (field.pattern && value) {
      const regex = new RegExp(field.pattern)
      if (!regex.test(value)) {
        return field.patternMessage || "Value does not match the required pattern"
      }
    }

    if (field.validation && typeof field.validation === "function") {
      return field.validation(value, formData)
    }

    return null
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    const validateFields = (fields, parentKey = "") => {
      fields.forEach((field) => {
        const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name

        if (field.type === "section") {
          validateFields(field.fields, fieldKey)
        } else {
          const value = getNestedValue(formData, fieldKey)
          const error = validateField(field, value)

          if (error) {
            newErrors[fieldKey] = error
            isValid = false
          }
        }
      })
    }

    validateFields(schema.fields)
    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name, value) => {
    const newFormData = { ...formData }
    setNestedValue(newFormData, name, value)
    setFormData(newFormData)

    const newTouched = { ...touched }
    newTouched[name] = true
    setTouched(newTouched)

    const fieldPath = name.split(".")
    const fieldName = fieldPath[fieldPath.length - 1]

    const findField = (fields, path) => {
      for (const field of fields) {
        if (field.name === path[0]) {
          if (path.length === 1) return field
          if (field.type === "section") {
            return findField(field.fields, path.slice(1))
          }
        }
      }
      return null
    }

    const field = findField(schema.fields, fieldPath)
    if (field) {
      const error = validateField(field, value)
      const newErrors = { ...errors }

      if (error) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }

      setErrors(newErrors)
    }
  }

  const handleBlur = (name) => {
    const newTouched = { ...touched }
    newTouched[name] = true
    setTouched(newTouched)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allTouched = {}
    const markAllTouched = (fields, parentKey = "") => {
      fields.forEach((field) => {
        const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name

        if (field.type === "section") {
          markAllTouched(field.fields, fieldKey)
        } else {
          allTouched[fieldKey] = true
        }
      })
    }

    markAllTouched(schema.fields)
    setTouched(allTouched)

    if (validateForm()) {
      onSubmit(formData)
    } else {
      const firstErrorElement = document.querySelector(".text-red-600")
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const reorderedFields = Array.from(schema.fields)
    const sectionFields = reorderedFields.filter((field) => field.type === "section")
    const [reorderedItem] = sectionFields.splice(result.source.index, 1)

    const sourceIndex = reorderedFields.findIndex(
      (field) => field.type === "section" && field.name === reorderedItem.name,
    )

    const destSectionIndex = result.destination.index
    let destIndex = 0
    let sectionCount = 0

    for (let i = 0; i < reorderedFields.length; i++) {
      if (reorderedFields[i].type === "section") {
        if (sectionCount === destSectionIndex) {
          destIndex = i
          break
        }
        sectionCount++
      }
      if (i === reorderedFields.length - 1) {
        destIndex = i + 1
      }
    }
    const [removed] = reorderedFields.splice(sourceIndex, 1)
    reorderedFields.splice(destIndex, 0, removed)

    const newSchema = {
      ...schema,
      fields: reorderedFields,
    }

    const newSections = reorderedFields
      .filter((field) => field.type === "section")
      .map((section, index) => ({
        id: section.name,
        index,
        section,
      }))

    setSections(newSections)
  }

  const renderFormFields = (fields, parentKey = "") => {
    return fields.map((field) => {
      const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name

      if (field.type === "section") {
        return <FormSection key={fieldKey} field={field} parentKey={fieldKey} renderFormFields={renderFormFields} />
      }

      return (
        <FormField
          key={fieldKey}
          field={field}
          name={fieldKey}
          value={getNestedValue(formData, fieldKey)}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[fieldKey]}
          touched={touched[fieldKey]}
        />
      )
    })
  }

  const renderDraggableSections = () => {
  return (
    <Droppable droppableId="sections">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
          {sections.map((item, index) => (
            <FormSection
              key={item.id}
              field={item.section}
              parentKey={item.section.name}
              renderFormFields={renderFormFields}
              index={index}
              isDraggable
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

  const renderNonSectionFields = () => {
    const nonSectionFields = schema.fields.filter((field) => field.type !== "section")
    return renderFormFields(nonSectionFields)
  }

 return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">{schema.title}</h2>
        {renderNonSectionFields()}
        {sections.length > 0 && renderDraggableSections()}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors transform hover:scale-105 duration-200"
          >
            {schema.submitButtonText || "Submit"}
          </button>
        </div>
      </form>
    </DragDropContext>
  )
}

export default DynamicForm

