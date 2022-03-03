import React, { Component } from 'react';

class App extends Component {     //Creo un componente

    constructor(){
        super(); //Super es un metodo y hereda todas las funcionalidades que nos da el componente constructor
        this.state = {
            cedula: " ",
            nombre: " ",
            supervisor: " ",
            cuota: " ",
            mes_de_Cuota: " ",
            porcentaje: " ",
            valor_Pagado: " ",
            valor_Causado_no_Pagado: " ",
            valor_Total_Ejecutado: " ",
            valor_Saldo_por_Ejecutar: " ",
            no_Planilla: " ",
            mes_de_Planilla: " ",
            numero_de_Pago: " ",
            tipo_de_Cuenta: " ",
            no_Cuenta: " ",
            banco: " ",
            dia_de_la_Transaccion: " ", 
            mes_de_la_Transaccion: " ", 
            dia_del_Proximo_Informe: " ",  
            mes_del_Proximo_Informe: " ",
            obligación_1: " ",
            obligación_2: " ",
            obligación_3: " ",
            obligación_4: " ",
            obligación_5: " ",
            obligación_6: " ",
            obligación_7: " ",
            obligación_8: " ",
            obligación_9: " ", 
            obligación_10: " ",
            contractors: [],
            _id: "1"
        };
        this.handleChange = this.handleChange.bind(this);
        this.addContractor = this.addContractor.bind(this);
    }

