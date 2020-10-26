import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import InputMask from "react-input-mask";
import Select from "react-select";
import MaterialTable from 'material-table'
import "./pages.scss";

const Rashis = [
  { value: 0, label: "मेष (Mesh)" },
  { value: 1, label: "वृषभ (Vrushabh)" },
  { value: 2, label: "मिथुन (Mithun)" },
  { value: 3, label: "कर्क (Kark)" },
  { value: 4, label: "सिंह (Sinh)" },
  { value: 5, label: "कन्या (Kanya)" },
  { value: 6, label: "तुला (Tula)" },
  { value: 7, label: "वृश्चिक (Vrushchik)" },
  { value: 8, label: "धनु (Dhanu)" },
  { value: 9, label: "मकर (Makar)" },
  { value: 10, label: "कुंभ (Kumbha)" },
  { value: 11, label: "मीन (Meen)" },
];
const Grahas = [
  { key: 0, label: "सूर्य" },
  { key: 1, label: "चन्द्र" },
  { key: 2, label: "मंगल" },
  { key: 3, label: "बुध" },
  { key: 4, label: "गुरु" },
  { key: 5, label: "शुक्र" },
  { key: 6, label: "शनि" },
  { key: 7, label: "राहु" },
  { key: 8, label: "केतु" },
];

const Bhavas = [
  { key: 0, label: "प्रथम भाव" },
  { key: 1, label: "द्वितीय भाव" },
  { key: 2, label: "तृतीय भाव" },
  { key: 3, label: "चतुर्थ भाव" },
  { key: 4, label: "पंचम भाव" },
  { key: 5, label: "षष्ट भाव" },
  { key: 6, label: "सप्तम भाव" },
  { key: 7, label: "अष्टम भाव" },
  { key: 8, label: "नवम भाव" },
  { key: 9, label: "दशम भाव" },
  { key: 10, label: "एकादश भाव" },
  { key: 11, label: "द्वादश भाव" },
];

const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    width:200
  })
};

export class DataEntry extends Component {
  state = {
    planetDataArray: [],
    bhavaDataArray: [],
  };

  componentDidMount = () => {
    this.initBhavas();
    this.initPlanets();
  };

  initPlanets = () => {
    Grahas.map((item, index) => {
      this.setState((prevState) => ({
        planetDataArray: [
          ...prevState.planetDataArray, // use prevState
          {
            graha:item.label,
            finalData: null,
            rashiResult: 0,
            anshResult: 0,
          },
        ],
      }));
    });
  };

  initBhavas = () => {
    Bhavas.map((item, index) => {
      this.setState((prevState) => ({
        bhavaDataArray: [
          ...prevState.bhavaDataArray, // use prevState
          { 
            bhava:item.label,
            finalData: null,
            rashiResult: 0,
            anshResult: 0,
          },
        ],
      }));
    });
  };

  handleInput = (e, origin, key) => {
    if (origin === "rashi") {
      let rashiResult = e.value * 30;
      this.setState(
        (prevState) => ({
          planetDataArray: prevState.planetDataArray.map((obj, index) =>
            index === key
              ? Object.assign(obj, { rashiResult: rashiResult })
              : obj
          ),
        }),
        () => {
          let finalData =
            this.state.planetDataArray[key].rashiResult +
            this.state.planetDataArray[key].anshResult;
          this.setState((prevState) => ({
            planetDataArray: prevState.planetDataArray.map((obj, index) =>
              index === key ? Object.assign(obj, { finalData: finalData }) : obj
            ),
          }));
        }
      );
    } else if (origin === "ansh") {
      let data = e.target.value;
      let arrInput = [];
      console.log(arrInput);
      arrInput = data.split`-`.map((x) => +x);
      for (let i = arrInput.length - 1; i > 0; i--) {
        if (arrInput[i] > 30) {
          arrInput[i - 1] = arrInput[i - 1] + 1;
        }
      }
      let anshResult = arrInput[0];
      this.setState(
        (prevState) => ({
          planetDataArray: prevState.planetDataArray.map((obj, index) =>
            index === key ? Object.assign(obj, { anshResult: anshResult }) : obj
          ),
        }),
        () => {
          let finalData =
            this.state.planetDataArray[key].rashiResult +
            this.state.planetDataArray[key].anshResult;
          this.setState((prevState) => ({
            planetDataArray: prevState.planetDataArray.map((obj, index) =>
              index === key ? Object.assign(obj, { finalData: finalData }) : obj
            ),
          }));
        }
      );
    }
    console.log(this.state.planetDataArray);
  };

