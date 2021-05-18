import FormInputText from './components/common/FormInputText/FormInputText';
import ButtonSubmit from './components/common/Button/ButtonSubmit';
import Link from './components/common/Link/Link';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="login__wrapper">
        <h1 className="title">Need for drive</h1>
        <div className="box">
          <form className="login__form" action="submit">
            <h2 className="login__title">Вход</h2>
            <FormInputText label="Почта" placeholder="Введите почту" type="email" />
            <FormInputText label="Пароль" placeholder="Введите пароль" type="password" />
            <p className="login__footer">
              <Link text="Запросить доступ" href="#" />
              <ButtonSubmit text="Войти" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
