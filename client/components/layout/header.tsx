import Link from "next/link";

export default function Header() {

  return (
    <>
      <nav className="nav navbar navbar-expand d-flex justify-content-between">
      <a href="#" className="navbar-brand align-content-start">
          <p className="h1 fw-bolder">SimbaStore</p>
        </a>
        <ul className="align-content-center">
          <li className="nav-item">
            <Link href="#" className="btn btn-outline-info">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="btn btn-outline-info">Cart</Link>
          </li>
          <li className="nav-item">
            <Link href="products" className="btn btn-outline-info">Products</Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="btn btn-outline-info">About</Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="btn btn-outline-info">Contact</Link>
          </li>
        </ul>
      </nav>
    <style>
      {`
      nav {
        min-width: 42rem;
        margin: 1.5rem auto;
      }
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }
      li {
        margin-right: 1rem;
        padding-right: 2rem;
      }
      li:nth-child(3) {
        margin-right: auto;
      }
      `}
    </style>
    </>
  )
}