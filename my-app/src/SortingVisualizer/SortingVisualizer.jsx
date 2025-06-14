import React from "react";
import "./SortingVisualizer.css";
import {
  mergeSort,
  bubbleSort,
  quickSort,
  selectionSort,
  getSortAnimations,
} from "./SortingAlgorithms.js";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      isAnimating: false,
    };
  }

  componentDidMount() {
    this.newArray();
  }

  newArray(length = 20) {
    if (this.state.isAnimating) return;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(randomInt(8, 800));
    }
    this.setState({ arr }, () => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let bar of arrayBars) {
        bar.style.backgroundColor = "#42a5f5";
      }
    });
  }

  mergeSort() {
    if (this.state.isAnimating) return;
    const animations = getSortAnimations(this.state.arr, mergeSort);
    this.setState({ isAnimating: true }, () => {
      animate(animations, () => {
        this.setState({ isAnimating: false, arr: this.state.arr });
      });
    });
  }

  bubbleSort() {
    if (this.state.isAnimating) return;
    const animations = getSortAnimations(this.state.arr, bubbleSort);
    this.setState({ isAnimating: true }, () => {
      animate(animations, () => this.setState({ isAnimating: false }));
    });
  }

  selectionSort() {
    if (this.state.isAnimating) return;
    const animations = getSortAnimations(this.state.arr, selectionSort);
    this.setState({ isAnimating: true }, () => {
      animate(animations, () => this.setState({ isAnimating: false }));
    });
  }

  quickSort() {
    if (this.state.isAnimating) return;
    const animations = getSortAnimations(this.state.arr, quickSort);
    this.setState({ isAnimating: true }, () => {
      animate(animations, () => this.setState({ isAnimating: false }));
    });
  }

  render() {
    const { arr } = this.state;
    const barWidth = Math.max(
      2,
      Math.floor(window.innerWidth / arr.length) - 2
    );

    return (
      <div className="app-container">
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
            <button className="button" onClick={() => this.bubbleSort()}>
              Bubble Sort
            </button>
            <button className="button" onClick={() => this.quickSort()}>
              Quick Sort
            </button>
            <button className="button" onClick={() => this.selectionSort()}>
              Selection Sort
            </button>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="10"
              max="100"
              value={arr.length}
              className="slider"
              id="myRange"
              disabled={this.state.isAnimating}
              onChange={(e) => this.newArray(parseInt(e.target.value))}
            ></input>
            <p
              style={{ marginTop: "5px", fontWeight: "bold", fontSize: "25px" }}
            >
              {arr.length}
            </p>
          </div>
        </div>
        <div className="array-container">
          {arr.map((val, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                height: `${val}px`,
                width: `${barWidth}px`,
                backgroundColor: "#42a5f5",
              }}
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

function animate(animations, onComplete) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const ANIMATION_SPEED = 50;

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];
    const [action, index1, index2, newHeight] = animation;

    if (action === "compare") {
      setTimeout(() => {
        arrayBars[index1].style.backgroundColor = "#ef5350";
        arrayBars[index2].style.backgroundColor = "#ef5350";
      }, i * ANIMATION_SPEED);

      setTimeout(() => {
        arrayBars[index1].style.backgroundColor = "#ffd54f";
        arrayBars[index2].style.backgroundColor = "#ffd54f";
      }, (i + 1) * ANIMATION_SPEED);
    } else if (action === "overwrite") {
      setTimeout(() => {
        arrayBars[index1].style.height = `${newHeight}px`;
        arrayBars[index1].style.backgroundColor = "#4caf50";
      }, i * ANIMATION_SPEED);
      setTimeout(() => {
        arrayBars[index1].style.backgroundColor = "#ffd54f";
      }, i * ANIMATION_SPEED + ANIMATION_SPEED / 2);
    }
  }

  setTimeout(() => {
    onComplete();
  }, animations.length * ANIMATION_SPEED + 10);
}
