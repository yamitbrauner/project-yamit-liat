import React, { Component } from 'react';

class Error extends Component {

    render() {
        return (
            <div className="display-block box title col">
                <img src={"/no-connection-icon.jpg"}/>
                <div>
                    קרתה תקלה, נא לרענן את העמוד
                </div>

            </div>
        );
    }
}

export default Error;
