import { useState, useEffect } from "react"
import DynamicForm from "./components/DynamicForm"
import { sampleFormSchema } from "./schemas/sampleFormSchema"
import SubmittedDataViewer from "./components/SubmittedDataViewer"
import "./index.css"

function App() {
  const [formData, setFormData] = useState({})
  const [submittedData, setSubmittedData] = useState([])
  const [activeTab, setActiveTab] = useState("form")
  const [formSchema, setFormSchema] = useState(sampleFormSchema)

  useEffect(() => {
    const savedData = localStorage.getItem("submittedFormData")
    if (savedData) {
      try {
        setSubmittedData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error loading saved data:", e)
      }
    }
  }, [])

  const handleSubmit = (data) => {
    const dataWithTimestamp = {
      ...data,
      submittedAt: new Date().toISOString(),
    }
    const newSubmittedData = [...submittedData, dataWithTimestamp]
    setSubmittedData(newSubmittedData)

    localStorage.setItem("submittedFormData", JSON.stringify(newSubmittedData))

    alert("Form submitted successfully!")

    setFormData({})

    setActiveTab("submissions")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">Dynamic Form Builder</h1>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "form"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("form")}
          >
            Form
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "submissions"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions ({submittedData.length})
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "schema"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("schema")}
          >
            Schema Editor
          </button>
        </div>

        {activeTab === "form" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
            <DynamicForm schema={formSchema} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
          </div>
        )}

        {activeTab === "submissions" && (
          <SubmittedDataViewer
            submittedData={submittedData}
            clearData={() => {
              setSubmittedData([])
              localStorage.removeItem("submittedFormData")
            }}
          />
        )}

        {activeTab === "schema" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Schema Editor</h2>
            <p className="text-sm text-gray-500 mb-4">Edit the JSON schema to customize your form structure.</p>
            <textarea
              className="w-full h-96 font-mono text-sm p-4 border rounded-md"
              value={JSON.stringify(formSchema, null, 2)}
              onChange={(e) => {
                try {
                  const newSchema = JSON.parse(e.target.value)
                  setFormSchema(newSchema)
                } catch (error) {
                  // Don't update if JSON is invalid
                  console.error("Invalid JSON schema:", error)
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

