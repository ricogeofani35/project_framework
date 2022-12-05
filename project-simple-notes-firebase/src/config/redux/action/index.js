import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";

// method asincrohnus
export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'Rico Geofani'})
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    console.log(data.email)
    console.log(data.password)
    dispatch({type: 'CHANGE_LOADING', value: true})
    return (
        createUserWithEmailAndPassword(getAuth() ,data.email, data.password)
        .then((result) => {
            console.log('success : ', result);
            alert('register success');
            dispatch({type: 'CHANGE_LOADING', value: false})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode : ', errorCode);
            console.log('errorMessage : ', errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
        })
    )
}

export const loginUserAPI = (data) => (dispatch) => {
    // kita membuat new Promise karane akan membuat async dan await di fungsi login
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        signInWithEmailAndPassword(getAuth(), data.email, data.password)
        .then((result) => {
            // console.log('login berhasil : ', result);
            
            const dataUser = {
                email : result.user.email,
                uid : result.user.uid,
                emailVerified : result.user.emailVerified,
                refreshToken : result.user.refreshToken
            }
            dispatch({type: 'CHANGE_LOADING', value: false});
            dispatch({type: 'CHANGE_LOGIN', value: true});
            dispatch({type: 'CHANGE_USER', value: dataUser});
            resolve(dataUser); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode:', errorCode);
            console.log('errorMessage:', errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false});
            dispatch({type: 'CHANGE_LOGIN', value: false});
            resolve(false);
            reject(error)
        })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    const db = getDatabase();
    if(data.title != '') {
        push(ref(db, 'notes/' + data.userId), {
            title : data.title,
            content : data.content,
            date : data.date
        });
    } else {
        alert('data masih kosong');
    }
} 

export const getDataToAPI = (userId) => (dispatch) => {
    const db = getDatabase();
    // url notes kita
    const urlNotes = ref(db, 'notes/' + userId); 
    return new Promise((resolve, reject) => {
        // method untuk memanggil data
        onValue(urlNotes, (snapshot) => {
            // Object.keys = merubah object menjadi array/hanya mengambil keynya //melopping datanya supaya yang diambil datanya
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                // memasukan data ke array kosong data
                data.push({
                    id : key,
                    data : snapshot.val()[key]
                })
            });
            // updateStarCount(postElement, data);
            console.log('get Data : ', data);
            dispatch({type: 'SET_NOTES', value: data});
            resolve(snapshot.val());
        });
    })

}

export const updateDataToAPI = (data) => (dispatch) => {
    console.log('data update :', data)
    const db = getDatabase();
    // url notes kita
    const urlNotes = ref(db,`notes/${data.userId}/${data.noteId}`); 
    return new Promise((resolve, reject) => {
        // method untuk update data
        set((urlNotes), {
            title : data.title,
            content : data.content,
            date : data.date
        })
        .then(() => {
            console.log('success');
            resolve(true);
        })
        .catch((error) => {
            console.log('error : ', error);
            reject(false);
        });
    })
}

export const deleteDataToAPI = (data) => (dispatch) => {
    console.log('data delete :', data)
    const db = getDatabase();
    // url notes kita
    const urlNotes = ref(db,`notes/${data.userId}/${data.noteId}`); 
    return new Promise((resolve, reject) => {
        // method untuk update data
        remove((urlNotes))
        .then(() => {
            console.log('success');
            resolve(true);
        })
        .catch((error) => {
            console.log('error : ', error);
            reject(false);
        });
    })

}


