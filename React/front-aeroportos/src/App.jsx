import { useState, useEffect } from "react";
import useApi from "./hooks/useApi";
import './App.css';

const App = () => {
  const api = useApi();

  const [aeroportos, setAeroportos] = useState([]);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [id_aeroporto, setIdAeroporto] = useState("");
  const [nome_aeroporto, setNomeAeroporto] = useState("");
  const [codigo_iata, setCodigoIata] = useState("");
  const [cidade, setCidade] = useState("");
  const [codigo_pais_iso, setCodigoPaisIso] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");


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
        onRead();
      })
      .catch(err => console.log(err));
  }

  const onEdit = (airport) => {
    setEditing(true);
    setIdAeroporto(airport.id_aeroporto);
    setNomeAeroporto(airport.nome_aeroporto);
    setCodigoIata(airport.codigo_iata);
    setCidade(airport.cidade);
    setCodigoPaisIso(airport.codigo_pais_iso);
    setLatitude(airport.latitude);
    setLongitude(airport.longitude);
    setAltitude(airport.altitude);
  }

  const handleSearch = () => {
    if (searching) {
      document.getElementById("site-search").value = ''
      setSearching(false);
      onRead();
    } else {
      let cdIata = document.getElementById("site-search").value
      if (cdIata === '') {
        alert('O campo de busca não pode estar vazio...')
      } else {
        setSearching(true);
        api.get(`aeroporto/${cdIata}`)
          .then(({ data }) => {
            setAeroportos([data]);
          })
          .catch(err => console.log(err));
      }
    }
  }

  const onSubmit = () => {
    const formData = {
      "id_aeroporto": document.getElementById("id").value,
      "nome_aeroporto": document.getElementById("nome").value,
      "codigo_iata": document.getElementById("iata").value,
      "cidade": document.getElementById("cidade").value,
      "codigo_pais_iso": document.getElementById("iso").value,
      "latitude": document.getElementById("latitude").value,
      "longitude": document.getElementById("longitude").value,
      "altitude": document.getElementById("altitude").value
    };
    if (editing) {
      api.put(`aeroporto/${formData.codigo_iata}`, { ...formData })
        .then(({ data, response }) => {
          if (response.status === 200) {
            setEditing(false);
            alert('Atualizado com sucesso');
            onRead();
          }
        })
        .catch(err => console.log(err));
    } else {
      api.post('aeroporto', { ...formData })
        .then(({ data, response }) => {
          if (response.status === 200) {
            setEditing(false);
            alert('Inserido com sucesso');
            onRead();
          }
        })
        .catch(err => console.log(err));
    }
  }



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
                <h2>{editing ? `Editando ${codigo_iata} ` : 'Cadastrar'}</h2>
                <div className="container2" >
                  <form action="" className="frmCadastro" id="frmCadastro">
                    <div className="forminfo">
                      <label name="nome">ID:</label>
                      <input type="number" name="nome" id="id" value={id_aeroporto}
                        onChange={(e) => setIdAeroporto(e.target.value)}
                        placeholder="Insira o id do novo aeroporto" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="nome">Nome:</label>
                      <input type="text" name="nome" id="nome" value={nome_aeroporto}
                        onChange={(e) => setNomeAeroporto(e.target.value)}
                        placeholder="Insira o nome do novo aeroporto" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="iata">Código IATA:</label>
                      <input type="text" maxLength="3" name="iata" id="iata" value={codigo_iata}
                        onChange={(e) => setCodigoIata(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                        placeholder="Insira o código iata" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="cidade">Cidade:</label>
                      <input type="text" name="cidade" id="cidade" value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Insira a cidade" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="iso">Iso:</label>
                      <input type="text" name="iso" id="iso" value={codigo_pais_iso}
                        onChange={(e) => setCodigoPaisIso(e.target.value)}
                        placeholder="Insira o código ISO" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="longitude">Longitude:</label>
                      <input type="number" name="longitude" id="longitude" value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Insira a longitude" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="latitude">Latitude:</label>
                      <input type="number" name="latitude" id="latitude" value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Insira a latitude" required></input>
                    </div>
                    <div className="forminfo">
                      <label name="altitude">Altitude:</label>
                      <input type="number" name="altitude" id="altitude" value={altitude}
                        onChange={(e) => setAltitude(e.target.value)}
                        placeholder="Insira a altitude" required></input>
                    </div>
                    <div className="forminfo">
                      <button className='btn-send' name="btn-send" id="btn-send" onClick={() => { onSubmit() }} >{editing ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>


            <div className="wrapper">
              <div>
                <div className="search">
                  <label name="site-search">Buscar aeroporto por IATA:</label>
                  <input type="text" maxLength="3" id="site-search" name="iata-search" onEmptied={() => { }}></input>
                  <button id="buscarBtn" onClick={() => handleSearch()}>{searching ? 'Limpar Busca' : 'Buscar'}</button>
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
                          <td><button className="btn-edit" onClick={() => { onEdit(value) }} ><i class="fa fa-pencil-square-o"></i></button></td>
                          <td><button className="btn-delete" onClick={() => { onDelete(value.codigo_iata) }}  ><i class="fa fa-trash"></i></button></td>
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