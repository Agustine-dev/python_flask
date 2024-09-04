import { useEffect, useState } from "react";
import Image from "next/image";
import { IRestraunt } from "../../../pages/product/[id]";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../layout";


interface IProps {
    restraunt: IRestraunt
}


export default function RestrauntPage ({ restraunt }: IProps) {

    const [error, setError] = useState(false);

    return (
        <>

        {error && (
            <h1>Some Error Occurred</h1>
        )}
        <Head>
            <title>{restraunt.name}</title>
        </Head>
        <Layout>
        <div className="container text-danger">
            <div className="card">
            <div className="card-body">
            <div className="card-title">{restraunt.name}</div>
            <p className="card-text fst-italic">{restraunt.price}</p>
                <Image src={restraunt.url || ""} height={200} width={200} alt={restraunt.name} />
            </div>            
            </div>            
        </div>
        </Layout>
        </>
    )

}