import React from 'react';
import { Upload, Button, Icon, message } from '../Antd.js';

class FileUpload extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    }

    handleUpload = () => {
        this.setState({
            uploading: true,
        });
        let { onSubmit } = this.props;
        onSubmit && onSubmit(this.state.fileList, () =>{
            this.setState({
                uploading: false,
            });
        })
   
    }

    render() {
        const { uploading } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                      fileList: newFileList,
                    };
                });
            },
          beforeUpload: (file) => {
              this.setState(({ fileList }) => ({
                fileList: [...fileList, file],
              }));
              return false;
          },
          fileList: this.state.fileList,
        };

        return (
          <div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 选择文件
              </Button>
            </Upload>
            <Button
              className="upload-demo-start"
              type="primary"
              onClick={this.handleUpload}
              disabled={this.state.fileList.length === 0}
              loading={uploading}
            >
              {uploading ? '上传中...' : '开始上传' }
            </Button>
          </div>
        );
    }
}

export default FileUpload;