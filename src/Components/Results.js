import React from "react";

const Results = props => {
    const { results } = props

    return (
        results.length > 0 && (
            <div className="results">
                <h5>Таблица рекордов</h5>
                <table>
                    <thead>
                        <tr>
                            <td>Имя</td>
                            <td>Время</td>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
            )
    );
};

export default Results;
