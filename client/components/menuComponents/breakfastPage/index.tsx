import { useEffect, useState } from "react";
import { IBreakfast } from "../../../pages/menu/breakfast";
import { useRouter } from "next/router";
import Head from "next/head";

interface IProps {
    restraunt: IBreakfast
}



export default function BreakfastPage () {

    const [error, setError] = useState(false);


    useEffect(() => {
        console.log("This works!")
    }, []);


    return (
        <>

        {error && (
            <h1>Some Error Occurred</h1>
        )};
        <Head>
            <title>Good Morning | Snacks, Juices, Tea</title>
        </Head>

        <h1>Hello World</h1>
        </>
    )

}