import React from 'react';
import Wrap from "./Wrap.js"


class Setting extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        
	    return (
	      	<div><input type="text"/></div>
	    );
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
    	
    }
	
}
export default Wrap(Setting);