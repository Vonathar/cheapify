import React, { Component } from "react";

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
              onChange={this.props.handleIncomeInput}
            />
            <small id="incomeInputHelp" className="form-text text-muted">
              Please insert the income after-tax.
            </small>
            {/* Submit button to for the form */}
            <button
              type="button"
              class="btn btn-dark btn-sm"
              id="submitButton"
              onClick={this.props.checkTargetMet}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Income;
