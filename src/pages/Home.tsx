import {useHistory} from "react-router-dom";
import {FormEvent, useState} from "react";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase'

import {Button} from "../Components/Button";
import {useAuth} from "../hooks/useAuth";

import '../styles/auth.scss';


export function Home() {
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth()
    const [roomcode, setRoomCode] = useState('');

    async function handleCreateRomm() {
        if (!user) {
         await signInWithGoogle()

        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if (roomcode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomcode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists!');
            return;
        }

        history.push(`/rooms/${roomcode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real </p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"/>
                    <button onClick={handleCreateRomm} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomcode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )

}
