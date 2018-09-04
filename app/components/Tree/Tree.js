import React from 'react';
import TreeLi from './TreeLi.js';
import './style.css';

class Tree extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: null,
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length) {
            var data = this.buildChild(nextProps.data);
            this.setState({
                data: data
            });
        }
    }
    render() {
        var ls = this.state.data;
        return (
            <ul className="ubi-tree">
                {ls && ls.length ? ls.map((item, i) => {
                    return <TreeLi  nodeClick={this.treeLiClick.bind(this)} key={item.id} data={item} />;
                }) : ''}
            </ul>
        )
    }
    buildChild(data, level, parentId) {
        var treeLis = [];
        if (data && data.length) {
            for (var i = 0; i < data.length; i++) {
                var child = data[i];
                var id = this.addIdString( i , parentId);
                var childModel = {
                    text:child.text,
                    href:child.href,
                    level: level == null ? 1 : level+1,
                    id: id,
                    show:true,
                    showChild:true
                }
                treeLis.push(childModel);
                if (child.nodes && child.nodes.length) {
                    var childTreelis = this.buildChild(child.nodes, level == null ? 1: level+1, id);
                    childTreelis.forEach(function(item, i){
                        treeLis.push(item);
                    });
                }
            }
        }
        return treeLis;

    }
    addIdString( index, parentId) {
        var str = "";
        if (parentId == null) {
            str = "0"
            
        }else{
            
            str = parentId + "."+  index;
        }
        return str;
    }
    treeLiClick(opt) {
        let { events } = this.props;
        this.toggleNode(opt);
        if (events.onNodeClick) {
            events.onNodeClick(opt);
        }
        
        
    }
    toggleNode(opt) {
        opt.showChild = !opt.showChild
        this.state.data.forEach(function(item, i){
            if (item.id.startsWith(opt.id) > 0 && item.id !== opt.id ) {
                item.showChild = opt.showChild;
                return item.show = opt.showChild;
            }
        });
        this.forceUpdate();
    }
    
 
}


export default Tree