import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"

const FormSection = ({ field, parentKey, renderFormFields, index, isDraggable = false }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const sectionContent = (
    <div
      className={`border rounded-md p-4 mb-6 ${
        isDraggable ? "bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200" : "bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-indigo-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        <div className="flex items-center">
          {isDraggable && (
            <span className="text-gray-400 mr-2 flex items-center cursor-grab active:cursor-grabbing">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </span>
          )}
          <button
            type="button"
            onClick={toggleExpand}
            className="text-gray-500 hover:text-indigo-700 focus:outline-none transition-colors"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {field.description && <p className="text-sm text-gray-600 mb-4">{field.description}</p>}

      {isExpanded && (
        <div className="space-y-4 transition-all duration-300">{renderFormFields(field.fields, parentKey)}</div>
      )}
    </div>
  )

  if (isDraggable) {
    return (
      <Draggable draggableId={field.name} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "opacity-70 shadow-lg" : ""}`}
          >
            {sectionContent}
          </div>
        )}
      </Draggable>
    )
  }

  return sectionContent
}

export default FormSection

