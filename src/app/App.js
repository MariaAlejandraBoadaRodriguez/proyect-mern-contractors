import React, { Component } from 'react';

class App extends Component {     //Creo un componente

    constructor(){
        super(); //Super es un metodo y hereda todas las funcionalidades que nos da el componente constructor
        this.state = {
            cedula: " ",
            nombre: " ",
            supervisor: " ",
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
                this.setState({cedula: " ", nombre: " ", supervisor: " "});
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
                this.setState({cedula: " ", nombre: " ", supervisor: " ", _id: " "});
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
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addContractor}> 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <h6>Cedula Contratistas</h6>
                                                <input name="cedula" onChange={this.handleChange} type="text" placeholder="Cedula Contratista" value={this.state.cedula}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <h6>Nombre Contratistas</h6>
                                                <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre Contratista" value={this.state.nombre}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <h6>Supervisor del Contratistas</h6>
                                                <input name="supervisor" onChange={this.handleChange} type="text" placeholder="supervisor del Contratista" value={this.state.supervisor}/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>CEDULA</th>
                                        <th>NOMBRE</th>
                                        <th>SUPERVISOR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.contractors.map(contractors => {
                                            return (
                                                <tr key={contractors._id}>
                                                    <td>{contractors.cedula}</td>
                                                    <td>{contractors.nombre}</td>
                                                    <td>{contractors.supervisor}</td>
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