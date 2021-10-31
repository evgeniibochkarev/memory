import Card from "./Card";

const Grid = props => {
    const {
        list,
        visibleItems,
        setVisibleItems,
        hiddenItems,
        checkItems
    } = props;

    return (
        <div className="container">
            <div className="squaregrid">
                {list.map((item, index) => (
                    <Card
                        key={item.id}
                        className={` card ${visibleItems.includes(index) ? "squaregrid-card-show" : ""
                            } ${hiddenItems.includes(index)
                                ? "squaregrid-card-show squaregrid-card-finished"
                                : ""
                            }`}
                        onClick={() => {
                            if (!hiddenItems.includes(index)) {
                                switch (visibleItems.length) {
                                    case 0:
                                        setVisibleItems([index]);
                                        checkItems();
                                        break;
                                    case 1:
                                        if (visibleItems[0] !== index) {
                                            setVisibleItems(visibleItems.concat(index));
                                            checkItems(visibleItems[0], index);
                                        }
                                        break;
                                    default:
                                        setVisibleItems([]);
                                }
                            }
                        }}
                        imgSource={item.url}
                        imgDesc={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

Grid.defaultProps = {
    list: []
};

export default Grid;
