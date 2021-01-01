import { Route, Routes} from "react-router-dom";
import Dashboard from '../../../pages/Dashboard'
import Admin from '../../../pages/Admin'
import Guest from '../../../pages/Guest'
import Report from '../../../pages/Report'
import AdminEdit from "../../../pages/AdminEdit";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:id" element={<AdminEdit/>} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/report" element={<Report />} />
        </Routes>
    )
};

export default AppRoute;

