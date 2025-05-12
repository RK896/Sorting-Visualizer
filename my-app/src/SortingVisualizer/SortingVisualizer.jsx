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
            arr.push(randomIntFromInterval(8, 2000));
        }
        this.setState({arr});
    }

    render() {
        const {arr} = this.state;

        return (
            {arr.map((val, index) => (
            <div className="">

            </div>    
        ))}
                
        )
    }
}