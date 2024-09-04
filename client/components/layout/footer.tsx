import { useEffect, useState } from "react";

const Footer = () => {
  const [time,setTime] = useState("");

  useEffect(()=> {
    setTime(new Date().toLocaleTimeString())
  }, [])
  return (
    <footer className="d-flex justify-content-center flex-column text-white fs-6 fixed-bottom">
      <div className="heraty">
        Made with <p className="heart">&#9829;</p>
        <small className="fw-bolder me-2">
          &copy; {time}
        </small>
      </div>
      <style>{`
            footer {
                background: inherit;
                text-align: center;
                color: black;
                justify-content: center;
                align-items: center;
            }
            p.heart {
                color: crimson;
                font-weight: 900;
                margin: 0px 5px;
            }
            div.heraty {
                display: flex;   
                font-family: Lato;
            }
        `}</style>
    </footer>
  );
};

export default Footer;
