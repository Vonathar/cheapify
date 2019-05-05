import React, { Component } from "react";
import daydreamIcon from "../img/daydream-icon.png";
import textinputIcon from "../img/textinput-icon.png";
import detailedsummaryIcon from "../img/detailedsummary-icon.png";
import salaryincreaseIcon from "../img/salaryincrease-icon.png";

/* The Income component returns a UI which allows the user to input the yearly income. */
class Income extends Component {
  render() {
    return (
      <div id="income-form-holder">
        <form id="income-form">
          {/* Text input for the yearly income */}
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
            {/* Holder for the salary increase settings */}
            <div
              id="salaryIncreaseSettings-holder"
              className={this.props.handleSalaryIncreaseActivation()}
            >
              {/* Select input */}
              <div id="salaryIncreaseSettings-select">
                <select
                  class="form-control form-control-sm"
                  id="country-select"
                  onChange={this.props.handleCountrySelection}
                >
                  <option>Target salary</option>
                </select>
                <small id="country-help" className="form-text text-muted">
                  Calculation method
                </small>
              </div>
              {/* Text input */}
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
                  onChange={this.props.handleTargetIncomeInput}
                />
                <small
                  id="salaryIncreaseSettingsHelp"
                  className="form-text text-muted"
                >
                  Salary by target age
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
            {/* Submit button for the form */}
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
            {/* Settings div holding the checkboxes used to define user settings */}
            <div id="userSettings-div">
              {/* UI for Daydream */}
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
              {/* UI for Text Input */}
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
              {/* UI for Detailed Summary*/}
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
              {/* UI for Salary increase*/}
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
