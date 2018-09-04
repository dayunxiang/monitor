import React from 'react';
// import { render } from 'react-dom';


class Test1 extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let name = this.props.name;
	    return (
	      	<div>{ name }</div>
	    );
    }
  
	
}
export default Test1;