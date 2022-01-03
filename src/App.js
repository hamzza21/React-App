//import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import Axios from "axios";


function App() {
  const [name,setName] = useState("");

  const [passion,setPassion] = useState("");
  const [hobby,setHobby] = useState("");
  const [year,setYear] = useState("");

  const [userList,setUserList] = useState([]);
  const [hobbiesList,setHobbiesList] = useState([]);

  const [userId,setUserId] = useState("");

  const addUser = () =>{
    Axios.post('http://localhost:3001/create',{
      name:name
    }).then(()=>{
      console.log("success");
      alert("User Added");
    });
  }

  const getUsers = () =>{
    Axios.get('http://localhost:3001/getUsers').then((response)=>{
      setUserList(response.data);
      console.log(userList);
      
    });

  }

  const getUserId = (id) =>{
    alert("My id is " + id);
  }

  const addUserHobby = () =>{
    if (userId != ""){
      Axios.post('http://localhost:3001/addUserHobby',{
        userid: userId,
        passion:passion,
        hobby: hobby,
        year : year
      }).then(()=>{
        console.log("success");
        alert("Hobby Added");
      });
    }
    else{
      alert("Please select user");
    }
    
  }

  const getUserHobbies = (id) =>{
    //console.log(id);
    
    setUserId(id);
    //alert("id: "+id + " userid: "+ userId);
    Axios.get(`http://localhost:3001/getUserHobbies/${id}`).then((response)=>{
      setHobbiesList(response.data);
    });

  }

  const deleteHobby = (id) =>{
    Axios.delete(`http://localhost:3001/deleteHobby/${id}`).then((response)=>{
      alert("Hobby Deleted");
    })

  }
  
  
  
  return (
    <div className="App">
      
      <div className='users'>
      
        <ul>
            <li>
              <input type="text" name="name" onChange={(event) => setName(event.target.value)}></input>
              <button onClick={addUser}>  Add Name</button>
              <button onClick={getUsers}>Show Users</button>
            </li>
        {userList.map((val,key)=>{
          return (
                <li className='list' onClick={() =>{
                  getUserHobbies(val.user_id)
                    }
                }><h2>{val.user_name}</h2></li>
          );
        })}
        </ul>
      </div>
      

      <div className="showHobbies">
        <table className='table'> 
          <tbody>
            <tr>
              
              <td><input type="text" name="hobby" placeholder="Enter Your Passion" onChange={(event) => setPassion(event.target.value)}></input></td>
              <td><input type="text" name="hobby" placeholder="Enter User Hobby" onChange={(event) => setHobby(event.target.value)}></input></td>
              <td><input type="text" name="year" placeholder="Enter Year" onChange={(event) => setYear(event.target.value)}></input></td>
              <td><button onClick={addUserHobby}>Add </button></td>
            </tr>
          {hobbiesList.map((val,key)=>{
                    return(
                      <tr>
                        <td>{val.passion}</td>
                        <td>{val.hobby_name}</td>
                        <td>{val.enter_year}</td>
                        <td><button onClick={() =>{
                            deleteHobby(val.hobby_id)
                            }
                          } >delete</button></td>
                      </tr>
                    );
                  })}
                
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
