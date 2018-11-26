import React from 'react';
import { Tree } from '../Antd.js';

class NiceTree extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let { dataSource } = this.props;
        return (
            <Tree {...this.props}>{this.handlerTreeNode(dataSource)}</Tree>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.forceRender === true){
            return true;
        }
        if (this.props.dataSource === nextProps.dataSource) {
            return false;
        }else{
            return true;
        }
    }
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} >{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    
}
export default NiceTree;