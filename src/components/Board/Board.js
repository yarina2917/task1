import React from 'react';
import './Board.css';
import CreateTags from './CreateTags/CreateTags';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            boardCoord: {},
            tagSize: {
                width: 80,
                height: 25
            },
            currentEdit: null
        };
        this.selector = React.createRef();
    }

    componentDidMount() {
        const rect = this.selector.current.getBoundingClientRect();
        this.setState({
            boardCoord: {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom
            }
        });
    }

    checkBoardHandler = (e) => {
        if (e.target.parentNode.className !== 'el' && e.target.className !== 'el') {
            const newArr = [...this.state.arr];
            const currentEdit = this.state.currentEdit;
            if (currentEdit !== null) {
                if (this.state.arr[currentEdit].text) {
                    newArr[currentEdit].edit = false;
                    this.setState({
                        arr: newArr,
                        currentEdit: null
                    })
                } else {
                    this.deleteTagHandler(currentEdit);
                }
            } else {
                let xCoord = e.clientX;
                let yCoord = e.clientY;
                if (xCoord + this.state.tagSize.width > this.state.boardCoord.right) {
                    xCoord = this.state.boardCoord.right - this.state.tagSize.width
                }
                if (yCoord + this.state.tagSize.height > this.state.boardCoord.bottom) {
                    yCoord = this.state.boardCoord.bottom - this.state.tagSize.height
                }
                newArr.push({
                    text: 'test',
                    edit: true,
                    x: xCoord,
                    y: yCoord,
                    zIndex: 1
                });
                this.setState({
                    currentEdit: newArr.length - 1,
                    arr: newArr,
                })
            }
        }

    };

    editTagHandler = (index) => {
        const newArr = [...this.state.arr];
        newArr[index].edit = true;
        this.setState({
            arr: newArr,
            currentEdit: index
        })
    };

    editTextHandler = (index, newText) => {
        const newArr = [...this.state.arr];
        newArr[index].text = newText;
        this.setState({arr: newArr})
    };

    deleteTagHandler = (index) => {
        const newArr = [...this.state.arr];
        newArr.splice(index, 1);
        this.setState({
            arr: newArr,
            currentEdit: null
        });
    };

    handleMouseMove = (e, index) => {
        const newArr = [...this.state.arr];
        let coordX = e.pageX - this.state.tagSize.width / 2;
        let coordY = e.pageY - this.state.tagSize.height / 2;
        if (coordX + this.state.tagSize.width > this.state.boardCoord.right) {
            coordX = this.state.boardCoord.right - this.state.tagSize.width
        }
        if (coordX < this.state.boardCoord.left) {
            coordX = this.state.boardCoord.left;
        }
        if (coordY + this.state.tagSize.height > this.state.boardCoord.bottom) {
            coordY = this.state.boardCoord.bottom - this.state.tagSize.height;
        }
        if (coordY < this.state.boardCoord.top) {
            coordY = this.state.boardCoord.top;
        }
        newArr[index].x = coordX;
        newArr[index].y = coordY;
        this.setState({arr: newArr});
    };

    render() {
        return (
            <div className='board'
                 onClick={(e) => this.checkBoardHandler(e)}
                 ref={this.selector}>
                <CreateTags
                    arr={this.state.arr}
                    boardCoord={this.state.boardCoord}
                    editText={(index, newText) => this.editTextHandler(index, newText)}
                    deleteTag={(index) => this.deleteTagHandler(index)}
                    editTag={(index) => this.editTagHandler(index)}
                    handleMouseMove={(e, index) => this.handleMouseMove(e, index)}
                />
            </div>
        )
    }
}

export default Board;