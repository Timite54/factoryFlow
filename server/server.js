import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import dbConnexion from "./db/dbConnexion.js";
import departmentRouter  from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";

dbConnexion()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);

app.use('/api/employee', employeeRouter )

app.use('/api/salary', salaryRouter )



const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});