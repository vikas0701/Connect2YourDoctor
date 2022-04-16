import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ChangePasswordPatient(){
    const [login, setLogin] = useState({});
    const navigate = useNavigate();
    const [data,setData] = useState({
        currentpass:"",
        newpass:"",
        confirmpass:"",
        passerror:""
    });

    useEffect(() => {
        let pat= JSON.parse(sessionStorage.getItem("patientdetails"));
        console.log(pat.login_id);
        setLogin(pat.login_id)
    },[]);

    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        //console.log(e.target.name+" "+e.target.value)
    }

    const logout=()=>{
        sessionStorage.removeItem("patientdetails");
        navigate("/");
    }

    const submitData=(e)=>
    {
        //console.log(login.user_name+" "+login.user_type);
        e.preventDefault();
        if(data.currentpass === data.newpass)
        {
            setData({passerror : "Current password and new password are same.. Please enter new password"})
        }
        else if(data.newpass === data.confirmpass)
        {
            setData({passerror : ""})
            if(login.password === data.currentpass)
            {
                const reqOptions ={
                    method : 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        loginId:login.loginId,
                        password: data.newpass,
                        status: login.status,
                        userName: login.userName,
                        userType: login.userType
                    })
                }
                fetch("http://localhost:8080/updateuser",reqOptions)
                .then(resp=>resp.text())
                .then(data=> {if(data.length != 0)
                    {
                        alert("Password Changed!");
                        navigate('/login');
                    }
                    else{
                        alert("Password Not Changed");
                        navigate('/changepasswordpatient');
                    }
                })
            }
            else
            {
                alert("Current password is wrong.. Please try again")
            }
        }
        else
        {
            setData({passerror : "New password and confirm password should be same.."})
        }
    }

    return(
        <div className="container container-fluid">
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patientdashboard")}>Go Back</button> 
            <br/><br/>
            <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2 className='text-center'>Change Password</h2>

                <form >
                    
                    <div className = "form-group">
                        <label>Current Password: </label>
                        <input type="password" placeholder="Current Password" name="currentpass" className="form-control" 
                            value={data.currentpass} onChange={changeHandler}/>
                            
                    </div >

                    <div className = "form-group">
                        <label>New Password: </label>
                        <input type="password" placeholder="New Password" name="newpass" className="form-control" 
                            value={data.newpass} onChange={changeHandler}/>
                            
                    </div >

                    <div className = "form-group">
                        <label>Confirm Password: </label>
                        <input type="password" placeholder="Confirm Password" name="confirmpass" className="form-control" 
                            value={data.confirmpass} onChange={changeHandler}/>
                            
                    </div >
                    <div style={{marginTop: "10px", marginLeft:"180px"}}>
                    <button className="btn btn-success" onClick={submitData}>CHANGE</button>
                    <button className="btn btn-danger" onClick={() => navigate("/patientdashboard")} style={{marginLeft: "10px"}}>Cancel</button> 
                    </div>

                </form>
                <span className="text-danger">
                    {data.passerror}
                </span>
                </div>
                </div>
             </div>
        </div>
    );
}

export default ChangePasswordPatient;