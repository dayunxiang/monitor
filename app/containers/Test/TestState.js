import React from 'react';
// import { render } from 'react-dom';


class TestState extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { name:"taosy" };

    }

    render() {
        
	    return (
	      	<div>
                <input type="text" value={this.state.name}/>
                <button onClick={this.buttonClick.bind(this)}>点击</button>
            </div>
	    );
    }
    buttonClick(){
        this.setState({
            name:"tom"
        });
    }
	
}
export default TestState;