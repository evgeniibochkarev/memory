import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


import "./styles.scss";

import Grid from "./Grid";
import StartGame from "./StartGame";
import Navbar from "./Navbar";
import Results from "./Results";

const useInterval = (callback, delay) => {
    const intervalId = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (typeof delay === "number") {
            intervalId.current = window.setInterval(tick, delay);

            return () => window.clearInterval(intervalId.current);
        }
    }, [delay]);

    return intervalId.current;
};

function Main() {
    const CARD_COUNT = 18


    const [newGame, setNewGame] = useState(false);
    const [list, setList] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [score, setScore] = useState(0);
    const [hiddenItems, setHiddenItems] = useState([]);
    const [winner, setWinner] = useState(true);
    const [timeoutID, setTimeoutID] = useState([]);
    const [name, setName] = useState("unnamed")
    const [results, setResults] = useState([{name: 'for test', score: 123}])

    const checkItems = (firstIndex, secondIndex) => {
        clearTimeouts([])

        if (
            firstIndex !== secondIndex &&
            list[firstIndex].url === list[secondIndex].url
        ) {
            setHiddenItems([...hiddenItems, firstIndex, secondIndex]);
            setVisibleItems([]);
        } else if (typeof firstIndex === 'undefined') {
            setTimeoutID(timeoutID.concat(
                setTimeout(() => {
                    setVisibleItems([]);
                }, 5000)
            ));
        } else {
            setTimeoutID(timeoutID.concat(
                setTimeout(() => {
                    setVisibleItems([]);
                }, 500)
            ));
        }
    };


    const clearTimeouts = () => {
        timeoutID.forEach((item) => {
            clearTimeout(item)
        })
        setTimeoutID([])
    }


    useInterval(
        () => {
            setScore(score => score + 1);
        },
        !winner ? 1000 : null
    )


    useEffect(
        () => {
            axios
                .get(
                    "https://api.unsplash.com/search/photos?query=car&client_id=PURuuKmkzGMyz8735_h1g1A_ZggX-2O-m5_Oev5wJdg&per_page=" + CARD_COUNT
                )
                .then(res => {
                    const newList = res.data.results.map(item => {
                        return {
                            id: item.id,
                            url: item.urls.small
                        };
                    });


                    setList(
                        newList
                            .concat(
                                newList.map(item => {
                                    return {
                                        ...item, id: item.id + Math.random()
                                    };
                                })
                            )
                            .sort(() => Math.random() - .5)
                    );
                });
        },
        [newGame]
    );






    useEffect(
        () => {
            if (hiddenItems.length > 0 && hiddenItems.length === list.length && !winner) {
                setWinner(true);
                setResults(results.concat([{name: name, score: score}]).sort((a, b) => a.score - b.score) )
            }

        },
        [hiddenItems, list, results, name, score, winner]
    );

    return (
        <div className="text-center p-4 d-flex flex-column">
            <Navbar name={name} score={score} setName={setName} />
            {winner && <StartGame list={list} setNewGame={setNewGame} setVisibleItems={setVisibleItems} setHiddenItems={setHiddenItems} setWinner={setWinner} setScore={setScore} />}
            
            {winner && score !== 0 && (
                <div className="mt-3">
                    Победа! Вы закончили за {score} секунд
                </div>
            )}

            {winner && <Results results={results} />}

            {!winner && (
                <div>
                    {list.length === 0 ? (
                        <div>Загрузка изображений...</div>
                    ) : (
                        <div>
                            <Grid disabled={winner}
                                list={list}
                                visibleItems={visibleItems}
                                setVisibleItems={setVisibleItems}
                                hiddenItems={hiddenItems}
                                checkItems={checkItems}
                            />
                        </div>)}
                    {winner}

                </div>
            )}

           

        </div>
    );
}


export default Main;