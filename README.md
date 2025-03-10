# 📌 Dynamic Form Builder  

## 🎯 Objective  
Build a **Dynamic Form Generator** using **React** and **recursion**. The form should be generated based on a **JSON schema**, supporting various field types such as:  
✔️ Text Inputs  
✔️ Select Dropdowns  
✔️ Checkboxes  
✔️ Nested Sections (Education, Work Experience, etc.)  

---

## 🔧 Features & Requirements  

### ✅ 1. **React-Based Dynamic Form**  
- Built a **reusable Dynamic Form component** that renders form fields dynamically based on a JSON schema.  
- Implemented **recursion** to handle **nested sections** dynamically.  

### ✅ 2. **JSON-Based Schema**  
- The form is **fully configurable** using a JSON structure.  
- Can support **various input types** dynamically.  

### ✅ 3. **Recursive Form Rendering**  
- Used **recursion** to render **nested sections dynamically**.  
- The form adapts **without requiring manual updates** when the JSON structure changes.  

### ✅ 4. **Form Submission & State Management**  
- Captures the form data in a **state object** and displays it on submission.  
- Uses **React Hooks** (`useState`, `useEffect`) for efficient **state management**.  

### ⭐ 5. **Bonus Features** (Implemented for extra credit)  
✔️ **Validation** – Required fields, email validation, etc.  
✔️ **Drag-and-Drop** – Allows users to reorder sections/fields.  
✔️ **Modern UI** – Styled using **Tailwind CSS** for a sleek design.  

---

## 📂 Folder Structure  

```
src/
 ├── components/          # Reusable UI components
 │   ├── DynamicForm.jsx
 │   ├── FormField.jsx
 │   ├── FormSection.jsx
 │   ├── SubmittedDataViewer.jsx
 ├── schemas/             # Form schema definitions
 │   ├── sampleFormSchema.js
 ├── App.jsx              # Main application logic
 ├── main.jsx             # React entry point
 ├── index.html           # Root HTML file
 ├── index.css            # Global styles
 ├── package.json         # Dependencies & scripts
 ├── vite.config.js       # Vite configuration
```

---

## 🚀 Setup & Installation  

1️⃣ **Clone the repository**  
```bash
git clone https://github.com/BaibhavSureka/dynamic-form-builder.git
cd dynamic-form-builder
```

2️⃣ **Install dependencies**  
```bash
npm install
```

3️⃣ **Run the project**  
```bash
npm run dev
```
Then, open `http://localhost:5173/` in your browser.  

---

## 📌 Approach & Challenges  

### 🔍 **Approach**  
- Used **React components** to create a modular and reusable form structure.  
- Applied **recursion** to dynamically handle **nested sections**.  
- Utilized **React Hooks (`useState`, `useEffect`)** for state management.  
- Designed a **JSON schema** to define form structure dynamically.  
- Implemented **drag-and-drop** for better user experience.  

### 🚧 **Challenges Faced**  
1️⃣ **Recursive Form Rendering** – Handling nested sections dynamically without performance bottlenecks.  
2️⃣ **State Management** – Managing complex form data while maintaining reactivity.  
3️⃣ **Drag-and-Drop Integration** – Ensuring smooth reordering of form fields.  

---

## 📜 License  
This project is licensed under the **MIT License**.  
