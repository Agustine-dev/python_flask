import { FormEvent, useState } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function Login() {
  const [uname, setName] = useState("");
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    const user = {
      name: uname,
      password: password,
    };
    try {
      const uri = "http://localhost:5000/api/login";
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data && data.err) {
        setError(true);
        setErrMsg(data.err);
        console.log("Check This Error", errMsg);
      } else if (data && data.message) {
        setError(false);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="m-3 d-flex text-center flex-column">
          {err && (
            <div className="text-center">
              <p className="badge bg-warning fs-2">{errMsg}!</p>
            </div>
          )}
          <div className="form-container">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group mb-3 text-start">
                <label htmlFor="name" className="form-label">
                  Username/E-mail
                </label>
                <input
                  type="text"
                  name="uname"
                  className="form-control"
                  required
                  value={uname}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div className="form-group mb-3 text-start">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  minLength={6}
                  maxLength={100}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-info justify-content-center align-content-center w-75"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
