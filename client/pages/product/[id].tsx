import { GetStaticProps, GetStaticPaths } from "next";
import RestrauntPage from "../../components/restrauntComponents/restrauntPage";

export interface IRestraunt {
    id: number;
    name: string;
    price: number;
    url: string;
}

export interface IProps {
    restraunt: IRestraunt
  }


export const getStaticPaths: GetStaticPaths = async() => {
    const URI = `http://localhost:8000/api/products/`;
    const response = await fetch(URI);
    const products = await response.json();
    const paths = products.map((data: IRestraunt) => ({
      params: { 
        id: String(data)
      }
    }));
    return {
      paths,
      fallback: "blocking", // true
    };  
}

export const getStaticProps: GetStaticProps = async (params) => {
    let arr = new Array();
    arr.push(params);

    const URI = `http://localhost:8000/api/products/${arr[0].params.id}/`;
    const response = await fetch(URI);
    const prod = await response.json(); 
    return { 
      props :{ restraunt: prod }, 
   };  
}

export default function restaunt( { restraunt } : IProps) {
    return <RestrauntPage restraunt={restraunt} />
  }

