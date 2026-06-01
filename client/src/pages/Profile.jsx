import {
useEffect,
useState
}
from "react";

import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

const Profile=()=>{

const token=
localStorage.getItem("token");

const [editMode,
setEditMode]=
useState(false);

const [user,
setUser]=
useState({});


/*
====================
FETCH PROFILE
====================
*/

useEffect(()=>{

const fetchProfile=
async()=>{

try{

const res=
await axios.get(

"http://localhost:5000/api/users/profile",

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

setUser(
res.data
);

}

catch(error){

console.log(error);

}

};

fetchProfile();

},[]);



/*
====================
UPDATE PROFILE
====================
*/

const handleSave=
async()=>{

try{

await axios.put(

"http://localhost:5000/api/users/profile",

user,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

setEditMode(false);

alert(
"Profile Updated"
);

}

catch(error){

console.log(error);

}

};



const handleChange=
(e)=>{

setUser({

...user,

[e.target.name]:
e.target.value

});

};



return(

<MainLayout>

<div className="max-w-5xl mx-auto">

<div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold text-white">

My Profile

</h1>

<p className="text-slate-400 mt-2">

Manage your profile

</p>

</div>


<button

onClick={()=>{

editMode
? handleSave()
: setEditMode(true)

}}

className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-2xl text-white"
>

{editMode
? "Save"
: "Edit"}

</button>

</div>



<div className="grid grid-cols-2 gap-6 mt-10">

{[
"name",
"college",
"branch",
"year",
"experience",
"github",
"linkedin",
"portfolio"
].map(field=>(

<div key={field}>

<label className="text-slate-400 text-sm">

{field}

</label>

<input

name={field}

value={
user[field]||""
}

onChange={
handleChange
}

disabled={
!editMode
}

className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-white"

>

</input>

</div>

))}

</div>



<div className="mt-6">

<label className="text-slate-400">

Bio

</label>

<textarea

name="bio"

value={
user.bio||""
}

onChange={
handleChange
}

disabled={
!editMode
}

className="w-full h-[120px] mt-2 bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-white"
/>

</div>

</div>

</div>

</MainLayout>

);

};

export default Profile;