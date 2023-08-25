import React from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import Entrega, { EntregaProps } from "../components/Entrega";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiURL = "/api/completedFeed";

const Completed: React.FC = () => {
  const { data, error } = useSWR(apiURL, fetcher);

  if (error) return <div>Error al cargar</div>;
  if (!data) return <div>Cargando...</div>;
  const count = data.length;

  return (
    <Layout count={count}>
      {data.map((entrega: EntregaProps) => (
        <div className="py-4" key={entrega.id}>
          <Entrega entrega={entrega} fetchURL={apiURL} />
        </div>
      ))}
    </Layout>
  );
};

export default Completed;
