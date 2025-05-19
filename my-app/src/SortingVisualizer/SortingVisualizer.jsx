import React from "react";
import './SortingVisualizer.css'
import {
    mergeSort as mergeSortAlgo,
    bubbleSort as bubbleSortAlgo,
    quickSort as quickSortAlgo,
    heapSort as heapSortAlgo
  } from './SortingAlgorithms.js';

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
            arr.push(randomInt(8, 800));
        }
        this.setState({arr});
    }

    mergeSort() {
        const sorted = mergeSortAlgo(this.state.arr);
        this.setState({arr:sorted})

    }

    bubbleSort() {

    }

    quickSort() {

    }

    heapSort() {

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
            <button onClick={(() => this.newArray())}>Create New Array</button>
            <button onClick={(() => this.mergeSort())}> Merge Sort</button>
            <button onClick={(() => this.heapSort())}> Heap Sort</button>
            <button onClick={(() => this.bubbleSort())}> Bubble Sort</button>
            <button onClick={(() => this.quickSort())}> Quick Sort</button>

        </div>
                
        )
    }

    
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
