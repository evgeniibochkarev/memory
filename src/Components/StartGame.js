function StartGame(props) {
    const {list, setNewGame, setVisibleItems, setHiddenItems, setWinner, setScore} = props
    return (
        <div className="startpage">
            <button
                onClick={() => {
                list.sort(() => Math.random() - .5)
                setNewGame(true)
                setVisibleItems([])
                setHiddenItems([])
                setWinner(false)
                setScore(0)
                }}
                className="btn btn-warning mb-4"
            >
                Начать
            </button>
      </div>
    )
}

export default StartGame;