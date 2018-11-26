import React from 'react';
import { Link } from 'react-router';


class Test extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let { data } = this.props;
        let comps = null;
        if (Array.isArray(data)) {
            comps = data.sort((a, b) => {
                return a.order - b.order;
            }).map((item) => {
                if (item.name === "水闸泵站监控系统") {
                    return <div key={item.id} className="ps-m-ssb-wrap"><Link key={item.id} to="/home" target="_blank">{item.name}</Link></div>;
                }
                return <div key={item.id} className="ps-m-ssb-wrap"><a target="_blank" href={item.url}>{item.name}</a></div>;
            });
        }
        return (
            <div className="ps-m-ssb-cont">
                {comps}
            </div>
        );
    }
    componentDidMount() {
        
    }
    
}
export default Test;