import { useEffect, useState } from "react";
import Layout from "../../components/layout";

const Products = () => {

    const [prods, setProds] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        async function fetchProds() {
            const res = await fetch("http://localhost:8000/api/products/");
            if(!res.ok) {
                setErr(true)
            }
            const data = await res.json()
            setProds(data)    
            console.log("Alot happened here are prods",prods)        
        };
        fetchProds();
    }, [prods])
    return (
        <Layout>
            {err && <p>An Error Occurred!</p>}
            {prods && prods.length > 0 && prods.map((prod) => (
                <>
                <p>{prod.name}</p>
                </>
            )) }
        </Layout>
    );
}

export default Products;