  handleBhavaInput = (e, origin, key) => {
    if (origin === "rashi") {
      let rashiResult = e.value * 30;
      this.setState(
        (prevState) => ({
          bhavaDataArray: prevState.bhavaDataArray.map((obj, index) =>
            index === key
              ? Object.assign(obj, { rashiResult: rashiResult })
              : obj
          ),
        }),
        () => {
          let finalData =
            this.state.bhavaDataArray[key].rashiResult +
            this.state.bhavaDataArray[key].anshResult;
          this.setState((prevState) => ({
            bhavaDataArray: prevState.bhavaDataArray.map((obj, index) =>
              index === key ? Object.assign(obj, { finalData: finalData }) : obj
            ),
          }));
        }
      );
    } else if (origin === "ansh") {
      let data = e.target.value;
      let arrInput = [];
      console.log(arrInput);
      arrInput = data.split`-`.map((x) => +x);
      for (let i = arrInput.length - 1; i > 0; i--) {
        if (arrInput[i] > 30) {
          arrInput[i - 1] = arrInput[i - 1] + 1;
        }
      }
      let anshResult = arrInput[0];
      this.setState(
        (prevState) => ({
          bhavaDataArray: prevState.bhavaDataArray.map((obj, index) =>
            index === key ? Object.assign(obj, { anshResult: anshResult }) : obj
          ),
        }),
        () => {
          let finalData =
            this.state.bhavaDataArray[key].rashiResult +
            this.state.bhavaDataArray[key].anshResult;
          this.setState((prevState) => ({
            bhavaDataArray: prevState.bhavaDataArray.map((obj, index) =>
              index === key ? Object.assign(obj, { finalData: finalData }) : obj
            ),
          }));
        }
      );
    }
    console.log(this.state.bhavaDataArray);
  };

  planetInputCreator = (graha) => {
    return (
      <div className="paper-content" key={graha.key}>
        <span className="content-title">{graha.label} :</span>
        <div className="content-select">
          <Select
          styles={customStyles}
            options={Rashis}
            onChange={(e) => {
              this.handleInput(e, "rashi", graha.key);
            }}
          />
        </div>
        <div className="content-input">
          <InputMask
            mask="99-99-99"
            maskChar=" "
            onBlur={(e) => {
              this.handleInput(e, "ansh", graha.key);
            }}
          />
        </div>
      </div>
    );
  };

  bhavaInputCreator = (bhava) => {
    return (
      <div className="paper-content" key={bhava.key}>
        <span className="content-title">{bhava.label} :</span>
        <div className="content-select">
          <Select
            options={Rashis}
            styles={customStyles}
            onChange={(e) => {
              this.handleBhavaInput(e, "rashi", bhava.key);
            }}
          />
        </div>
        <div className="content-input">
          <InputMask
            mask="99-99-99"
            maskChar=" "
            onBlur={(e) => {
              this.handleBhavaInput(e, "ansh", bhava.key);
            }}
          />
        </div>
      </div>
    );
  };
  render() {
    let planetInputs;
    let bhavaInputs;
    planetInputs = Grahas.map((graha) => this.planetInputCreator(graha));
    bhavaInputs = Bhavas.map((bhava) => this.bhavaInputCreator(bhava));

    return (
      <div className="data-entry-container">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className="paper-container">
              <div className="paper-heading">ग्रह स्पष्ट</div>
              <div className="paper-contents">{planetInputs}</div>
              <div className="paper-table">
              <MaterialTable
          columns={[
            { title: 'ग्रह', field: 'graha' },
            { title: 'राशि', field: 'rashiResult' },
            { title: 'अंश ', field: 'anshResult', },
            { title: 'कुल ग्रहांश', field: 'finalData' }
          ]}
          data={this.state.planetDataArray}
          title="ग्रहांश सारणी"
          options={{
            pageSize:9,
            pageSizeOptions: [],
            search:false,
            paging:false
          }}
        />
      
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="paper-container">
              <div className="paper-heading">भाव स्पष्ट</div>
              <div className="paper-contents">{bhavaInputs}</div>
              <div className="paper-table">
              <MaterialTable
          columns={[
            { title: 'भाव', field: 'bhava' },
            { title: 'राशि', field: 'rashiResult' },
            { title: 'अंश ', field: 'anshResult', },
            { title: 'कुल भावांश ', field: 'finalData' }
          ]}
          data={this.state.bhavaDataArray}
          title="भावांश सारणी"
          options={{
            pageSize:12,
            pageSizeOptions: [],
            search:false,
            paging:false
          }}
        />
      
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DataEntry;
