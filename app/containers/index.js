import React from 'react';
import { connect } from 'react-redux';
import "./style.css"
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div> 
                {this.props.children}
            </div>
        )
    }
    
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {

    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)