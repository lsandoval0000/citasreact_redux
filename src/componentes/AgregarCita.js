import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {agregarCita} from '../actions/citasActions';
import {mostrarError} from '../actions/errorActions';

class AgregarCita extends Component {

    constructor(props){
        super(props);
        
        this.mascotaRef = React.createRef();
        this.duenioRef = React.createRef();
        this.fechaRef = React.createRef();
        this.horaRef = React.createRef();
        this.sintomasRef = React.createRef();
    }

    componentDidMount() {
        this.props.mostrarError(false);
    }

    crearNuevaCita = (e)=>{
        e.preventDefault();

        const mascota = this.mascotaRef.current.value,
              duenio = this.duenioRef.current.value,
              fecha = this.fechaRef.current.value,
              hora = this.horaRef.current.value,
              sintomas = this.sintomasRef.current.value;

        if(mascota === '' || duenio ==='' || fecha ==='' || hora === '' || sintomas === ''){
            this.props.mostrarError(true);
        }else{
            const nuevaCita = {
                id: uuid(),
                mascota:mascota,
                duenio:duenio,
                fecha:fecha,
                hora:hora,
                sintomas:sintomas
            };
    
            this.props.agregarCita(nuevaCita);
    
            e.currentTarget.reset();

            this.props.mostrarError(false);
        }
    }

    render() {
        const existeError = this.props.error;
        return (
            <div className="card mt-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">Agregar las Citas Aquí</h2>
                    <form onSubmit={this.crearNuevaCita}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Mascota</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" className="form-control" placeholder="Nombre Mascota" ref={this.mascotaRef}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Dueño</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" className="form-control"  placeholder="Nombre Dueño de la Mascota" ref={this.duenioRef}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
                                <input type="date" className="form-control" ref={this.fechaRef}/>
                            </div>                            

                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4">
                                <input type="time" className="form-control" ref={this.horaRef}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-lg-3 col-form-label">Sintomas</label>
                            <div className="col-sm-9 col-lg-9">
                                <textarea  className="form-control" ref={this.sintomasRef}></textarea>
                            </div>
                        </div>
                        <div className="form-group row justify-content-end">
                            <div className="col-sm-4">
                                <button type="submit" className="btn btn-success w-100">Agregar</button>
                            </div>
                        </div>
                    </form> 
                    { existeError ? <div className="alert alert-danger text-center">Todos los campos son obligatorios</div> : ''}            
                </div>
            </div>
        );
    }
}

AgregarCita.propTypes = {
    agregarCita : PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    citas: state.citas.citas,
    error: state.error.error
});

export default connect(mapStateToProps, {agregarCita,mostrarError})(AgregarCita);