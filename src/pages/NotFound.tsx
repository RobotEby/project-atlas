import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-context-menu";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Error 404: The user attempted to access a route that does not exist:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Parece que você tentou acessar um caminho que não existe por aqui.
          Este portfólio foi criado apenas para demonstrar minhas habilidades
          <Separator />
          com frontend, então alguns links podem não levar a lugar nenhum.
        </p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
