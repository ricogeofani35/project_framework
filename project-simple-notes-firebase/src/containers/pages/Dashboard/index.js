import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataToAPI, updateDataToAPI, deleteDataToAPI } from "../../../config/redux/action";
import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        title : '',
        content : '',
        date : '',
        textButton : 'SIMPAN',
        noteId : ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }

    // method saat tombol save di click
    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            title : title,
            content : content,
            date : new Date().getTime(),
            userId : userData.uid
        }

        if(textButton === 'SIMPAN') {
            // dapat dari dispatch
            saveNotes(data);
        } else {
            data.noteId = noteId;
            updateNotes(data);
        }
        console.log(data);
    }

    // menerima dua parameter elementnya dan type nya apa
    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    // mengupdate data
    updateNotes = (note) => {
        console.log('note :', note);

        const {title, content} = note.data;
        this.setState({
            title : title,
            content : content,
            textButton : 'UPDATE',
            noteId : note.id
        });
    }

    cancleUpdate = () => {
        this.setState({
            title : '',
            content : '',
            textButton : 'SIMPAN'
        });
    }

    deleteNotes = (note) => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            noteId : note.id,
            userId : userData.uid
        }

        this.props.deleteNotes(data)
    }

    render() {
        // destrucering state variabel
        const {title, content, date, textButton} = this.state;
        // memanggil get notes
        const {notes} = this.props;
        console.log('notes :', notes);

        return (
           <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder="content" className="input-content" value={content}  onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancle" onClick={this.cancleUpdate}>CANCLE</button>
                            ) : <div></div>
                        }
                        <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                {
                    // kita cek jika datanya ada maka tampilkan
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => this.updateNotes(note)}>
                                            <div>
                                                <p className="title">{note.data.title}</p>
                                                <p className="date">{note.data.date}</p>
                                                <p className="content">{note.data.content}</p>
                                            </div>
                                            <button key={note.id} onClick={() => this.deleteNotes(note)} className='delete'>DELETE</button>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
           </div>
        )
    }
}

const reduxState = (state) => {
    return {
        userData : state.user,
        notes : state.notes
    }
}

const reduxDispatch = (dispatch) => {
    return {
        saveNotes : (data) => dispatch(addDataToAPI(data)),
        getNotes : (data) => dispatch(getDataToAPI(data)),
        updateNotes : (data) => dispatch(updateDataToAPI(data)),
        deleteNotes : (data) => dispatch(deleteDataToAPI(data))
    }
}

export default connect(reduxState, reduxDispatch)(Dashboard);