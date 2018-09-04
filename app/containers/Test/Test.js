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
	      	<div >
                <Test1 name="taosy"/>
                <TestState></TestState>
            </div>

	    );
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
    	
    }
	
}
export default Test;