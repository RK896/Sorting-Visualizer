import React from "react";
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: []
        };
    }

    componentDidMount() {
        this.newArray();
    }

    newArray() {
        const arr = [];
        for(let i = 0; i < 100; i++) {
            arr.push(randomInt(8, 2000));
        }
        this.setState({arr});
    }

    render() {
        const {arr} = this.state;

        return (
        <div className="array-container">
            {arr.map((val, index) => (
            <div
                className="array-bar" 
                key={index}
                style = {{height: `${val}px`}}
                >
            </div>    
            ))}
        </div>
                
        )
    }

    
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
