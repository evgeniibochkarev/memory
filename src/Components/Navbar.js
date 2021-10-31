import { useState } from "react";

const Navbar = (props) => {
    const { name, score, setName} = props;
    const [isChangeName, setIsChangeName] = useState(false)
    return (
      <div className="navbar">
        <div className="navbar-title">Игра: Память</div>
        <div className="navbar-name" onClick={() => setIsChangeName(true)}>Имя: <span className={isChangeName ? 'd-none' : ''}>{name}</span>
            <input type="text" className={isChangeName ? '' : 'd-none'} value={name} onBlur={() => setIsChangeName(false)} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="navbar-score">Время: {score}</div>
      </div>
    );
}

export default Navbar;