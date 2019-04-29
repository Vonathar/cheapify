import React, { Component } from "react";
import daydreamIcon from "../img/daydream-icon.png";
import textinputIcon from "../img/textinput-icon.png";

/* The Income component returns a UI which allows the user to input the yearly income. */
class Income extends Component {
  render() {
    return (
      <div id="income-form-holder">
        <form id="income-form">
          {/* Text input for the yearly income */}
          <div className="form-group">
            <label htmlFor="incomeInputText">Yearly income</label>
            <input
              type="text"
              className="form-control"
              id="incomeInputText"
              aria-describedby="incomeHelp"
              placeholder="12000..."
              onKeyDown={event => {
                if (event.keyCode == 13) {
                  event.preventDefault();
                  this.props.checkTargetMet();
                }
              }}
              onChange={this.props.handleIncomeInput}
            />
            <small id="incomeInputHelp" className="form-text text-muted">
              Please insert the income after-tax.
            </small>
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
            <div id="userSettings-div">
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
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Income;
