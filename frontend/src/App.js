import { Routes, Route } from "react-router-dom";
import EditForm from "./components/EditForm";
import FormDetails from "./components/FormDetails";
import CreateForm from "./components/CreateForm";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
        <Route path="/form/:id" element={<FormDetails />} />
        
       
      </Routes>
    </>
  );
}

export default App;
