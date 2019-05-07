import React, { Component } from "react";
import daydreamIcon from "../img/daydream-icon.png";
import textinputIcon from "../img/textinput-icon.png";
import detailedsummaryIcon from "../img/detailedsummary-icon.png";
import salaryincreaseIcon from "../img/salaryincrease-icon.png";

/*
    Render a form accepting user input for:
      1 - Current income
      2 - Target income
      3 - County selection
      4 - User settings
        4.1 - Daydream mode
        4.2 - Enable text fields
        4.3 - Detailed summary
        4.4 - Salary increase
*/

class Income extends Component {
  render() {
    return (
      <div id="income-form-holder">
        <form id="income-form">
          {/* Text input - CURRENT INCOME */}
          <div id="inputTextHolder-div">
            <label htmlFor="incomeInputText">
              Yearly income
              <small id="incomeInputHelp" className="form-text text-muted">
                Before taxes.
              </small>
            </label>
            <input
              type="text"
              className="form-control"
              id="incomeInputText"
              aria-describedby="incomeHelp"
              placeholder="25,000..."
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  this.props.checkTargetMet();
                }
              }}
              onChange={this.props.handleIncomeInput}
            />
            {/* Holder for Salary Increase Settings */}
            <div
              id="salaryIncreaseSettings-holder"
              className={this.props.handleSalaryIncreaseActivation()}
            >
              {/* Select input - CALCULATION METHOD */}
              <div id="salaryIncreaseSettings-select">
                <select
                  class="form-control form-control-sm"
                  id="salaryIncreaseMethod-select"
                  onChange={this.props.handleSalaryIncreaseMethod}
                >
                  <option>Target salary</option>
                  <option>Fixed percentage</option>
                  <option>Fixed amount</option>
                </select>
                <small id="country-help" className="form-text text-muted">
                  Calculation method
                </small>
              </div>
              {/* Text input - TARGET SALARY */}
              <div id="salaryIncreaseSettings-div">
                <input
                  type="text"
                  className="form-control"
                  id="salaryIncreaseSettings-input"
                  aria-describedby="salaryIncreaseSettingsHelp"
                  placeholder="55,000..."
                  onKeyDown={event => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      this.props.checkTargetMet();
                    }
                  }}
                  onChange={this.props.handleSalaryIncreaseInput}
                />
                <small
                  id="salaryIncreaseSettingsHelp"
                  className="form-text text-muted"
                >
                  {this.props.handleSalaryIncreaseHelpText()}
                </small>
              </div>
            </div>
            <div id="country-div">
              <select
                class="form-control form-control-sm"
                id="country-select"
                onChange={this.props.handleCountrySelection}
              >
                <option>United Kingdom</option>
                <option>Italy</option>
                <option>None (use net)</option>
              </select>
              <small id="country-help" className="form-text text-muted">
                Tax country.
              </small>
            </div>
          </div>
          <div className="form-group">
            {/* Button input - CALCULATE */}
            <button
              type="button"
              class="btn btn-dark btn-sm"
              id="submitButton"
              onClick={event => {
                event.preventDefault();
                this.props.checkTargetMet();
              }}
            >
              Calculate
            </button>
            {/* Holder for User Setting checkboxes */}
            <div id="userSettings-div">
              {/* Checkbox input - DAYDREAM */}
              <div class="custom-control custom-checkbox" id="dayDream-div">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="dayDream-input"
                  onChange={this.props.handleDaydreamCheckbox}
                />
                <label
                  class="custom-control-label small text-muted"
                  for="dayDream-input"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Change all parameters and update your results live. Perfect to see how your lifestyle affects your future net worth!"
                >
                  Daydream mode
                  <img
                    src={daydreamIcon}
                    alt="Daydream"
                    className="userSettings-icon"
                  />
                </label>
              </div>
              {/* Checkbox input - TEXT INPUT */}
              <div
                class="custom-control custom-checkbox"
                id="textInputsActivation-div"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="textInput-input"
                  onChange={this.props.handleTextInputsCheckbox}
                />
                <label
                  class="custom-control-label small text-muted"
                  for="textInput-input"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Use text fields to type in specific values, when a slider is not precise enough."
                >
                  Activate text fields
                  <img
                    src={textinputIcon}
                    alt="Text input"
                    className="userSettings-icon"
                  />
                </label>
              </div>
              {/* Checkbox input - DETAILED SUMMARY*/}
              <div
                class="custom-control custom-checkbox"
                id="detailedSummary-div"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="detailedSummary-input"
                  onChange={this.props.handleDetailedSummaryCheckbox}
                />
                <label
                  class="custom-control-label small text-muted"
                  for="detailedSummary-input"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Show a more detailed summary, including extra stats calculated from the given data."
                >
                  Detailed summary
                  <img
                    src={detailedsummaryIcon}
                    alt="Text input"
                    className="userSettings-icon"
                  />
                </label>
              </div>
              {/* Checkbox input - SALARY INCREASE*/}
              <div
                class="custom-control custom-checkbox"
                id="salaryIncrease-div"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="salaryIncrease-input"
                  onChange={this.props.handleSalaryIncreaseCheckbox}
                />
                <label
                  class="custom-control-label small text-muted"
                  for="salaryIncrease-input"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Allow for salary to change overtime instead of remaining fixed. The increase will be applied over the years."
                >
                  Salary Increase
                  <img
                    src={salaryincreaseIcon}
                    alt="Text input"
                    className="userSettings-icon"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Income;
