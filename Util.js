import React from "react";
import GenericModal from "expo-modal/GenericModal";

export default class Util {
  static setModalRef(ref) {
    if (ref) {
      Util.modalRef = ref;
    }
  }
  static wrapIntoModal(comp, containerStyle) {
    const newChild = (
      <GenericModal
        key={"expo-modal"}
        containerStyle={containerStyle}
        ref={ref => Util.setModalRef(ref)}
      />
    );

    // append the newChild while creating the clone element
    const newElement = React.cloneElement(comp, comp.props, [
      comp.props.children,
      newChild
    ]);
    return newElement;
  }

  static showModal(title, subtitle, theme, buttons) {
    Util.modalRef.showModal(title, subtitle, theme, buttons);
  }

  static dismissModal() {
    Util.modalRef.dismissModal();
  }
}
