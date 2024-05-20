import { useState } from "react"


function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="register-page">
                <div className="container">
                    <h2>Реєстрація</h2>
                    <div className="form-container">
                        <form id="registerForm" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text" id="name" placeholder="Ім'я" required onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="phoneNumber" placeholder="Номер телефону" required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="login" placeholder="Логін" required onChange={(e) => setLogin(e.target.value)} value={login} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="surname" placeholder="Прізвище" required onChange={(e) => setSurname(e.target.value)} value={surname} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="email" placeholder="Імейл" required onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" placeholder="Пароль" required onChange={(e) => setPassword(e.target.value)} value={password}/>
                            </div>
                        </form>
                    </div>
                    <p className="error" id="errorMessage"></p>
                    <button type="submit">Ввійти</button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;