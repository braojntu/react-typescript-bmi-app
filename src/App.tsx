import React, {useRef, useState} from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputUnitControl from "./components/InputUnitControl";

setupIonicReact();

const App: React.FC = () => {
  const [calcBmi, setCalcBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [unit, setUnit] = useState<"mkg" | "ftlbs">("mkg");

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const weightInput = weightInputRef.current!.value;
    const heightInput = heightInputRef.current!.value;
    if (
      !weightInput ||
      !heightInput ||
      +weightInput <= 0 ||
      +heightInput <= 0
    ) {
      setError("Please enter a number greater than zero");
      return;
    }
    const weightConversionFactor = unit === "ftlbs" ? 2.2 : 1;
    const heigtConversionFactor = unit === "ftlbs" ? 3.28 : 1;

    const weight = +weightInput / weightConversionFactor;
    const height = +heightInput / heigtConversionFactor;

    const bmi = weight / (height * height);
    console.log(bmi);
    setCalcBmi(bmi);
  };

  const resetInput = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setCalcBmi(undefined);
  };

  const clearError = () => {
    setError("");
  };

  const selectUnitHandler = (selectedUnit: "mkg" | "ftlbs") => {
    setUnit(selectedUnit);
  };

  return (
    <React.Fragment>
      {/* !! used to convert error to a boolean */}
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{text: "Okay", handler: clearError}]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size="3">
                <InputUnitControl
                  selectedUnit={unit}
                  onSelectedUnit={selectUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({unit === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({unit === "mkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalc={calculateBMI} onReset={resetInput} />
            {calcBmi && <BmiResult result={calcBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
