import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import InputMask from "react-input-mask";
import Select from "react-select";
import MaterialTable from "material-table";
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
  control: (base) => ({
    ...base,
    height: 35,
    minHeight: 35,
    width: 200,
  }),
};

export class DataEntry extends Component {
  state = {
    planetDataArray: [],
    bhavaDataArray: [],
    testP: [108, 208, 165, 117, 222, 104, 330, 186, 6],
    testB: [77, 103, 130, 156, 190, 223, 257, 283, 310, 336, 10, 43],
    drakBhavaData: [],
    drakPlanetData: [],
  };

  componentDidMount = () => {
    this.initBhavas();
    this.initPlanets();
    this.createDrakBalForBhavas();
    this.createDrakBalForPlanets();
  };

  initPlanets = () => {
    Grahas.map((item, index) => {
      this.setState((prevState) => ({
        planetDataArray: [
          ...prevState.planetDataArray, // use prevState
          {
            graha: item.label,
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
            bhava: item.label,
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
          this.setState(
            (prevState) => ({
              planetDataArray: prevState.planetDataArray.map((obj, index) =>
                index === key
                  ? Object.assign(obj, { finalData: finalData })
                  : obj
              ),
            }),
            () => {}
          );
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
          this.setState(
            (prevState) => ({
              bhavaDataArray: prevState.bhavaDataArray.map((obj, index) =>
                index === key
                  ? Object.assign(obj, { finalData: finalData })
                  : obj
              ),
            }),
            () => {}
          );
        }
      );
    }
    console.log(this.state.bhavaDataArray);
  };

  createDrakBalForBhavas = () => {
    // if(this.state.bhavaDataArray.every(bhav => bhav.finalData !== null) &&  this.state.planetDataArray.every(planet => planet.finalData !== null)){
    //   console.log("drak bal started")
    // }
    let drakData = this.state.drakBhavaData;
    this.state.testP.forEach((planet, pIndex) => {
      let result;
      let arr = [];
      this.state.testB.forEach((bhav, bIndex) => {
        if (pIndex !== 7 && pIndex !== 8) {
          let value = bhav - planet;
          if (value < 0) {
            value = value + 360;
          }
          result = {
            key: bIndex,
            value: value,
            drakbal:this.drakBalCalculator(pIndex,value)
          };

          arr.push(result);
        } else {
          result = {
            key: bIndex,
            value: "N/A",
            drakbal:"N/A",
          };
          arr.push(result);
        }
      });
      drakData[pIndex] = arr;
    });
    console.log(drakData);
  };
  createDrakBalForPlanets = () => {
    // if(this.state.bhavaDataArray.every(bhav => bhav.finalData !== null) &&  this.state.planetDataArray.every(planet => planet.finalData !== null)){
    //   console.log("drak bal started")
    // }
    let drakData = this.state.drakPlanetData;
    this.state.testP.forEach((planet, pIndex) => {
      let result;
      let arr = [];
      this.state.testP.forEach((graha, bIndex) => {
        if (pIndex !== 7 && pIndex !== 8 && bIndex !== 7 && bIndex !== 8) {
          let value = graha - planet;
          if (value < 0) {
            value = value + 360;
          }
          result = {
            key: bIndex,
            value: value,
            drakbal:this.drakBalCalculator(pIndex,value)

          };

          arr.push(result);
        } else {
          result = {
            key: bIndex,
            value: "N/A",
            drakbal:"N/A"
          };
          arr.push(result);
        }
      });

      drakData[pIndex] = arr;
    });
    console.log(drakData);
  };

  drakBalCalculator = (planet, value) => {
    let drakBal;
    switch (planet) {
      case 2:
        if (value > 300 || value < 30) {
          drakBal = 0;
          return drakBal;
        } else if (value >= 30 && value < 60) {
          drakBal = Math.round((((value - 30) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 60 && value < 90) {
          drakBal = Math.round(((15 + (value - 60)) * 10) / 6);
          return drakBal;
        } else if (value >= 90 && value < 121) {
          drakBal = Math.round(((90 - value / 2) * 10) / 6) + 25;
          return drakBal;
        } else if (value >= 121 && value < 150) {
          drakBal = Math.round(((150 - value) * 10) / 6);
          return drakBal;
        } else if (value >= 150 && value < 180) {
          drakBal = Math.round(((value - 150) * 20) / 6);
          return drakBal;
        } else if (value >= 180 && value < 210) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 210 && value < 241) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6) + 25;
          return drakBal;
        } else if (value >= 241 && value <= 300) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        }

        break;
      case 4:
        if (value > 300 || value < 30) {
          drakBal = 0;
          return drakBal;
        } else if (value >= 30 && value < 60) {
          drakBal = Math.round((((value - 30) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 60 && value < 90) {
          drakBal = Math.round(((15 + (value - 60)) * 10) / 6);
          return drakBal;
        } else if (value >= 90 && value < 120) {
          drakBal = Math.round(((90 - value / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 120 && value <= 150) {
          drakBal = Math.round(((150 - value) * 10) / 6) + 50;
          return drakBal;
        } else if (value >= 151 && value < 180) {
          drakBal = Math.round(((value - 150) * 20) / 6);
          return drakBal;
        } else if (value >= 180 && value < 240) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 240 && value <= 270) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6) + 50;
          return drakBal;
        } else if (value >= 271 && value <= 300) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        }
        break;
      case 6:
        if (value > 300 || value < 30) {
          drakBal = 0;
          return drakBal;
        } else if (value >= 30 && value < 60) {
          drakBal = Math.round((((value - 30) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 60 && value <= 90) {
          drakBal = Math.round(((15 + (value - 60)) * 10) / 6) + 75;
          return drakBal;
        } else if (value >= 91 && value < 120) {
          drakBal = Math.round(((90 - value / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 120 && value < 150) {
          drakBal = Math.round(((150 - value) * 10) / 6);
          return drakBal;
        } else if (value >= 150 && value < 180) {
          drakBal = Math.round(((value - 150) * 20) / 6);
          return drakBal;
        } else if (value >= 180 && value < 270) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 270 && value <= 300) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6) + 75;
          return drakBal;
        }
        break;
      case 0:
      case 1:
      case 3:
      case 5:
        if (value > 300 || value < 30) {
          drakBal = 0;
          return drakBal
        } else if (value >= 30 && value < 60) {
          drakBal = Math.round((((value - 30) / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 60 && value < 90) {
          drakBal = Math.round(((15 + (value - 60)) * 10) / 6);
          return drakBal;
        } else if (value >= 90 && value < 120) {
          drakBal = Math.round(((90 - value / 2) * 10) / 6);
          return drakBal;
        } else if (value >= 120 && value < 150) {
          drakBal = Math.round(((150 - value) * 10) / 6);
          return drakBal;
        } else if (value >= 150 && value < 180) {
          drakBal = Math.round(((value - 150) * 20) / 6);
          return drakBal;
        } else if (value >= 180 && value <= 300) {
          drakBal = Math.round((((300 - value) / 2) * 10) / 6);
          return drakBal;
        }
        break;
      default:
        console.log(`planet is out of our planet system`);
    }
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
              <div className="paper-contents" style={{ paddingBottom: 156 }}>
                {planetInputs}
              </div>
              <div className="paper-table" style={{ paddingBottom: 165 }}>
                <MaterialTable
                  columns={[
                    { title: "ग्रह", field: "graha" },
                    { title: "राशि", field: "rashiResult" },
                    { title: "अंश ", field: "anshResult" },
                    { title: "कुल ग्रहांश", field: "finalData" },
                  ]}
                  data={this.state.planetDataArray}
                  title="ग्रहांश सारणी"
                  options={{
                    pageSize: 9,
                    pageSizeOptions: [],
                    search: false,
                    paging: false,
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
                    { title: "भाव", field: "bhava" },
                    { title: "राशि", field: "rashiResult" },
                    { title: "अंश ", field: "anshResult" },
                    { title: "कुल भावांश ", field: "finalData" },
                  ]}
                  data={this.state.bhavaDataArray}
                  title="भावांश सारणी"
                  options={{
                    pageSize: 12,
                    pageSizeOptions: [],
                    search: false,
                    paging: false,
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="paper-container">
              <div className="paper-heading">भावोपरि ग्रहाणां दृष्टयः </div>
              <div className="paper-table">
                <MaterialTable
                  columns={[
                    {
                      title: "भाव 1",
                      render: (rowData) => <span>{rowData[0].drakbal}</span>,
                    },
                    {
                      title: "भाव 2",
                      render: (rowData) => <span>{rowData[1].drakbal}</span>,
                    },
                    {
                      title: "भाव 3",
                      render: (rowData) => <span>{rowData[2].drakbal}</span>,
                    },
                    {
                      title: "भाव 4",
                      render: (rowData) => <span>{rowData[3].drakbal}</span>,
                    },
                    {
                      title: "भाव 5",
                      render: (rowData) => <span>{rowData[4].drakbal}</span>,
                    },
                    {
                      title: "भाव 6",
                      render: (rowData) => <span>{rowData[5].drakbal}</span>,
                    },
                    {
                      title: "भाव 7",
                      render: (rowData) => <span>{rowData[6].drakbal}</span>,
                    },
                    {
                      title: "भाव 8",
                      render: (rowData) => <span>{rowData[7].drakbal}</span>,
                    },
                    {
                      title: "भाव 9",
                      render: (rowData) => <span>{rowData[8].drakbal}</span>,
                    },
                    {
                      title: "भाव 10",
                      render: (rowData) => <span>{rowData[9].drakbal}</span>,
                    },
                    {
                      title: "भाव 11",
                      render: (rowData) => <span>{rowData[10].drakbal}</span>,
                    },
                    {
                      title: "भाव 12",
                      render: (rowData) => <span>{rowData[11].drakbal}</span>,
                    },
                  ]}
                  data={this.state.drakBhavaData}
                  title=""
                  options={{
                    pageSize: 9,
                    pageSizeOptions: [],
                    search: false,
                    paging: false,
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="paper-container">
              <div className="paper-heading">ग्रहोपरि ग्रहाणां दृष्टयः </div>
              <div className="paper-table">
                <MaterialTable
                  columns={[
                    {
                      title: "सूर्य",
                      render: (rowData) => <span>{rowData[0].drakbal}</span>,
                    },
                    {
                      title: "चन्द्र",
                      render: (rowData) => <span>{rowData[1].drakbal}</span>,
                    },
                    {
                      title: "मंगल",
                      render: (rowData) => <span>{rowData[2].drakbal}</span>,
                    },
                    {
                      title: "बुध",
                      render: (rowData) => <span>{rowData[3].drakbal}</span>,
                    },
                    {
                      title: "गुरु",
                      render: (rowData) => <span>{rowData[4].drakbal}</span>,
                    },
                    {
                      title: "शुक्र",
                      render: (rowData) => <span>{rowData[5].drakbal}</span>,
                    },
                    {
                      title: "शनि",
                      render: (rowData) => <span>{rowData[6].drakbal}</span>,
                    },
                    {
                      title: "राहु",
                      render: (rowData) => <span>{rowData[7].drakbal}</span>,
                    },
                    {
                      title: "केतु",
                      render: (rowData) => <span>{rowData[8].drakbal}</span>,
                    },
                  ]}
                  data={this.state.drakPlanetData}
                  title=""
                  options={{
                    pageSize: 9,
                    pageSizeOptions: [],
                    search: false,
                    paging: false,
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
