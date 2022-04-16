import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function PatientAppointmenthHistory(){
    const navigate = useNavigate();
    const [patientId,setPatientId]=useState("");
    const [appointments,setAppointments]=useState([]);

    useEffect(() => {
        let pat= JSON.parse(sessionStorage.getItem("patientdetails"));
        console.log(pat);
        setPatientId(pat.patientId);
    },[]);

    const logout=()=>{
        sessionStorage.removeItem("patientdetails");
        navigate("/");
    }

    const appointmenthistory = () => {
        console.log(patientId);
        fetch("http://localhost:8080/getappointmenthistorybypatientid/"+patientId)
        .then(r => r.json())
        .then(d => {console.log(d); setAppointments(d)})
    }

    return(
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patientdashboard")}>Go Back</button> 
        <br></br>                 
        <div>
                    <button className="btn btn-primary" onClick={appointmenthistory}>Show Appointment History</button>
                    <h3>Patient Appointment List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Appointment Type</th>
                            <th>Appointment Status</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>

                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((v) => {
                            return (
                                <tr>
                                    <td>{v.appointmentDate}</td>
                                    <td>{v.appointmentTime}</td>
                                    <td>{v.appointmentType}</td>
                                    <td style={{ display: v.status === 'cancelled' ? 'block' : 'none' }}>{v.status}</td>
                                    <td style={{ display: v.status === 'scheduled' ? 'block' : 'none' }}>success</td>
                                    <td>{v.doctor_id.firstName} {v.doctor_id.lastName}</td>
                                    <td>{v.doctor_id.speciality}</td>


                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
        </div>
        </div>
    );
}

export default PatientAppointmenthHistory;