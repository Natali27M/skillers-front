import {db} from "../../firebaseConfig";
import {uid} from "uid";
import {set, ref, onValue, remove, update} from "firebase/database";
import {useState, useEffect, useRef} from "react";
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {FeedbackValidator} from '../../validation';

function HomeFirepadPage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState("");
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();
    const [form, setForm] = useState('');
    const [newUuid, setNewUuid] = useState('');


    const handleTodoChange = (e) => {
        console.log(e.target.value,'handle');
        setTodo(e.target.value);
    };
    const handleTodoChange2 = (e) => {
        console.log(e.target.value,'handle');
        setTodo(e.target.value);
    };

    const writeToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/one`), {
            todo,
            uuid,
        });
        // setNewUuid(uuid);
        setTodo("");
    };

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            // console.log(newUuid,'uuid!!!!!!!!!!');
            console.log(data?.one?.todo,'data');
            setValue('you2', data?.one?.todo);
            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);

        // setValue("you",1);


    return (
        <div>
            <input type="textarea" onChange={handleTodoChange} onInput={writeToDatabase} {...register('you')}/>
            {/*<input type="textarea" value={todo} onChange={handleTodoChange} onInput={writeToDatabase} {...register('you')}/>*/}
            <input type="textarea" {...register('you2')} onChange={handleTodoChange2}/>
            {/*<button onClick={writeToDatabase}>Submit</button>*/}


            {/*{isEdit ? (*/}
            {/*    <>*/}
            {/*        <button onClick={handleSubmitChange}>Submit Change</button>*/}
            {/*        <button*/}
            {/*            onClick={() => {*/}
            {/*                setIsEdit(false);*/}
            {/*                setTodo("");*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            X*/}
            {/*        </button>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <button onClick={writeToDatabase}>submit</button>*/}
            {/*)}*/}
            {/*{todos.map((todo) => (*/}
            {/*    <>*/}
            {/*        <h1>{todo.todo}</h1>*/}
            {/*        <button onClick={() => handleUpdate(todo)}>update</button>*/}
            {/*        <button onClick={() => handleDelete(todo)}>delete</button>*/}
            {/*    </>*/}
            {/*))}*/}
        </div>
    );
}

export {HomeFirepadPage};
