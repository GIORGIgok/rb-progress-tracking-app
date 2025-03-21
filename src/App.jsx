import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTasksPage from "./pages/all-tasks-page/all-tasks-page";
import TaskDetailedInfoPage from "./pages/task-detailed-info-page/task-detailed-info-page";
import Header from "./components/common/header/header";
import AddNewTaskPage from "./pages/add-new-task-page/add-new-task-page";
import { ModalProvider } from "./contexts/modal-context";
import { CreateEmployeeModal } from "./components/modals/create-employee-modal";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Header />
        <CreateEmployeeModal />
        <Routes>
          <Route path="/" element={<AllTasksPage />} />
          <Route
            path="/task-detailed-info/:id"
            element={<TaskDetailedInfoPage />}
          />
          <Route path="/add-new-task" element={<AddNewTaskPage />} />

          {/* Not Found Page */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-[#8338EC] text-[24px]">
                Page Not Found
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
