import React from "react";
import './SortingVisualizer.css'
import {mergeSort, bubbleSort, quickSort, heapSort, getSortAnimations} from './SortingAlgorithms.js';

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
        const animations = getSortAnimations(this.state.arr, mergeSort);
        animate(animations)

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

function animate(animations) {
    const arrayBars = document.getElementsByClassName("array-bar")
    const ANIMATION_SPEED = 10;

    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        const [action, index1, index2, newHeight] = animation;

        if (action === "compare") {
            setTimeout(() => {
                arrayBars[index1].style.backgroundColor = "red";
                arrayBars[index2].style.backgroundColor = "red";
            }, i * ANIMATION_SPEED)

            setTimeout(() => {
                arrayBars[index1].style.backgroundColor = 'cyan'
                arrayBars[index2].style.backgroundColor = 'cyan'
            }, (i + 1) * ANIMATION_SPEED); 
        } else if (action === 'overwrite') {
            setTimeout(() => {
                arrayBars[index1].style.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED);
        }
    }
};