import React from "react";
import "./SortingVisualizer.css";
import {
  mergeSort,
  bubbleSort,
  quickSort,
  heapSort,
  getSortAnimations,
} from "./SortingAlgorithms.js";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
    };
  }

  componentDidMount() {
    this.newArray();
  }

  newArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(randomInt(8, 800));
    }
    this.setState({ arr });
  }

  mergeSort() {
    const animations = getSortAnimations(this.state.arr, mergeSort);
    animate(animations);
  }

  bubbleSort() {}

  quickSort() {}

  heapSort() {}

  render() {
    const { arr } = this.state;

    return (
      <div>
        <div className="header">
          <h1>Sorting Algorithm Visualizer</h1>
          <div className="buttons">
            <button
              className="button"
              onClick={() => this.newArray(arr.length)}
            >
              Create New Array
            </button>
            <button className="button" onClick={() => this.mergeSort()}>
              Merge Sort
            </button>
            <button className="button" onClick={() => this.heapSort()}>
              Heap Sort
            </button>
            <button className="button" onClick={() => this.bubbleSort()}>
              Bubble Sort
            </button>
            <button className="button" onClick={() => this.quickSort()}>
              Quick Sort
            </button>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="10"
              max="100"
              value={arr.length}
              class="slider"
              id="myRange"
              onChange={(e) => this.newArray(parseInt(e.target.value))}
            ></input>
          </div>
        </div>
        <div className="array-container">
          {arr.map((val, index) => (
            <div
              className="array-bar"
              key={index}
              style={{ height: `${val}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function animate(animations) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const ANIMATION_SPEED = 10;

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];
    const [action, index1, index2, newHeight] = animation;

    if (action === "compare") {
      setTimeout(() => {
        arrayBars[index1].style.backgroundColor = "red";
        arrayBars[index2].style.backgroundColor = "red";
      }, i * ANIMATION_SPEED);

      setTimeout(() => {
        arrayBars[index1].style.backgroundColor = "cyan";
        arrayBars[index2].style.backgroundColor = "cyan";
      }, (i + 1) * ANIMATION_SPEED);
    } else if (action === "overwrite") {
      setTimeout(() => {
        arrayBars[index1].style.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED);
    }
  }
}
