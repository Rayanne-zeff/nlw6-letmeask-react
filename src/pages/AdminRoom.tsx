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

export function AdminRoom(){
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
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className='content'>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

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
