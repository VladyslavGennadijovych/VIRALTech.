import { useState } from "react"


function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="login-page">
                <div className="container">
                    <div className="form-container">
                        <h2>Вхід</h2>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text" id="login" placeholder="Логін" required onChange={(e) => setLogin(e.target.value)} value={login} />
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" placeholder="Пароль" required onChange={(e) => setPassword(e.target.value)} value={password}/>
                            </div>
                            <div className="input-group">
                                <button type="submit">Ввійти</button>
                            </div>
                            <p className="error" id="errorMessage"></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;