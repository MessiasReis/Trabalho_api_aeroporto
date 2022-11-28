import { useState, useEffect } from "react";
import useApi from "./hooks/useApi";
import './App.css';

const App = () => {
    const api = useApi();

    const [aeroportos, setAeroportos] = useState([]);
    const [dataEdit,setDataEdit] = useState({});
    const [searching,setSearching] = useState(false);
    const [editing,setEditing] = useState(false);


    useEffect(() => {
        let request = true;
    
        if (request) onRead();
    
        return () => {
          request = false;
        }
      }, [setAeroportos]);
      
    
      const onRead = () => {
        api.get('aeroporto')
          .then(({ data }) => {
            setAeroportos(data);
            console.log(aeroportos);
          })
          .catch(err => console.log(err));
      }

      const onDelete = (codigo_iata) => {
        api.remove(`aeroporto/${codigo_iata}`)
          .then(({ response }) => {
            console.log(response);
            //onRead();
          })
          .catch(err => console.log(err));
      }

      const logPrint()


    return (
        <>
        <div>
          <body>
    <header>
        <h1 className="title">Aeroportos</h1>
    </header>
    <main>
        <div className="cadastro">
            <div className="container" >
                <h2>Cadastrar</h2>
                <div className="container2" > 
                    <form action="" className="frmCadastro" id="frmCadastro">
                        <div className="forminfo">
                            <label name="nome">ID:</label>
                            <input type="number" name="nome" id="id" placeholder="Insira o id do novo aeroporto" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="nome">Nome:</label>
                            <input type="text" name="nome" id="nome" placeholder="Insira o nome do novo aeroporto" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="iata">Código IATA:</label>
                            <input type="text" maxLength="3" name="iata" id="iata" placeholder="Insira o código iata" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="cidade">Cidade:</label>
                            <input type="text" name="cidade" id="cidade" placeholder="Insira a cidade" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="iso">Iso:</label>
                            <input type="text" maxLength="2" name="iso" id="iso" placeholder="Insira o código ISO" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="longitude">Longitude:</label>
                            <input type="number" name="longitude" id="longitude"  placeholder="Insira a longitude" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="latitude">Latitude:</label>
                            <input type="number" name="latitude" id="latitude" placeholder="Insira a latitude" required></input>
                        </div>
                        <div className="forminfo">
                            <label name="altitude">Altitude:</label>
                            <input type="number" name="altitude" id="altitude" placeholder="Insira a altitude" required></input>
                        </div>
                        <div className="forminfo">
                            <input type="submit" className='btn-send' name="btn-send" id="btn-send" value="Cadastrar"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div className="wrapper">
            <div>
                <div className="search">
                    <label name="site-search">Buscar aeroporto por IATA:</label>
                    <input type="search" id="site-search" name="iata-search"></input>
                    <button id="buscarBtn">Buscar</button>
                </div>
                <header className="toolbar">
                    <div>
                        <h4><span id="total-aeroportos"></span> aeroportos cadastrados</h4>
                    </div>

                </header>
                
                <div id="tabela">
                <table className="table-docs">
              <thead>
                <tr >
                  <th>ID Aeroporto</th>
                  <th>Nome Aeroporto</th>
                  <th>Cidade</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Altitude</th>
                  <th>Código País</th>
                  <th>Código IATA</th>
                  <th>Altitude</th>
                  <th>Editar</th>
                  <th>Deletar</th>


                </tr>
              </thead>
              
              <tbody>
                {aeroportos.map((value, index) => (
                  <tr className="tr-table" key={index}>
                    <td>{value.id_aeroporto}</td>
                    <td>{value.nome_aeroporto}</td>
                    <td>{value.cidade}</td>
                    <td>{value.latitude}</td>
                    <td>{value.longitude}</td>
                    <td>{value.altitude}</td>
                    <td>{value.codigo_pais_iso}</td>
                    <td>{value.codigo_iata}</td>
                    <td>{value.altitude}</td>
                    <td></td>
                    <td><button class="btn"  ><i class="fa fa-trash"></i></button></td>
                  </tr>
                ))
                }
              </tbody>
            </table>
                </div>
            </div>
        </div>
    </main>


</body>
</div>
        </>
    );
};

export default App;