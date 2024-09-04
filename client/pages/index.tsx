import React, { useEffect, useState } from "react"
import Layout from "../components/layout";
import Image from "next/image";
import Link from "next/link"

const Home = () => {

  const [data, setData] = useState('');
  const [err, setErr] = useState('')
  
  return (
    <>
    <Layout>
      <div className="container row row-cols-sm-4 row-cols-lg-3 row-cols-xl-1">
        <div className="col-sm-6">
        <Link href="products" className="shadow card text-white m-1 rounded rounded-3">
        <Image className="card-img" src={"/hanson.jpg"} height={200} width={200} alt="hello world"/>
          <div className="card-img-overlay">
          <h1 className="card-title">Hello World</h1>
          <p className="card-text">Opening text for wider content</p>
          </div>
        </Link>
        </div>
        <div className="col-sm-6">
        <Link href="#" className="shadow card text-white m-1 rounded rounded-3">
        <Image className="card-img" src={"/hanson.jpg"} height={200} width={200} alt="hello world"/>
          <div className="card-img-overlay">
          <h1 className="card-title">Hello World</h1>
          <p className="card-text">Opening text for wider content</p>
          </div>
        </Link>
        </div>
        <div className="col-sm-6">
        <Link href="#" className="shadow card text-white m-1 rounded rounded-3">
        <Image className="card-img" src={"/hanson.jpg"} height={200} width={200} alt="hello world"/>
          <div className="card-img-overlay">
          <h1 className="card-title">Hello World</h1>
          <p className="card-text">Opening text for wider content</p>
          </div>
        </Link>
        </div>

      </div>
    </Layout>
    <style>
      {`
      .shadow.card.text-white.m-1.rounded.rounded-3:hover {
        opacity: 25%;
        color: black;
        transition: .6s;
      }
      .card {
        text-align: center
      }
      h1.card-title {
        opacity: 100!important;
        color: black!important;
      }
      `}
    </style>
    </>
  )
}

export default Home;