import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Tree,Tabs   } from '../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../BaseSubPage.js'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const getParentKey = (title, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.title === title)) {
                parentKey = node.key;
            } else if (getParentKey(title, node.children)) {
                parentKey = getParentKey(title, node.children);
            }
        }
    }
    return parentKey;
};

const dataList = [];

const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({key, title: node.title});
        if (node.children) {
            generateList(node.children);
        }
    }
};

let key = 5;

class RegionTree extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
            expandedKeys: ['1'],
            searchValue: '',
            autoExpandParent: true,
            gData: [
                {
                    title: 'parent1',
                    key: '1',
                    children: [
                        {
                            title: 'parent2',
                            key: '2',
                            children: [
                                {
                                    title: 'leaf1',
                                    key: '3',
                                },
                                {
                                    title: 'leaf2',
                                    key: '4',
                                },
                                {
                                    title: 'leaf3',
                                    key: '5',
                                }
                            ]
                        },
                        {
                            title: 'parent3',
                            key: '6',
                            children: [
                                {
                                    title: 'leaf4',
                                    key: '7',
                                },
                                {
                                    title: 'leaf5',
                                    key: '8',
                                },
                                {
                                    title: 'leaf6',
                                    key: '9',
                                }
                            ]
                        },
                    ]
                }
            ]
        };
    
    }
    // 树状图事件
    onSelect = (selectedKeys, info) => {
        /*用于打开该节点的详细信息*/
        console.log('selected', selectedKeys, info);
        console.log(this.state.expandedKeys);
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.title, this.state.gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    loop = data => data.map((item) => {
        let {searchValue} = this.state;
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title = index > -1 ? (
            <span>
                {beforeStr}
                <span style={{color: '#f50'}}>{searchValue}</span>
                {afterStr}
                </span>
        ) : <span>{item.title}</span>;
        if (item.children) {
            return (
                <TreeNode key={item.key} title={title} dataRef={item}>
                    {this.loop(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode dataRef={item} key={item.key} title={title}/>;
    });

    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                treeNode.props.dataRef.children = [
                    { title: 'Child', key: (++key + '') },
                    { title: 'Child', key: (++key + '') },
                ];
                this.setState({
                    gData: [...this.state.gData],
                });
                resolve();
            }, 1000);
        });
    };

    render() {
        const {expandedKeys, autoExpandParent, gData} = this.state;
        // 进行数组扁平化处理
        generateList(gData);
     return(
        <div style={{marginBottom: '200px'}}>
                <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
                <Tree
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    loadData={this.onLoadData}
                >
                    {this.loop(gData)}
                </Tree>
            </div>
     )
     
    }  
}

export default RegionTree;