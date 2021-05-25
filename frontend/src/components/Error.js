import React, { Component } from 'react';

class Error extends Component {

    render() {
        return (
            <div className="display-block error-popup box title col">
                <img src={"/no-connection-icon.jpg"} alt=""/>
                <div>
                    קרתה תקלה, נא לרענן את העמוד
                </div>

            </div>
        );
    }
}

export default Error;
