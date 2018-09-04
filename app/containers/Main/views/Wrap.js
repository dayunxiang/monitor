import React from 'react';

let Wrap = function(Component){
	return class Wrap extends React.Component {
	  	constructor(props, context) {
	        super(props, context);
	        this.state = { 
	            name:null
	        };

	    }
	    render() {
	    	let {show} = this.props;
	    	return (
	    		<div className="ps-main-wrap" style ={{display:show?"block":"none"}}>
		    		<Component {...this.props}/>
		    	</div>
			 )
	        
	    }
	    componentWillReceiveProps(){

	    }
	    componentDidMount(){
	    	
	    }
	   
	  
		
	}
}

export default Wrap;
