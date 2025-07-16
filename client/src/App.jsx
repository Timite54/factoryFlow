import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/Salary/Add.jsx"
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import Summary from "./components/employeeDasshboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";


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
                <Route path={"/admin-dashboard/employees/salary/:id"} element={<ViewSalary />}></Route>

                 <Route path={"salary/add"} element={<AddSalary />}></Route>

                <Route path={"/admin-dashboard/leaves"} element={<AdminSummary />}></Route>
                 <Route path={"/admin-dashboard/settings"} element={<AdminSummary />}></Route>
            </Route>
            <Route path="/unauthorize" element={<UnauthorizedPage />} />

            <Route path="/employee-dashboard"
                   element={
                        <PrivateRoutes>
                            <RoleBaseRoutes requiredRole={["employee", "admin"]} >
                                <EmployeeDashboard/>
                            </RoleBaseRoutes>
                        </PrivateRoutes>
                   }
            >
                <Route index element={<Summary />}></Route>

                <Route path={"/employee-dashboard/profile/:id"} element={<View />}></Route>
                <Route path={"/employee-dashboard/leaves"} element={<LeaveList />}></Route>
                <Route path={"/employee-dashboard/add-leave"} element={<AddLeave />}></Route>
                <Route path={"/employee-dashboard/salary/:id"} element={<ViewSalary />}></Route>
                <Route path={"/employee-dashboard/settings"} element={<AdminSummary />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
