import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeDashboard from "./pages/EmployeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin-dashboard" element=
                {<PrivateRoutes>
                    <RoleBaseRoutes requiredRole={["admin"]} >
                        <AdminDashboard/>
                    </RoleBaseRoutes>
                </PrivateRoutes>
            }>
                 <Route index element={<AdminSummary />}></Route>

                 <Route path={"/admin-dashboard/departments"} element={<DepartmentList />}></Route>
                 <Route path={"/admin-dashboard/add-department"} element={<AddDepartment />}></Route>
                 <Route path={"/admin-dashboard/department/:id"} element={<EditDepartment />}></Route>

                <Route path={"/admin-dashboard/employees"} element={<List />}></Route>
                <Route path={"/admin-dashboard/add-employee"} element={<Add />}></Route>
                <Route path={"/admin-dashboard/employee/:id"} element={<View />}></Route>
                <Route path={"/admin-dashboard/employee/edit/:id"} element={<Edit />}></Route>

                 <Route path={"/admin-dashboard/leaves"} element={<AdminSummary />}></Route>
                 <Route path={"/admin-dashboard/salary"} element={<AdminSummary />}></Route>
                 <Route path={"/admin-dashboard/settings"} element={<AdminSummary />}></Route>
            </Route>
            <Route path="/unauthorize" element={<UnauthorizedPage />} />
            <Route path="/employe-dashboard" element={<EmployeDashboard />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
