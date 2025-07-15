import React, { useEffect, useRef, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import '../App.css';
const Manager = () => {
    const iconRef = useRef(null);
    const { register, reset, handleSubmit, formState:{errors} } = useForm({
        
        defaultValues: {
            website: '',
            username: '',
            password: '',
        }
    });
    const copyText = (text) => {
        toast.success('Copied to the Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

        navigator.clipboard.writeText(text)
    }
    
   const handleMouseEnter = () => {
        if (iconRef.current) {
            iconRef.current.setAttribute('trigger', 'loop');
        }
    };
    const handleMouseLeave = () => {
        if (iconRef.current) {
            iconRef.current.setAttribute('trigger', 'none');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswordArray = async () => {
        let r = await fetch('https://password-manager-backend-eta.vercel.app/');
        let data = await r.json();
        setpasswordArray(data);
    }

    useEffect(() => {
        getPasswordArray();
    }, []);

    const onSubmit = (data) => {
        setpasswordArray(() => [...passwordArray,{ ...data, id : uuidv4()}]);

        let req = fetch('https://password-manager-backend-eta.vercel.app/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, id: uuidv4() })
        });
        console.log(...passwordArray,{ ...data, id : uuidv4()});
        reset({ 
             website: '',
      username: '',
      password: ''}
        );
    };
    const onDel = async (id) => {
        let c = confirm("Do you really want to delete Password?")
        if(c){

           await fetch('https://password-manager-backend-eta.vercel.app/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
});

            setpasswordArray(() => [...passwordArray.filter(
                item=>item.id!=id
            )]);
            

             toast.success('Password Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        }
    };
    const onEdit = async (id) => {
         let c = confirm("Do you really want to Edit?")
        if(c){

    let obj = passwordArray.find(item=>item.id==id)
        reset({
      website: obj.website,
      username: obj.username,
      password: obj.password
    });
        setpasswordArray(() => [...passwordArray.filter(
                item=>item.id!=id
            )]);

          await fetch('https://password-manager-backend-eta.vercel.app/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
});
    getPasswordArray();
        }
    };
    
   
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="trendy-bg">

                <div className="glass-overlay">
                    <h1>Welcome to Pass681</h1>
                    <p>Manage your passwords securely and efficiently.</p>
                    <div className="input-container">
                        <input className='rounded' {...register("website",{required : { value: true, message: "Website Name Cannot be Empty" }}) } type="text" placeholder="Enter website/app" />
                       
                        <div className="inps">
                            <input className='rounded inp-size' {...register("username",{required : { value: true, message: "Username Cannot be Empty" }})} type="text" placeholder="Username" />
                        
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    className='rounded inp-size'
                                    {...register("password",{required : { value: true , message: "Password Cannot be Empty"} , minLength:{ value: 3, message: "Minimum Length of Password Should be atleast 3" }})}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    style={{ paddingRight: '2.2rem' }}
                                />




                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    style={{
                                        position: 'absolute',
                                        right: '0.7rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        zIndex: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        background: 'rgba(255,255,255,0.7)',
                                        borderRadius: '50%',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                        transition: 'background 0.2s',
                                        overflow: 'hidden',
                                    }}
                                    tabIndex={0}
                                >
                                    {showPassword ? (
                                        <lord-icon
                                            src="https://cdn.lordicon.com/dicvhxpz.json"
                                            trigger="hover"
                                        ></lord-icon>
                                    ) : (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                        <button
                            className="add-btn"
                            type='submit'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ color: "white" }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            <i className="fa-solid fa-plus" style={{ fontSize: '1.4rem', marginRight: '8px', verticalAlign: 'middle' }}></i>
                            Add Password
                        </button>
                      
                    </div>
                    {(errors.website || errors.username || errors.password) && (
  <div className="errors">
    <ul>
      {errors.website?.message && <li>{errors.website.message}</li>}
      {errors.username?.message && <li>{errors.username.message}</li>}
      {errors.password?.message && <li>{errors.password.message}</li>}
    </ul>
  </div>
)}
                </div>
                <table className='tbl'>
                    <thead>
                        <tr>
                            <th className='tblhead' >Website</th>
                            <th className='tblhead'>Username</th>
                            <th className='tblhead'>Password</th>
                            <th className='tblhead'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordArray.length === 0 && (
                            <tr>
                                <td className='no-data' colSpan={3}>No passwords saved yet!</td>
                            </tr>
                        )}
                        {

                            passwordArray.map((item, index) => (
                                <tr className='tblr' key={index}>

                                    <td><a href={item.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="website-link">{item.website}</a> <i onClick={() => copyText(item.website)} className="fa-solid fa-copy"></i></td>
                                    <td>{item.username} <i onClick={() => copyText(item.username)} className="fa-solid fa-copy"></i></td>
                                    <td>{"*".repeat(item.password.length)} <i onClick={() => copyText(item.password)} className="fa-solid fa-copy"></i></td>
                                    <td ><span>
                                        <i onClick={()=>onEdit(item.id)}  className="fa-solid fa-pen-to-square"></i></span>
                                        <span className='trash'>
                                            <i  onClick={()=>onDel(item.id)} className="fa-solid fa-trash"></i>
                                        </span>
                                        </td>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Manager
