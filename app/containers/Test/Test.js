import React from 'react';
// import { render } from 'react-dom';
import Test1 from './Test1.js';
import TestState from './TestState.js'

class Test extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let flag = true;
	    return (
	      	<div >11
                <button type="button">哈哈啊</button>
            </div>

	    );
    }
    componentWillReceiveProps() {

    }
    componentDidMount() {
    	const p = new Promise((resolve, reject) => {
            window.setTimeout(() => {
                console.log("p")
                resolve(5);
            },5000);
        });
        const p2 = () => {
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    console.log("p2")
                    reject(3);
                },3000);
            });
        }
        p.then(p2).catch((ex) =>{ console.log(ex)});
    }
	
}
export default Test;