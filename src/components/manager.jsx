  import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function manager() {
  const [form, setform] = useState({ site: "", user: "", pass: "" });
  const [pws, setpws] = useState([]);
  const getpasswd =async ()=>{
    const pwd =await fetch("http://localhost:3000");
  const pass = await pwd.json();
  console.log(pass);
  setpws(pass);
  }
  
  useEffect(() => {
     getpasswd();
  }, []);
  const Password = async () => {
    if (!form.site || !form.user || !form.pass) {
    toast.error("All fields are required!");
    return;
  }
     const newEntry = { ...form, id: uuidv4() };
     const updatedPws = [...pws, newEntry];
     setpws(updatedPws);
     let pass = await fetch("http://localhost:3000", {method:"POST" ,headers: {"Content-Type" : "application/json"},body: JSON.stringify({...form, id: uuidv4()})})
     //  localStorage.setItem("Password", JSON.stringify(updatedPws));
    //  console.log(updatedPws);

     setform({site: "", user: "", pass: ""});
     

  };
const deleteUser =async (id)=>{
 console.log("delte hai" + id);
 let c = confirm("DO YOU REALLY WANT TO DELETE YOUR PASSWORD ")
 if(c){
 setpws(pws.filter(items=>items.id!=id));
//  localStorage.setItem("Password", JSON.stringify(pws.filter(items=>items.id!=id)))
    let pass = await fetch("http://localhost:3000", {method:"DELETE" ,headers: {"Content-Type" : "application/json"},body: JSON.stringify({...form, id})})
 }

}
const editUser = (id)=>{
 console.log("eidt hai" + id);
 setform(pws.filter(items=>items.id===id)[0]);
 setpws(pws.filter(items=>items.id!=id));

}
  const Handle = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copy = (item) => {
    // alert("Copied To Clipboard " + item);
    navigator.clipboard.writeText(item);
    toast.success("Copied " + item + " !");
  };
  return (
    <>
     <ToastContainer position="top-center" autoClose={1500} />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="container max-w-[60rem] mx-auto bg-red-600 mt-15">
        <h1 className="flex justify-center">PASSWORD MANAGER</h1>
        <div>
          <input
            className="bg-white w-full rounded-4xl border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
            value={form.site}
            placeholder="Enter The  Website Name"
            onChange={Handle}
            type="text"
            name="site"
          />
        </div>
        <div className="pt-8 gap-4 flex w-full justify-between">
          <input
            className="bg-white rounded-4xl w-50 border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
            value={form.user}
            placeholder="Enter Username"
            onChange={Handle}
            type="text"
            name="user"
          />
          <input
            className="bg-white rounded-4xl w-50 border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
            value={form.pass}
            placeholder="Enter Password"
            onChange={Handle}
            type="password"
            name="pass"
          />
        </div>
        <div className="justify-center flex mt-8 items-center  bg-amber-950 ">
          <button
            onClick={Password}
            className="bg-amber-200 flex rounded-full items-center px-2 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="mt-10 relative overflow-auto">
          {pws.length === 0 && (
              <div className="text-white bg-amber-950 overflow-x-auto max-w-full">NO Password To Show</div>
            )}
          <table className="table-auto mx-auto bg-amber-950 w-full border-collapse">
            
            {pws.length != 0 && (
              <>
                <thead className="border-2 border-amber-200">
                  <tr className="text-center text-white">
                    <th className="px-4 py-2 border-2">SITE NAME</th>
                    <th className="px-4 py-2 border-2">USERNAME</th>
                    <th className="px-4 py-2 border-2">PASSWORDS</th>
                    <th className="px-4 py-2 border-2">ACTIONS</th>
                  </tr>
                </thead>

                <tbody className="text-center text-white">
                  {pws.map((items, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-2 ">
                        <div className="flex items-center justify-between gap-2">
                          {items.site}
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => copy(items.site)}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2 ">
                        <div className="flex items-center justify-between gap-2">
                          {items.user}
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => copy(items.user)}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2">
                        <div className="flex items-center justify-between gap-2">
                          {items.pass}
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => {copy(items.pass);
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2">
                        <div className="flex items-center invert justify-center gap-2">
                          <span><lord-icon onClick={()=>{
                            editUser(items.id);
                          }}
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                          </span>
                          <span>
                            <lord-icon onClick={()=>{
                            deleteUser(items.id);
                          }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default manager;
