import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react";
import React from "react";

const InputUnitControl: React.FC<{
  selectedUnit: "mkg" | "ftlbs";
  onSelectedUnit: (value: "mkg" | "ftlbs") => void;
}> = (props) => {
    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectedUnit(event.detail.value)
    }
  return (
    <IonSegment value={props.selectedUnit} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputUnitControl;
