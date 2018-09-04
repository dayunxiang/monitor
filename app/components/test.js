import React from 'react';
import { Tree, Menu, Icon,Input} from 'antd';


class Test extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { 
            name:null
        };

    }

    render() {
        let cmp =  <Input defaultValue={this.props.name}></Input> ;
	    return (
	      	<div>
                { cmp } 
            </div>
	    );
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
    	
    }
  
	
}
export default Test;

let a = 1;

export function getA(){
    return a;
}
export function setA(thisa){
    a = thisa;
}