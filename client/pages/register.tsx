import { FormEvent, useState } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function Register () {

    const [uname, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [err, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(null)
    const [pw, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const router = useRouter();


    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();

        const user = {
            name: uname,
            email: mail,
            // phone: phone,
            password: pw
        }

        
        try {
            const uri = "http://localhost:5000/api/register";
            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(user)
            });

            const data = await response.json()
            if(data && data.err) {
                setError(true)
                setErrMsg(data.err)
                console.log("Check This Error", errMsg)
            } else if(data && data.message) {
                setError(false)
                // router.push('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <Layout>
            <div className="m-3 d-flex text-center">
            {err &&
            <div className="text-center">
                <p className="badge bg-warning">{errMsg}!</p>
            </div> 
            }
        <form onSubmit={handleSubmit} method="post">
            <div className="form-group mb-3 text-start">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="text" name="uname" className="form-control" required value={uname} minLength={3} maxLength={8} onChange={(ev) => setName(ev.target.value)} />
            </div>
            <div className="form-group mb-3 text-start">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" className="form-control" required value={mail} onChange={(ev) => setMail(ev.target.value)} />
            </div>
            <div className="form-group mb-3 text-start">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" required minLength={6} maxLength={100} className="form-control" value={pw} onChange={(ev) => setPassword(ev.target.value)}  />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-info justify-content-center align-content-center w-75">Submit</button>
            </div>
        </form>
            </div>
        </Layout>
        </>
    )
}