    addContractor(e){ //Evento del boton 
        if(this.state._id==1){
            fetch('/api/contactors', {    //fetch es un evento para poder enviar una petición http a mi servidor
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }) 
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Contractor Save'});
                this.setState({cedula: " ", nombre: " ", supervisor: " ", cuota: " ",  mes_de_Cuota: " ", porcentaje: " ", valor_Pagado: " ", valor_Causado_no_Pagado: " ", valor_Total_Ejecutado: " ", valor_Saldo_por_Ejecutar: " ", no_Planilla: " ", mes_de_Planilla: " ", numero_de_Pago: " ", tipo_de_Cuenta: " ", no_Cuenta: " ", banco: " ", dia_de_la_Transaccion: " ", mes_de_la_Transaccion: " ", dia_del_Proximo_Informe: " ",  mes_del_Proximo_Informe: " ", obligación_1: " ",  obligación_2: " ", obligación_3: " ", obligación_4: " ", obligación_5: " ", obligación_6: " ", obligación_7: " ", obligación_8: " ", obligación_9: " ", obligación_10: " "});
                this.fetchContractor();
            })
            .catch(err => console.log(err));
        }else{
            fetch(`/api/contactors/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Contractor Update'});
                this.setState({cedula: " ", nombre: " ", supervisor: " ", cuota: " ",  mes_de_Cuota: " ", _id: " ", porcentaje: " ", valor_Pagado: " ", valor_Causado_no_Pagado: " ", valor_Total_Ejecutado: " ", valor_Saldo_por_Ejecutar: " ", no_Planilla: " ", mes_de_Planilla: " ", numero_de_Pago: " ", tipo_de_Cuenta: " ", no_Cuenta: " ", banco: " ", dia_de_la_Transaccion: " ", mes_de_la_Transaccion: " ", dia_del_Proximo_Informe: " ",  mes_del_Proximo_Informe: " ", obligación_1: " ",  obligación_2: " ", obligación_3: " ", obligación_4: " ", obligación_5: " ", obligación_6: " ", obligación_7: " ", obligación_8: " ", obligación_9: " ", obligación_10: " "});
                this.fetchContractor();
            });
        }

        e.preventDefault(); //Evento para que no se reinicie la pagina cuando se adiere algo al formulario
    }

    componentDidMount(){
        this.fetchContractor();
    }

    fetchContractor(){
        fetch('/api/contactors')    //fetch es un evento para poder enviar una petición http a mi servidor
            .then(res => res.json())
            .then(data => {
                this.setState({contractors: data});
                console.log(this.state.contractors);
            });
    }

    editContractor(id){
        fetch(`/api/contactors/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    cedula: data.cedula,
                    nombre: data.nombre,
                    supervisor: data.supervisor,
                    cuota: data.cuota,
                    mes_de_Cuota: data.mes_de_Cuota,
                    porcentaje: data.porcentaje,
                    valor_Pagado: data.valor_Pagado,
                    valor_Causado_no_Pagado: data.valor_Causado_no_Pagado,
                    valor_Total_Ejecutado: data.valor_Total_Ejecutado,
                    valor_Saldo_por_Ejecutar: data.valor_Saldo_por_Ejecutar,
                    no_Planilla: data.no_Planilla,
                    mes_de_Planilla: data.mes_de_Planilla,
                    numero_de_Pago: data.numero_de_Pago,
                    tipo_de_Cuenta: data.tipo_de_Cuenta,
                    no_Cuenta: data.no_Cuenta,
                    banco: data.banco,
                    dia_de_la_Transaccion: data.dia_de_la_Transaccion, 
                    mes_de_la_Transaccion: data.mes_de_la_Transaccion, 
                    dia_del_Proximo_Informe: data.dia_del_Proximo_Informe,
                    mes_del_Proximo_Informe: data.mes_del_Proximo_Informe,
                    obligación_1: data.obligación_1,
                    obligación_2: data.obligación_2,
                    obligación_3: data.obligación_3,
                    obligación_4: data.obligación_4,
                    obligación_5: data.obligación_5,
                    obligación_6: data.obligación_6,
                    obligación_7: data.obligación_7,
                    obligación_8: data.obligación_8,
                    obligación_9: data.obligación_9,
                    obligación_10: data.obligación_10,
                    _id: data._id
                })
            });
    }

    deleteContractor(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch('/api/contactors/' + id, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Contractor Delete'});
                this.fetchContractor();
            });
        }
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="cyan darken-3">
                    <div className="container">
                        <a className="brand-logo" href="/">CUENTAS DE COBRO CONTRATISTAS</a>
                    </div>
                </nav>
                {/* FORMULARIO */}
                <div className="container">
                    <div className="row">
                        <div className="col s7">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addContractor}> 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Cedula Contratistas</small></p>
                                                    <input name="cedula" onChange={this.handleChange} type="text" placeholder="Cedula Contratista" value={this.state.cedula}/>
                                                </th>
                                                <th>
                                                    <p><small>Nombre Contratistas</small></p>
                                                    <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre Contratista" value={this.state.nombre}/>
                                                </th>
                                                <th>
                                                    <p><small>Cuota</small></p>
                                                    <input name="cuota" onChange={this.handleChange} type="text" placeholder="Cuota" value={this.state.cuota}/>
                                                </th>
                                                <th>
                                                    <p><small>Mes Cuota</small></p>
                                                    <input name="mes_de_Cuota" onChange={this.handleChange} type="text" placeholder="mes_de_Cuota" value={this.state.mes_de_Cuota}/>
                                                </th>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Porcentaje de Avance</small></p>
                                                    <input name="porcentaje" onChange={this.handleChange} type="text" placeholder="Porcentaje" value={this.state.porcentaje}/>
                                                </th>
                                                <th>
                                                    <p><small>Valor Pagado al contratista</small></p>
                                                    <input name="valor_Pagado" onChange={this.handleChange} type="text" placeholder="valor_Pagado" value={this.state.valor_Pagado}/>
                                                </th>
                                                <th>
                                                    <p><small>Valor causado No pagado</small></p>
                                                    <input name="valor_Causado_no_Pagado" onChange={this.handleChange} type="text" placeholder="valor_Causado_no_Pagado" value={this.state.valor_Causado_no_Pagado}/>
                                                </th>
                                                <th>
                                                    <p><small>Valor Total Ejecutado</small></p>
                                                    <input name="valor_Total_Ejecutado" onChange={this.handleChange} type="text" placeholder="valor_Total_Ejecutado" value={this.state.valor_Total_Ejecutado}/>
                                                </th>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Saldo por Ejecutar</small></p>
                                                    <input name="valor_Saldo_por_Ejecutar" onChange={this.handleChange} type="text" placeholder="valor_Saldo_por_Ejecutar" value={this.state.valor_Saldo_por_Ejecutar}/>
                                                </th>
                                                <th>
                                                    <p><small>No. Planilla</small></p>
                                                    <input name="no_Planilla" onChange={this.handleChange} type="text" placeholder="no_Planilla" value={this.state.no_Planilla}/>
                                                </th>
                                                <th>
                                                    <p><small>Mes de Planilla</small></p>
                                                    <input name="mes_de_Planilla" onChange={this.handleChange} type="text" placeholder="mes_de_Planilla" value={this.state.mes_de_Planilla}/>
                                                </th>
                                                <th>
                                                    <p><small>Número de Pago</small></p>
                                                    <input name="numero_de_Pago" onChange={this.handleChange} type="text" placeholder="numero_de_Pago" value={this.state.numero_de_Pago}/>
                                                </th>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Tipo de Cuenta</small></p>
                                                    <input name="tipo_de_Cuenta" onChange={this.handleChange} type="text" placeholder="tipo_de_Cuenta" value={this.state.tipo_de_Cuenta}/>
                                                </th>
                                                <th>
                                                    <p><small>No. de Cuenta</small></p>
                                                    <input name="no_Cuenta" onChange={this.handleChange} type="text" placeholder="no_Cuenta" value={this.state.no_Cuenta}/>
                                                </th>
                                                <th>
                                                    <p><small>Banco</small></p>
                                                    <input name="banco" onChange={this.handleChange} type="text" placeholder="banco" value={this.state.banco}/>
                                                </th>
                                                <th>
                                                    <p><small>Día Transacción</small></p>
                                                    <input name="dia_de_la_Transaccion" onChange={this.handleChange} type="text" placeholder="dia_de_la_Transaccion" value={this.state.dia_de_la_Transaccion}/>
                                                </th>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Mes Transacción</small></p>
                                                    <input name="mes_de_la_Transaccion" onChange={this.handleChange} type="text" placeholder="mes_de_la_Transaccion" value={this.state.mes_de_la_Transaccion}/>
                                                </th>
                                                <th>
                                                    <p><small>Día Proximo Informe</small></p>
                                                    <input name="dia_del_Proximo_Informe" onChange={this.handleChange} type="text" placeholder="dia_del_Proximo_Informe" value={this.state.dia_del_Proximo_Informe}/>
                                                </th>
                                                <th>
                                                    <p><small>Mes Proximo Informe</small></p>
                                                    <input name="mes_del_Proximo_Informe" onChange={this.handleChange} type="text" placeholder="mes_del_Proximo_Informe" value={this.state.mes_del_Proximo_Informe}/>
                                                </th>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="file-path-wrapper">
                                                <th>
                                                    <p><small>Obligación 1</small></p>
                                                    <input name="obligación_1" onChange={this.handleChange} type="text" placeholder="obligación_1" value={this.state.obligación_1}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_1' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_1' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 2</small></p>
                                                    <input name="obligación_2" onChange={this.handleChange} type="text" placeholder="obligación_2" value={this.state.obligación_2}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_2' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_2' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 3</small></p>
                                                    <input name="obligación_3" onChange={this.handleChange} type="text" placeholder="obligación_3" value={this.state.obligación_3}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_3' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_3' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 4</small></p>
                                                    <input name="obligación_4" onChange={this.handleChange} type="text" placeholder="obligación_4" value={this.state.obligación_4}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_4' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_4' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 5</small></p>
                                                    <input name="obligación_5" onChange={this.handleChange} type="text" placeholder="obligación_5" value={this.state.obligación_5}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_5' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_5' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 6</small></p>
                                                    <input name="obligación_6" onChange={this.handleChange} type="text" placeholder="obligación_6" value={this.state.obligación_6}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_6' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_6' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 7</small></p>
                                                    <input name="obligación_7" onChange={this.handleChange} type="text" placeholder="obligación_7" value={this.state.obligación_7}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_7' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_7' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 8</small></p>
                                                    <input name="obligación_8" onChange={this.handleChange} type="text" placeholder="obligación_8a" value={this.state.obligación_8}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_8' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_8' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 9</small></p>
                                                    <input name="obligación_9" onChange={this.handleChange} type="text" placeholder="obligación_9" value={this.state.obligación_9}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_9' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_9' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                            <div className="input-field col s12">
                                                <th>
                                                    <p><small>Obligación 10</small></p>
                                                    <input name="obligación_10" onChange={this.handleChange} type="text" placeholder="obligación_10" value={this.state.obligación_10}/>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Avance obligacion_10' className='materialize-texarea'></textarea>
                                                </th>
                                                <th>
                                                    <textarea placeholder='Anexo obligacion_10' className='materialize-texarea'></textarea>
                                                </th>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>CEDULA</th>
                                        <th>NOMBRE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.contractors.map(contractors => {
                                            return (
                                                <tr key={contractors._id}>
                                                    <td>{contractors.cedula}</td>
                                                    <td>{contractors.nombre}</td>
                                                    <td>
                                                        <button className="btn btn-light darken-4" onClick={() => this.editContractor(contractors._id)}>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                        <button className="btn btn-light darken-4" style={{margin: '4px'}} onClick={() => this.deleteContractor(contractors._id)}>
                                                        <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;