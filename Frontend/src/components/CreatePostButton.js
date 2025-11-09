import React, { Component } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";
import { PostForm } from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    //this is inside of handleOk
    this.postForm
      .validateFields() //returns a promise
      .then((form) => {
        const { description, uploadPost } = form;
        const { type, originFileObj } = uploadPost[0]; //how to support multiple images or media
        const postType = type.match(/^(image|video)/g)[0];

        if (postType) {
          let formData = new FormData(); //upload picture or video
          formData.append("message", description);
          formData.append("media_file", originFileObj);

          const opt = {
            method: "POST",
            url: `${BASE_URL}/upload`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
            data: formData,
          };

          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                message.success("The image/video is uploaded!");
                this.postForm.resetFields();
                this.handleCancel();
                this.props.onShowPost(postType); //when it upload, frond end get the information immedaitely
              }
            })
            .catch((err) => {
              console.log("Upload image/video failed: ", err.message);
              message.error("Failed to upload image/video!");
            })
            .finally(() => {
              this.setState({ confirmLoading: false });
            });
        }
      })
      .catch((err) => {
        console.log("err validate form -> ", err);
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>

        <Modal
          title="create new post"
          open={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PostForm
            ref={(refInstance) => {
              this.postForm = refInstance;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default CreatePostButton;
