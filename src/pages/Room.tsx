import {FormEvent, useState} from "react";
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from "../Components/Button";
import { Question } from '../Components/Question';
import {RoomCode} from "../Components/RoomCode";
import {useAuth} from "../hooks/useAuth";
import {database} from "../services/firebase";
import {toast} from "react-toastify";

import "../styles/room.scss";
import {useRoom} from "../hooks/useRoom";

type RoomParams = {
    id: string;
}

export function Room(){
    const  { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            toast.error("You must be logged in");
            return;
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlightead: false,
            isAnswered: false

        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main className='content'>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                    placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviara a pergunta, <button>faça seu login</button>.</span>
                        ) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                <div className="question-list">
                    {questions.map(question =>{
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        );
                    })}
                </div>
            </main>
        </div>

    );

}
