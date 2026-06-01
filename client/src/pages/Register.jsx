import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

const Register = () => {

  const navigate =
    useNavigate();

  const [step,
    setStep] =
    useState(1);

  const [formData,
    setFormData] =
    useState({

      // Basic

      name: "",
      email: "",
      password: "",

      // Academic

      college: "",
      branch: "",
      year: "",

      // Skills

      skills: "",
      interests: "",
      experience: "",

      // Social

      github: "",
      linkedin: "",
      portfolio: "",
      bio: "",

    });



  /*
  =====================
  INPUT CHANGE
  =====================
  */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
        e.target.value,

      });

    };



  /*
  =====================
  NEXT STEP
  =====================
  */

  const nextStep =
    () => {

      setStep(
        step + 1
      );

    };



  /*
  =====================
  PREVIOUS STEP
  =====================
  */

  const prevStep =
    () => {

      setStep(
        step - 1
      );

    };



  /*
  =====================
  SUBMIT
  =====================
  */

  const handleSubmit =
    async () => {

      try {

        await axios.post(
          "http://localhost:5000/api/auth/register",
          {

            ...formData,

            skills:
              formData.skills
              .split(",")
              .map(
                skill =>
                skill.trim()
              ),

            interests:
              formData.interests
              .split(",")
              .map(
                item =>
                item.trim()
              ),

          }
        );

        navigate("/login");

      }

      catch(error){

        console.log(error);

      }

    };



  return (

<div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">

<div className="w-full max-w-[700px] bg-white/[0.03] border border-white/10 rounded-[32px] p-10">

{/* HEADER */}

<h1 className="text-4xl font-bold text-white">

Create Account

</h1>

<p className="text-slate-400 mt-2">

Step {step} of 4

</p>


{/* PROGRESS */}

<div className="w-full h-2 bg-white/10 rounded-full mt-6">

<div

className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"

style={{
width:`${step*25}%`
}}

></div>

</div>



{/* STEP 1 */}

{step===1 && (

<div className="space-y-5 mt-10">

<input
name="name"
placeholder="Full Name"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white outline-none"
/>

<input
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white outline-none"
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white outline-none"
/>

</div>

)}



{/* STEP 2 */}

{step===2 && (

<div className="space-y-5 mt-10">

<input
name="college"
placeholder="College"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<input
name="branch"
placeholder="Branch"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<select
name="year"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
>

<option value="">

Select Year

</option>

<option>

1st Year

</option>

<option>

2nd Year

</option>

<option>

3rd Year

</option>

<option>

4th Year

</option>

</select>

</div>

)}



{/* STEP 3 */}

{step===3 && (

<div className="space-y-5 mt-10">

<input
name="skills"
placeholder="React, Node, Python..."
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<input
name="interests"
placeholder="AI, Web Dev..."
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<select
name="experience"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
>

<option>

Beginner

</option>

<option>

Intermediate

</option>

<option>

Advanced

</option>

</select>

</div>

)}



{/* STEP 4 */}

{step===4 && (

<div className="space-y-5 mt-10">

<input
name="github"
placeholder="GitHub URL"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<input
name="linkedin"
placeholder="LinkedIn URL"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<input
name="portfolio"
placeholder="Portfolio URL"
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white"
/>

<textarea
name="bio"
placeholder="Tell us about yourself..."
onChange={handleChange}
className="w-full bg-white/[0.04] p-4 rounded-2xl text-white h-[120px]"
/>

</div>

)}



{/* BUTTONS */}

<div className="flex justify-between mt-10">

{step>1 && (

<button
onClick={prevStep}
className="px-6 py-3 rounded-2xl bg-white/10 text-white"
>

Back

</button>

)}

{step<4 ? (

<button
onClick={nextStep}
className="ml-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
>

Next

</button>

)

:

(

<button
onClick={handleSubmit}
className="ml-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
>

Create Account

</button>

)}

</div>


<div className="text-center mt-8 text-slate-400">

Already have an account?

<Link
to="/login"
className="text-purple-400 ml-2"
>

Login

</Link>

</div>

</div>

</div>

  );

};

export default Register;