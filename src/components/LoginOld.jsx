import React from 'react';
// import socket from '../socket';
import style from './Login.module.css';

function LogIn() {
    return (
        <div className={style.mianForm}>
            <form>
                <div className={style.clearfix}>
                    <textarea 
                        className={style.mianForm__button}
                        type="button"
                        id="authorization"
                        value="Авторизация"
                    />
                    <textarea 
                        className={style.mianForm__button}
                        type="button"
                        id="registration"
                        value="Регистрация"
                    />
                </div>
                <div className={style.clearfix}>
                    <label for="login">
                        Логин
                    </label>
                    <textarea
                        className={style.mianForm__text}
                        type="text"
                        name="login"
                        id="login"
                        placeholder="Логин"/>
                </div>
                <div className={style.clearfix}>
                    <label for="password">
                        Пароль
                    </label>
                    <textarea
                        className={style.mianForm__password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                    />
                </div>
                <div className={style.clearfix}>
                    <textarea
                        className={style.mianForm__submit}
                        type="submit"
                        name="submit"
                        value="Войти/Зарегистрироваться"
                    />
                </div>
            </form>
        </div>
    );
}

export default LogIn;