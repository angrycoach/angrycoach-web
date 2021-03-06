import React, { Component } from 'react';
import {Button, ListGroup, ListGroupItem, Grid, Row, Col, Navbar, 
  FormGroup, InputGroup, FormControl, DropdownButton, MenuItem} from 'react-bootstrap/lib';

class AddNotes extends Component {

    constructor(props){
        super(props);
        this.state = {
            noteText: '',
        }
    }

    updateNoteText(noteText){
        this.setState({noteText: noteText.target.value});
    }
    
    addNote(){
        if (this.state.noteText === '') {
            alert('É preciso inserir uma tarefa');
            return;
        }

        var task = {name: this.state.noteText};

        fetch(
            "https://desolate-shore-59639.herokuapp.com/task", 
            { 
                method: 'POST', 
                headers: { 'content-type': 'application/json'}, 
                body : JSON.stringify(task)
            }
        ).then(() => this.retrieveDataAPI());
    }

    retrieveDataAPI(){
        fetch('https://desolate-shore-59639.herokuapp.com/task')
        .then(response => response.json())
        .then(body  => {
            //We pass the body from API to the Store
            this.props.addAll(body);
        })
        .catch( err => alert(err));
    }
    
    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            let notesArray = this.state.notes;
            notesArray.push(this.state.noteText);
            this.setState({noteText: ''});
        }
    }

    render(){
        return (
            <div className="AddNotes">
                <FormGroup>
                    <InputGroup>
                    <FormControl type="text" 
                        ref={((input) => {this.textInput = input})}
                        className="form-control"
                        value={this.state.noteText}
                        onChange={noteText => this.updateNoteText(noteText)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <InputGroup.Button>
                        <Button onClick={this.addNote.bind(this)}>Adicionar</Button>
                    </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }
}

export default AddNotes;