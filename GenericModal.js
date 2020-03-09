import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

const { width, height } = Dimensions.get("window");

class GenericModal extends Component {
  static propTypes = {
    containerStyle: PropTypes.object
  };
  state = {
    isVisible: false,
    title: null,
    subtitle: null,
    buttons: null,
    theme: "default"
  };

  dismissModal = () => {
    this.setState({
      isVisible: false
    });
  };

  showModal = (
    title: string,
    subtitle: string,
    theme: string,
    buttons: array
  ) => {
    this.setState({
      isVisible: true,
      title,
      subtitle,
      buttons,
      theme
    });
  };

  onClose = () => {
    this.setState({
      isVisible: false,
      title: null,
      subtitle: null,
      buttons: null,
      theme: "default"
    });
  };

  render() {
    const { isVisible } = this.state;
    const { containerStyle } = this.props;
    if (!isVisible) return null;

    return (
      <View style={[styles.container, containerStyle]}>
        <SCLAlert
          theme={this.state.theme}
          show={this.state.isVisible}
          title={this.state.title}
          subtitle={this.state.subtitle}
          onRequestClose={this.onClose}
        >
          {this.state.buttons === null ? (
            <SCLAlertButton theme="default" onPress={this.dismissModal}>
              Tamam
            </SCLAlertButton>
          ) : (
            this.state.buttons !== undefined &&
            this.state.buttons.map((item, i) => {
              return (
                <SCLAlertButton
                  key={"alert-button-" + i}
                  theme={item.theme !== undefined ? item.theme : "default"}
                  onPress={
                    item.style === "cancel"
                      ? () => {
                          item.onPress && item.onPress();
                          this.dismissModal();
                        }
                      : item.onPress
                  }
                >
                  {item.text}
                </SCLAlertButton>
              );
            })
          )}
        </SCLAlert>
      </View>
    );
  }
}

export default GenericModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 100
  }
});
