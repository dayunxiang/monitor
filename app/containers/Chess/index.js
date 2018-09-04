import React from 'react';
import ChessItem from '../../components/ChessItem/ChessItem.js';


class Chess extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tdata: []
        }
    }
    render() {
        var opt = {
            itemClickCB: this.itemClickCB.bind(this)
        };
        return (
            <div style={{
                width: 500,
                height: 500,
                margin: "auto"
            }}>
            {
            this.state.tdata.map((item) => {
                return <ChessItem key={item.y + "_" + item.x} isActive={item.isActive} self={item.self} entity={item}  opt={opt} />
            })
            }
            </div>
        )
    }

    itemClickCB(entity) {
        this.state.tdata.forEach(function(item) {
            if (item.y + "_" + item.x === entity.y + "_" + entity.x) {
                item.isActive = true;
            }
        });
        this.setState({
            tdata: this.state.tdata
        }, () => {
            var num = this.isWin();
            if (num === 0) {
                this.autoItemSet();
            } else if (num === 2) {
                alert("机器人赢了");
            }

        });


    }
    componentDidMount() {
        var data = [];
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                var d = {
                    x: j,
                    y: i,
                    isActive: false,
                    self: true
                }
                data.push(d);
            }
        }

        this.setState({
            tdata: data
        });
    }
    autoItemSet() {
        // var activeItems = [], deActiveItems = [];
        // for (var i = 0; i < this.state.tdata.length; i++) {
        //     var item = this.state.tdata[i];
        //     if (item.isActive) {
        //         activeItems.push(item);
        //     }else{
        //         deActiveItems.push(item);
        //     }
        // }

        for (var i = 0; i < this.state.tdata.length; i++) {
            var item = this.state.tdata[i];
            if (!item.isActive) {
                item.isActive = true;
                item.self = false;
                break;
            }
        }
        this.setState({
            tdata: this.state.tdata
        }, () => {
            var num = this.isWin();
            if (num === 0) {
            } else if (num === 2) {
                alert("机器人赢了");
            }

        });

    }
    isWin() {
        var activeItems = [],
            deActiveItems = [],
            activeItemsSelf = [];
        for (var i = 0; i < this.state.tdata.length; i++) {
            var item = this.state.tdata[i];
            if (item.isActive) {
                if (item.self) {
                    activeItemsSelf.push(item);
                } else {
                    activeItems.push(item);
                }

            } else {
                deActiveItems.push(item);
            }
        }
        var tempX = 0;
        var countX = 0;
        for (var j = 0; j < activeItems.length; j++) {
            var actitem = activeItems[j];
            if (j === 0) {
                tempX = actitem.x;
                countX++;
            } else {
                if (actitem.x === (tempX + 1)) {
                    tempX = actitem.x;
                    countX++;
                } else {
                    tempX = actitem.x;
                    countX = 1;
                }
            }
        }
        if (countX === 5) {
            return 2;
        }

        return 0;

    }

}
export default Chess;