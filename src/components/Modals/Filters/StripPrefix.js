import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class StripPrefix extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            error: false,
            message: ''

        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
         
        this.setState({
            [name]: value
        })
    }

    isValid = (name) => {
        if(name === '' || name === undefined)
            return 'Field can not be empty'
        if(validator.isNumeric(name, {no_symbols: true}) === false)
            return 'Parts field must be a number'
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        let obj = {
            Parts: this.state.name
        }
        
        const isValid = this.isValid(this.state.name);

        if(isValid === true){
            addToParent('StripPrefix', obj);
            this.props.hideModal();
        }
        else {
            this.setState({
                error: true,
                message: isValid
            })
        }
    }

    render(){
        const { hideModal, loading, modalOpen } = this.props;

        return (
            <Modal open={modalOpen} size='mini'>
                <Header icon='save' content='StripPrefix Filter' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Parts</label>
                                <input className='form-control' name='name' value={this.state.name} onChange={this.handleChange} type='text'/>
                            </div>
                        </section>
                        <Message
                            warning
                            header='Could you check something!'
                            list={[this.state.message]}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => hideModal()} color='red' size='tiny'>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button onClick={this.submitHandler} color='green' loading={loading ? true : false} size='tiny'>
                        <Icon name='checkmark' /> Add
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StripPrefix)